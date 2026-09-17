import React from "react";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { notFound, permanentRedirect } from "next/navigation";
import { formatDisplayDate, resolvePostDate } from "@/lib/dates";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const OBJECT_ID_RE = /^[0-9a-fA-F]{24}$/;

/**
 * Public blog URLs are canonical as /blogs/{MongoDB _id}.
 * Human-readable `slug` field visits permanently redirect to that URL.
 */
async function resolveBlogParam(param) {
  await dbConnect();
  const raw = String(param || "").trim();
  if (!raw) return { blog: null, shouldRedirect: false };

  if (OBJECT_ID_RE.test(raw)) {
    const blog = await Blog.findById(raw).lean();
    return {
      blog: blog ? JSON.parse(JSON.stringify(blog)) : null,
      shouldRedirect: false,
    };
  }

  // Pretty slug → find post, then redirect to canonical /blogs/{_id}
  const bySlug = await Blog.findOne({ slug: raw }).lean();
  if (!bySlug) return { blog: null, shouldRedirect: false };

  return {
    blog: JSON.parse(JSON.stringify(bySlug)),
    shouldRedirect: true,
  };
}

// Generate SEO metadata
export async function generateMetadata({ params }) {
  const { blog, shouldRedirect } = await resolveBlogParam(params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  // Avoid indexing the pretty-slug URL; canonical is /blogs/{_id}
  if (shouldRedirect) {
    return {
      title: blog.metaTitle || blog.title,
      alternates: {
        canonical: `/blogs/${blog._id}`,
      },
    };
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || "Read our latest blog post.",
    keywords: blog.metaKeywords ? blog.metaKeywords.split(",") : [],
    alternates: {
      canonical: `/blogs/${blog._id}`,
    },
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || "Read our latest blog post.",
      images: [blog.image || "/Prakria-logo.png"],
      type: "article",
      authors: [blog.author],
      url: `/blogs/${blog._id}`,
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { blog, shouldRedirect } = await resolveBlogParam(params.slug);

  if (!blog) {
    notFound();
  }

  // /blogs/my-pretty-slug → 308 /blogs/{_id}
  if (shouldRedirect) {
    permanentRedirect(`/blogs/${blog._id}`);
  }

  const displayDate = formatDisplayDate(resolvePostDate(blog));

  return (
    <div className="blog-details-wrapper pt-150 pb-12">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="blog-details-content">
              <div className="meta mb-4">
                <span className="category text-primary uppercase font-bold">
                  {blog.category}
                </span>
                <span className="mx-2">|</span>
                <span className="author">By {blog.author}</span>
                {displayDate ? (
                  <>
                    <span className="mx-2">|</span>
                    <span className="date">{displayDate}</span>
                  </>
                ) : null}
              </div>
              <h1 className="mb-4">{blog.title}</h1>
              <div className="featured-image mb-5">
                <img
                  src={blog.image || "/Prakria-logo.png"}
                  alt={blog.title}
                  className="img-fluid rounded w-100"
                />
              </div>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {blog.video && (
                <div className="video-wrapper mt-5">
                  <iframe
                    width="100%"
                    height="500"
                    src={blog.video}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
