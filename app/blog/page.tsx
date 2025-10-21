import Link from "next/link";
import { articles } from "./data";
import Navbar from "../components/Navbar";

const genres = [
    "Street",
    "Portrait",
    "Landscape",
    "Other Stuff"
];

// articles imported from ./data

export default function AllArticlesPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            <Navbar />
            <section className="px-6 md:px-10 lg:px-16 pt-20 pb-10">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-10">
                        <h1 className="font-serif text-3xl md:text-5xl font-black tracking-tight">All Articles</h1>
                        <p className="font-body text-sm md:text-base text-neutral-600 mt-3">
                            Browse work by genre and mood. New frames added regularly.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {genres.map((g) => (
                            <span
                                key={g}
                                className="inline-flex items-center rounded-full border border-black/15 px-3 py-1 text-xs md:text-sm font-body tracking-wide uppercase hover:bg-black hover:text-white transition-colors"
                            >
                                {g}
                            </span>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {articles.map((a) => (
                            <article key={a.id} className="group rounded-md overflow-hidden border border-black/10 bg-white">
                                <Link href={`/blog/${a.id}`} className="block">
                                    <div className="aspect-[4/3] bg-neutral-200 overflow-hidden">
                                        <div
                                            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                            style={{ backgroundImage: `url(${a.image || "/placeholder.jpg"})` }}
                                        />
                                    </div>
                                    <div className="p-4 md:p-5">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-body text-[10px] md:text-xs uppercase tracking-widest text-neutral-600">
                                                {a.category}
                                            </span>
                                            <span className="font-body text-[10px] md:text-xs uppercase tracking-widest text-neutral-400">
                                                {a.date}
                                            </span>
                                        </div>
                                        <h3 className="font-serif text-lg md:text-xl font-black leading-snug">
                                            {a.title}
                                        </h3>
                                        {a.excerpt ? (
                                            <p className="font-body text-sm text-neutral-700 mt-2 line-clamp-2">
                                                {a.excerpt}
                                            </p>
                                        ) : null}
                                        <span className="inline-flex items-center gap-2 text-xs md:text-sm font-body font-semibold uppercase tracking-widest mt-4 text-black/80 group-hover:underline">
                                            Read Article →
                                        </span>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>

                    <div className="flex items-center justify-center mt-12">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-full border border-black px-5 py-2 text-sm md:text-base font-body uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}



