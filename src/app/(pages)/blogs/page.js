"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const json = await res.json();
        if (json.success) {
          const publishedBlogs = json.data.filter(blog => blog.isPublished);
          setBlogs(publishedBlogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (



    <div className="blogs-page-wrapper pt-150 pb-100">
      <div className="container">
        <div className="row mb-60">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <h2 className="font-bold uppercase">Our Blogs</h2>
              <p>Insights, Ideas, and Inspiration from the Creative World</p>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="row">
            <div className="col-lg-12 text-center">
              <h3>Loading...</h3>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {blogs.map((blog) => (
              <div key={blog._id} className="col-lg-4 col-md-6">
                <div className="blog-card">
                  <Link href={`/blogs/${blog._id}`}>
                    <div className="blog-card-img-wrap">
                      <div className="card-img">
                        <img src={blog.image || "/Prakria-logo.png"} alt={blog.title} />
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="meta mb-2">
                         <span className="category text-primary">{blog.category}</span>
                      </div>
                      <h4>{blog.title}</h4>
                      <div className="read-more-btn">
                        Read More
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={10}
                          height={10}
                          viewBox="0 0 10 10"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.48878 0.885308L0 9.37364L0.626356 10L9.11469 1.51122V7.38037H10V0H2.61963V0.885308H8.48878Z"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
