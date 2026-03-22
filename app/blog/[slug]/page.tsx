import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPostBySlug } from "../posts";

const GOLD = "#e5a00d";
const BLUE = "#3b82f6";
const F = "'Inter', system-ui, sans-serif";

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

function renderBlock(postSlug: string, idx: number, block: (typeof BLOG_POSTS)[number]["content"][number]) {
    switch (block.type) {
        case "heading":
            return (
                <h2
                    key={`${postSlug}-${idx}`}
                    style={{
                        fontFamily: F,
                        fontWeight: 750,
                        fontSize: "clamp(24px,2.6vw,34px)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.15,
                        margin: "14px 0 2px",
                    }}
                >
                    {block.text}
                </h2>
            );
        case "list":
            return (
                <ul
                    key={`${postSlug}-${idx}`}
                    style={{
                        margin: 0,
                        paddingLeft: 22,
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        color: "rgba(255,255,255,0.68)",
                        fontFamily: F,
                        fontSize: 16,
                        lineHeight: 1.8,
                    }}
                >
                    {block.items.map((item, itemIndex) => (
                        <li key={`${postSlug}-${idx}-${itemIndex}`}>{item}</li>
                    ))}
                </ul>
            );
        case "quote":
            return (
                <blockquote
                    key={`${postSlug}-${idx}`}
                    style={{
                        margin: 0,
                        padding: "16px 18px",
                        borderLeft: `2px solid ${GOLD}`,
                        background: "rgba(255,255,255,0.03)",
                        color: "rgba(255,255,255,0.8)",
                        fontFamily: F,
                        fontSize: 18,
                        lineHeight: 1.7,
                    }}
                >
                    {block.text}
                </blockquote>
            );
        case "image":
            return (
                <figure
                    key={`${postSlug}-${idx}`}
                    style={{
                        margin: "4px 0",
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                    }}
                >
                    <img
                        src={block.src}
                        alt={block.alt}
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: 6,
                            border: "1px solid rgba(255,255,255,0.08)",
                            background: "#111",
                        }}
                    />
                    {block.caption ? (
                        <figcaption
                            style={{
                                fontFamily: F,
                                fontSize: 13,
                                lineHeight: 1.7,
                                color: "rgba(255,255,255,0.48)",
                            }}
                        >
                            {block.caption}
                        </figcaption>
                    ) : null}
                </figure>
            );
        case "paragraph":
        default:
            return (
                <p
                    key={`${postSlug}-${idx}`}
                    style={{
                        fontFamily: F,
                        fontWeight: 300,
                        fontSize: 16,
                        lineHeight: 1.9,
                        color: "rgba(255,255,255,0.64)",
                        margin: 0,
                    }}
                >
                    {block.text}
                </p>
            );
    }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <main
            style={{
                minHeight: "100vh",
                background: "#050505",
                color: "#fff",
                padding: "72px 40px 100px",
            }}
        >
            <article style={{ maxWidth: 840, margin: "0 auto" }}>
                <p
                    style={{
                        fontFamily: F,
                        fontSize: 10,
                        letterSpacing: "0.32em",
                        textTransform: "uppercase",
                        color: "rgba(229,160,13,0.6)",
                        margin: "0 0 14px",
                    }}
                >
                    Blog Post
                </p>

                <h1
                    style={{
                        fontFamily: F,
                        fontWeight: 800,
                        fontSize: "clamp(32px,4.1vw,54px)",
                        letterSpacing: "-0.03em",
                        lineHeight: 1.05,
                        margin: "0 0 16px",
                    }}
                >
                    {post.title}
                </h1>

                <p
                    style={{
                        fontFamily: F,
                        fontSize: 11,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "rgba(59,130,246,0.85)",
                        margin: "0 0 28px",
                    }}
                >
                    {formatDate(post.date)}
                </p>

                <p
                    style={{
                        fontFamily: F,
                        fontSize: 18,
                        lineHeight: 1.75,
                        color: "rgba(255,255,255,0.72)",
                        margin: "0 0 28px",
                        borderLeft: `2px solid ${GOLD}`,
                        paddingLeft: 14,
                    }}
                >
                    {post.summary}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 30 }}>
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            style={{
                                fontFamily: F,
                                fontSize: 10,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.36)",
                                border: `1px solid rgba(59,130,246,0.32)`,
                                borderRadius: 2,
                                padding: "4px 8px",
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div
                    style={{
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        paddingTop: 26,
                        display: "flex",
                        flexDirection: "column",
                        gap: 20,
                    }}
                >
                    {post.content.map((block, idx) => renderBlock(post.slug, idx, block))}
                </div>

                <div
                    style={{
                        marginTop: 48,
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        paddingTop: 24,
                        display: "flex",
                        gap: 20,
                        flexWrap: "wrap",
                    }}
                >
                    <Link
                        href="/blog"
                        style={{
                            fontFamily: F,
                            fontSize: 11,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: GOLD,
                            textDecoration: "none",
                        }}
                    >
                        ← Back To Blog
                    </Link>
                    <Link
                        href="/"
                        style={{
                            fontFamily: F,
                            fontSize: 11,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.5)",
                            textDecoration: "none",
                        }}
                    >
                        Home
                    </Link>
                </div>
            </article>
        </main>
    );
}
