import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      "https://blogs.prakria.tech/wp-json/wp/v2/posts",
      {
        params: {
          per_page: 3,
          orderby: "date",
          order: "desc",
        },
      }
    );

    const posts = response.data.map((post) => ({
      title: post.title.rendered,
      link: post.link,
    }));

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch latest blogs" });
  }
}
