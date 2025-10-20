"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

type Post = {
    id: string | number;
    image?: string;
    title: string;
    excerpt?: string;
    category?: string;
    date?: string;
};

type Props = {
    posts: Post[];
    className?: string;
};

export default function HorizontalArticleScroller({ posts, className = "" }: Props) {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const stickyRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const wrap = wrapRef.current!;
        const sticky = stickyRef.current!;
        const track = trackRef.current!;
        if (!wrap || !sticky || !track) return;

        const slides = posts.length || 1;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Lebar track = jumlah slide * 100vw
        track.style.width = `${slides * 100}vw`;

        // Tinggi wrapper = jarak scroll yang dibutuhkan untuk menggerakkan horizontal
        // Setiap slide membutuhkan scroll sebesar viewport height
        const wrapperHeight = slides * vh;
        wrap.style.height = `${wrapperHeight}px`;

        let rafId = 0;
        const onScroll = () => {
            // Progress scroll dalam wrapper
            const rect = wrap.getBoundingClientRect();
            const start = rect.top;
            const max = wrapperHeight - vh;
            const scrolled = Math.min(Math.max(-start, 0), max);

            // Progress dari 0 ke 1
            const progress = max > 0 ? scrolled / max : 0;
            
            // Hitung translate: dari 0 sampai -(slides-1) * vw
            // Pastikan progress tidak melebihi 1
            const clampedProgress = Math.min(progress, 1);
            const totalScrollX = (slides - 1) * vw;
            const translate = -clampedProgress * totalScrollX;

            // pakai RAF biar halus
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                track.style.transform = `translate3d(${translate}px,0,0)`;
            });
        };

        // Mulai di posisi benar saat mount/resize
        const onResize = () => {
            const vw2 = window.innerWidth;
            const vh2 = window.innerHeight;
            const wrapperHeight2 = slides * vh2;
            const totalScrollX2 = (slides - 1) * vw2;
            
            track.style.width = `${slides * 100}vw`;
            wrap.style.height = `${wrapperHeight2}px`;
            onScroll();
        };

        // Passive scroll listener
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        onScroll();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            cancelAnimationFrame(rafId);
        };
    }, [posts.length]);

    return (
        <section ref={wrapRef} className={`relative w-full ${className}`}>
            {/* Sticky viewport: mengunci tinggi 1 layar */}
            <div
                ref={stickyRef}
                className="sticky top-0 h-screen w-full overflow-hidden bg-black"
            >
                {/* Track horizontal yang digeser */}
                <div
                    ref={trackRef}
                    className="h-full will-change-transform flex"
                    style={{
                        transform: "translate3d(0,0,0)",
                        transition: "transform 0.06s linear",
                    }}
                >
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="relative h-screen w-screen overflow-hidden group flex-shrink-0"
                        >
                            {/* Background image full-selayar */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                                style={{ backgroundImage: `url(${post.image || "/placeholder.svg"})` }}
                                aria-hidden
                            />

                            {/* Overlay gradient untuk keterbacaan */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                            {/* Konten di atas gambar */}
                            <div className="relative z-10 h-full max-w-4xl mx-auto flex flex-col justify-end p-8 md:p-16 text-white">
                                <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/40">
                                    <span className="font-body text-xs md:text-sm uppercase tracking-widest font-bold">
                                        {post.category}
                                    </span>
                                    <span className="font-body text-xs md:text-sm uppercase tracking-widest opacity-80">
                                        {post.date}
                                    </span>
                                </div>

                                <Link href={`/blog/${post.id}`}>
                                    <h2 className="font-serif text-3xl md:text-5xl font-black leading-tight mb-6 hover:underline">
                                        {post.title}
                                    </h2>
                                </Link>

                                {post.excerpt ? (
                                    <p className="font-body text-base md:text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl">
                                        {post.excerpt}
                                    </p>
                                ) : null}

                                <Link
                                    href={`/blog/${post.id}`}
                                    className="font-body text-xs md:text-sm font-bold uppercase tracking-widest hover:underline"
                                >
                                    Baca Artikel →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
