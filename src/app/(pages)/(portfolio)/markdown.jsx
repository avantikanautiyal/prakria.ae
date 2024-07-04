"use server";
import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

function MarkDown({ content = "" }) {
  return (
    <div className="wow animate fadeInLeft">
      <MDXRemote source={content} />
    </div>
  );
}

export default MarkDown;
