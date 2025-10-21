import Link from "next/link";
import { articles } from "../blog/data";
import Navbar from "../components/Navbar";

export default function GalleryPage() {
    const images = articles
        .map((a) => a.image)
        .filter((src): src is string => Boolean(src));

    return (
        <main className="min-h-screen bg-white text-black">
            <Navbar />
            <section className="px-6 md:px-10 lg:px-16 pt-20 pb-10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
                        <div>
                            <h1 className="font-serif text-3xl md:text-5xl font-black tracking-tight">Gallery</h1>
                            <p className="font-body text-sm md:text-base text-neutral-600 mt-3">
                                Image-only masonry grid from all articles.
                            </p>
                        </div>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 rounded-full border border-black px-5 py-2 text-sm md:text-base font-body uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                        >
                            View Articles
                        </Link>
                    </div>

                    {/* Masonry using CSS columns; keep images at intrinsic size (no upscaling) */}
                    <div className="[column-fill:_balance]
                                    columns-1 sm:columns-2 lg:columns-3 xl:columns-4
                                    gap-4 md:gap-6">
                        {images.map((src, idx) => (
                            <div key={idx} className="mb-4 md:mb-6 break-inside-avoid">
                                <img
                                    src={src}
                                    alt="Gallery image"
                                    className="inline-block h-auto max-w-full"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}


