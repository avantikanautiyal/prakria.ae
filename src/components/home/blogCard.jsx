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
          <div className="row mb-60">
            <div
              className="col-lg-12 wow animate fadeInDown"
              data-wow-delay="200ms"
              data-wow-duration="1500ms"
            >
              <div className="section-title text-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                  >
                    <g>
                      <path d="M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z" />
                    </g>
                  </svg>
                  Explore Our Thoughts
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                  >
                    <g>
                      <path d="M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z" />
                    </g>
                  </svg>
                </span>
                <h3 className="text-4xl ">
                  THE CREATIVE BLOGS: IDEAS & INSIGHTS
                </h3>
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
