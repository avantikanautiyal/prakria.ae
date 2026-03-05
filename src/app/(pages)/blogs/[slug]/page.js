"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        const json = await res.json();
        if (json.success) {
          setBlog(json.data);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-150 pb-100 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="pt-150 pb-100 text-center">
        <h3>Blog not found</h3>
      </div>
    );
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
                <span className="date">{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
              <h1 className="mb-4">{blog.title}</h1>
              <div className="featured-image mb-5">
                <img src={blog.image || "/images/default.jpg"} alt={blog.title} className="img-fluid rounded w-100" />
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
};

export default BlogDetailPage;
