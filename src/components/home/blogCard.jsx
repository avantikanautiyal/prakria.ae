"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Home1Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts when the component mounts
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blogs");
        const json = await res.json();
        if (json.success) {
          // Limit to 3 posts for the home page
          setPosts(json.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="home1-blog-section mb-110">
        <div className="container">
          <div className="row mb-20">
            <div
              className="col-lg-12 wow animate fadeInDown"
              data-wow-delay="200ms"
              data-wow-duration="1500ms"
            >
              <div className="text-center">
                <h2 className="font-bold uppercase">
                  THE CREATIVE BLOGS: IDEAS & INSIGHTS
                </h2>
              </div>
            </div>
          </div>
          <div className="row g-md-4 gy-5">
            {posts.map((post, index) => (
              <BlogCard
                key={post._id}
                src={post.image || "/images/default.jpg"}
                title={post.title}
                slug={post._id}
              />
            ))}
          </div>
          <div className="row mt-50">
            <div className="col-lg-12 d-flex justify-content-center">
              <Link href="/blogs" className="details-button">
                View More Blogs
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function BlogCard({ src = "", title, slug = "#" }) {
  return (
    <div
      className="col-lg-4 col-md-6 wow animate fadeInUp"
      data-wow-delay="200ms"
      data-wow-duration="500ms"
    >
      <div className="blog-card">
        <Link href={`/blogs/${slug}`}>
          <div className="blog-card-img-wrap">
            <div className="card-img">
              <img src={src} alt="blog image" />
            </div>
          </div>
          <div className="card-content">
            <h4>{title}</h4>
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
  );
}

export default Home1Blog;
