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
        const totalSlides = slides + 1; // include CTA slide
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Deteksi mobile berdasarkan lebar layar
        const isMobile = vw < 768; // breakpoint md di Tailwind

        // Lebar track = jumlah slide * 100vw
        track.style.width = `${totalSlides * 100}vw`;

        // Tinggi wrapper berbeda untuk mobile dan desktop
        let wrapperHeight;
        if (isMobile) {
            // Mobile: setiap slide membutuhkan scroll yang lebih kecil
            // Gunakan perhitungan yang lebih konservatif untuk mobile
            wrapperHeight = totalSlides * vh * 0.8; // 80% dari viewport height per slide
        } else {
            // Desktop: setiap slide membutuhkan scroll sebesar viewport height
            // Tambahkan sedikit extra space untuk memastikan semua slide ter-reveal
            wrapperHeight = totalSlides * vh + vh * 0.5; // tambah 50% viewport height extra
        }
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
            
            // Clamp progress berbeda untuk mobile dan desktop
            let clampedProgress;
            if (isMobile) {
                // Mobile: clamp lebih ketat untuk mencegah scroll berlebihan
                clampedProgress = Math.min(progress, 1);
            } else {
                // Desktop: biarkan progress lebih fleksibel untuk extra space
                clampedProgress = Math.min(progress, 1.2); // biarkan sedikit lebih dari 1
            }
            
            // Hitung slide index berdasarkan progress
            const slideIndex = clampedProgress * (totalSlides - 1);
            const translate = -slideIndex * vw;

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
            const isMobile2 = vw2 < 768;
            
            let wrapperHeight2;
            if (isMobile2) {
                wrapperHeight2 = totalSlides * vh2 * 0.8;
            } else {
                wrapperHeight2 = totalSlides * vh2 + vh2 * 0.5; // tambah 50% viewport height extra
            }
            
            track.style.width = `${totalSlides * 100}vw`;
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
                    {[...posts, { id: "__cta__" } as any].map((post) => (
                        <article
                            key={post.id}
                            className="relative h-screen w-screen overflow-hidden group flex-shrink-0"
                        >
                            {/* Background image full-selayar */}
                            {post.id === "__cta__" ? (
                                <div className="absolute inset-0 bg-black flex items-center justify-center">
                                    <div className="text-center px-6">
                                        <p className="font-body text-xs md:text-sm uppercase tracking-[0.25em] text-white/70 mb-3">Find more articles</p>
                                        <Link
                                            href="/blog"
                                            className="inline-flex items-center gap-2 rounded-full border border-white/70 px-6 py-3 text-white font-body uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                                        >
                                            View All Articles
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                                    style={{ backgroundImage: `url(${(post as any).image || "/placeholder.svg"})` }}
                                    aria-hidden
                                />
                            )}

                            {/* Overlay gradient untuk keterbacaan */}
                            {post.id === "__cta__" ? null : (
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                            )}

                            {/* Konten di atas gambar */}
                            {post.id === "__cta__" ? null : (
                                <div className="relative z-10 h-full max-w-4xl mx-auto flex flex-col justify-end p-8 md:p-16 text-white">
                                    <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/40">
                                        <span className="font-body text-xs md:text-sm uppercase tracking-widest font-bold">
                                            {(post as any).category}
                                        </span>
                                        <span className="font-body text-xs md:text-sm uppercase tracking-widest opacity-80">
                                            {(post as any).date}
                                        </span>
                                    </div>

                                    <Link href={`/blog/${(post as any).id}`}>
                                        <h2 className="font-serif text-3xl md:text-5xl font-black leading-tight mb-6 hover:underline">
                                            {(post as any).title}
                                        </h2>
                                    </Link>

                                    {(post as any).excerpt ? (
                                        <p className="font-body text-base md:text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl">
                                            {(post as any).excerpt}
                                        </p>
                                    ) : null}

                                    <Link
                                        href={`/blog/${(post as any).id}`}
                                        className="font-body text-xs md:text-sm font-bold uppercase tracking-widest hover:underline"
                                    >
                                        Baca Artikel →
                                    </Link>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
