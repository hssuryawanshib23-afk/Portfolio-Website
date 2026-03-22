import Link from "next/link";
import { BLOG_POSTS } from "./posts";

const GOLD = "#e5a00d";
const BLUE = "#3b82f6";
const F = "'Inter', system-ui, sans-serif";

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function BlogPage() {
    return (
        <main
            style={{
                minHeight: "100vh",
                background: "#050505",
                color: "#fff",
                padding: "72px 40px 100px",
            }}
        >
            <div style={{ maxWidth: 980, margin: "0 auto" }}>
                <p
                    style={{
                        fontFamily: F,
                        fontSize: 10,
                        letterSpacing: "0.32em",
                        textTransform: "uppercase",
                        color: "rgba(229,160,13,0.6)",
                        margin: "0 0 16px",
                    }}
                >
                    Blog
                </p>

                <h1
                    style={{
                        fontFamily: F,
                        fontWeight: 800,
                        fontSize: "clamp(34px,4.2vw,56px)",
                        letterSpacing: "-0.03em",
                        lineHeight: 1.05,
                        margin: "0 0 16px",
                    }}
                >
                    Learnings, shipped weekly.
                </h1>

                <p
                    style={{
                        fontFamily: F,
                        fontSize: 15,
                        lineHeight: 1.8,
                        color: "rgba(255,255,255,0.62)",
                        margin: "0 0 36px",
                        maxWidth: 680,
                    }}
                >
                    I write about what I build, break, and improve.
                    <code style={{ color: GOLD }}>app/blog/posts.ts</code>.
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                        gap: 20,
                    }}
                >
                    {BLOG_POSTS.map((post) => (
                        <article
                            key={post.slug}
                            style={{
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 4,
                                padding: "24px",
                                background: "rgba(255,255,255,0.02)",
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: F,
                                    fontSize: 10,
                                    letterSpacing: "0.14em",
                                    textTransform: "uppercase",
                                    color: "rgba(59,130,246,0.85)",
                                    margin: 0,
                                }}
                            >
                                {formatDate(post.date)}
                            </p>

                            <h2
                                style={{
                                    fontFamily: F,
                                    fontSize: 24,
                                    fontWeight: 700,
                                    letterSpacing: "-0.02em",
                                    margin: 0,
                                }}
                            >
                                {post.title}
                            </h2>

                            <p
                                style={{
                                    fontFamily: F,
                                    fontSize: 14,
                                    lineHeight: 1.7,
                                    color: "rgba(255,255,255,0.58)",
                                    margin: 0,
                                    flexGrow: 1,
                                }}
                            >
                                {post.summary}
                            </p>

                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        style={{
                                            fontFamily: F,
                                            fontSize: 10,
                                            letterSpacing: "0.1em",
                                            textTransform: "uppercase",
                                            color: "rgba(255,255,255,0.36)",
                                            border: "1px solid rgba(255,255,255,0.12)",
                                            borderRadius: 2,
                                            padding: "3px 8px",
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <Link
                                href={`/blog/${post.slug}`}
                                style={{
                                    marginTop: 8,
                                    fontFamily: F,
                                    fontSize: 11,
                                    letterSpacing: "0.14em",
                                    textTransform: "uppercase",
                                    color: "rgba(255,255,255,0.35)",
                                    textDecoration: "none",
                                }}
                            >
                                Read Post ↗
                            </Link>
                        </article>
                    ))}
                </div>

                <div
                    style={{
                        marginTop: 52,
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        paddingTop: 24,
                    }}
                >
                    <Link
                        href="/"
                        style={{
                            fontFamily: F,
                            fontSize: 11,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: GOLD,
                            textDecoration: "none",
                        }}
                    >
                        ← Back To Portfolio
                    </Link>
                </div>
            </div>
        </main>
    );
}
