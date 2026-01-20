const baseURL = "https://www.prakria.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: baseURL + "/sitemap.xml",
  };
}
