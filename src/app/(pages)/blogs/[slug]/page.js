import React from "react";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { notFound } from "next/navigation";

// Fetch blog data by slug
async function getBlog(slug) {
  await dbConnect();
  const blog = await Blog.findOne({ _id: slug }).lean();
  if (!blog) return null;
  // Convert _id to string to avoid serialization issues
  return JSON.parse(JSON.stringify(blog));
}

// Generate SEO metadata
export async function generateMetadata({ params }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || "Read our latest blog post.",
    keywords: blog.metaKeywords ? blog.metaKeywords.split(',') : [],
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || "Read our latest blog post.",
      images: [blog.image || "/Prakria-logo.png"],
      type: "article",
      authors: [blog.author],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="blog-details-wrapper pt-150 pb-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="blog-details-content">
              <div className="meta mb-4">
                <span className="category text-primary uppercase font-bold">{blog.category}</span>
                <span className="mx-2">|</span>
                <span className="author">By {blog.author}</span>
                <span className="mx-2">|</span>
                <span className="date">{new Date(blog.postDate || blog.createdAt).toLocaleDateString()}</span>
              </div>
              <h1 className="mb-4">{blog.title}</h1>
              <div className="featured-image mb-5">
                <img src={blog.image || "/Prakria-logo.png"} alt={blog.title} className="img-fluid rounded w-100" />
              </div>
              <div className="content" dangerouslySetInnerHTML={{ __html: blog.content }} />

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
