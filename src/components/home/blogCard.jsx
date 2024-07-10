"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Home1Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts when the component mounts
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://blogs.prakria.tech/wp-json/wp/v2/posts?per_page=3"
        );
        const data = await res.json();
        setPosts(data || []); // Set posts or an empty array if data is undefined
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]); // Set an empty array on error
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
                key={post.id}
                src={post.jetpack_featured_media_url || "/images/default.jpg"} // Replace with your default image path if needed
                title={post.title.rendered}
                link={post.link}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

function BlogCard({ src = "", title, link = "#" }) {
  return (
    <div
      className="col-lg-4 col-md-6 wow animate fadeInUp"
      data-wow-delay="200ms"
      data-wow-duration="500ms"
    >
      <div className="blog-card">
        <Link target="_blank" href={link}>
          <div className="blog-card-img-wrap">
            <div className="card-img">
              <img src={src} alt="blog image" />
            </div>
          </div>
          <div className="card-content">
            <h4>{title}</h4>
            <div target="_blank" href={link} className="read-more-btn">
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
