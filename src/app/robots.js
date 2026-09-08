const baseURL = "https://www.prakria.ae";

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
