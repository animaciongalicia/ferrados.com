import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://ferrados.com";

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .slice(0, 30)
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.pilar ?? "general"}</category>${
        post.tags?.map((tag) => `\n      <category>${tag}</category>`).join("") ?? ""
      }
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>La Gaceta de Ferrados.com</title>
    <link>${BASE_URL}/blog</link>
    <description>Artículos sobre montes, fincas y terrenos en Galicia: herencias, madera, limpieza, lindes, compraventa y más.</description>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
