"use client"

import Footer from "@/app/components/Footer"
import Link from "next/link"
import { useState } from "react"

interface BlogPostDetail {
  id: string
  title: string
  subtitle: string
  date: string
  author: string
  category: string
  image: string
  content: string
  galleryImages: string[]
}

const blogPostsData: Record<string, BlogPostDetail> = {
  "1": {
    id: "1",
    title: "Seni di Tengah Kota",
    subtitle: "Melihat keindahan mentah dari jalanan dan bentuk bangunan dengan pandangan yang jujur dan keras kepala",
    date: "15 Oktober 2024",
    author: "Rama",
    category: "Kota",
    image: "/brutalist-urban-architecture-concrete-buildings.jpg",
    galleryImages: [
      "/brutalist-urban-architecture-concrete-buildings.jpg",
      "/industrial-landscape-concrete-steel.jpg",
      "/black-and-white-monochrome-photography.jpg",
    ],
    content: `Kota adalah kanvas hidup. Penuh garis keras, bayangan tajam, dan bentuk yang muncul dari ambisi manusia. Bagi yang mau melihat, ada semacam puisi di setiap retakan dinding, di setiap cahaya yang jatuh di permukaan beton.

Waktu pertama kali aku mulai memotret, aku nggak sadar kalau gedung-gedung yang orang anggap “jelek” itu sebenarnya punya daya tarik yang jujur. Arsitektur brutalist, misalnya — kaku, besar, dan tanpa hiasan. Tapi di balik itu ada kejujuran bentuk. Tidak berusaha cantik, hanya ingin bertahan.

Kuncinya ada di cahaya. Siang bolong bikin bayangan jadi keras dan bentuk jadi tegas. Sore memberi hangat dan tekstur. Sementara senja mengubah kota jadi potongan siluet yang sepi tapi puitis.

Fotografi kota bukan soal gedung atau jalan, tapi soal manusia yang membangun dan menempatinya. Soal menemukan keindahan dalam fungsi, dan makna di antara hal-hal yang tampak biasa.`,
  },

  "2": {
    id: "2",
    title: "Minimalisme dalam Komposisi",
    subtitle: "Tentang bagaimana ‘lebih sedikit’ bisa berarti lebih banyak, dan bagaimana ruang kosong bisa berbicara",
    date: "8 Oktober 2024",
    author: "Rama",
    category: "Teknik",
    image: "/minimalist-photography-empty-space.jpg",
    galleryImages: [
      "/minimalist-photography-empty-space.jpg",
      "/brutalist-urban-architecture-concrete-buildings.jpg",
      "/industrial-landscape-concrete-steel.jpg",
    ],
    content: `Fotografi minimalis bukan tentang kekosongan — tapi tentang niat. Ini cara untuk menghapus yang tidak perlu, agar yang penting bisa terlihat jelas. Di dunia yang kebanyakan bising visual, foto minimalis terasa seperti napas panjang.

Ruang kosong itu bukan kehampaan. Justru di situlah subjek bisa bernapas. Langit yang luas, dinding polos, jalanan sepi — semuanya bisa jadi bingkai untuk sesuatu yang kecil tapi berarti.

Setiap elemen di dalam frame harus punya alasan untuk ada. Kalau tidak menambah makna, dia malah mengganggu. Itu berlaku untuk warna, bentuk, bahkan cahaya.

Butuh kesabaran untuk mendapatkan momen minimalis. Cahaya yang pas, bentuk yang sederhana, atau hanya bayangan yang muncul sebentar di tembok. Kadang foto seperti itu bukan dicari, tapi ditemukan.`,
  },

  "3": {
    id: "3",
    title: "Hitam Putih yang Tak Pernah Usang",
    subtitle: "Kenapa foto monokrom tetap jadi cara paling jujur untuk bercerita lewat gambar",
    date: "30 September 2024",
    author: "Rama",
    category: "Filosofi",
    image: "/black-and-white-monochrome-photography.jpg",
    galleryImages: [
      "/black-and-white-monochrome-photography.jpg",
      "/minimalist-photography-empty-space.jpg",
      "/brutalist-urban-architecture-concrete-buildings.jpg",
    ],
    content: `Fotografi hitam putih bukan soal keterbatasan. Justru sebaliknya — ini kebebasan. Tanpa warna, mata kita dipaksa melihat bentuk, tekstur, dan emosi dengan lebih dalam.

Ada alasan kenapa foto hitam putih terasa abadi. Dari masa awal fotografi sampai sekarang, monokrom selalu jadi cara manusia memahami dunia tanpa gangguan warna. Setiap gradasi abu-abu membawa suasana — dari tenang sampai getir.

Warna bisa memanjakan mata, tapi hitam putih menyentuh perasaan. Potret sederhana bisa terasa lebih jujur, lanskap bisa terasa lebih sunyi, dan bayangan bisa jadi lebih bermakna.

Foto hitam putih bukan tentang nostalgia. Ini tentang kesadaran — bahwa keindahan tidak selalu butuh warna, hanya butuh cahaya yang jujur.`,
  },

  "4": {
    id: "4",
    title: "Menangkap Cahaya di Hutan Beton",
    subtitle: "Bagaimana lanskap industri bisa jadi puisi tentang bentuk, cahaya, dan waktu",
    date: "22 September 2024",
    author: "Rama",
    category: "Kota",
    image: "/industrial-landscape-concrete-steel.jpg",
    galleryImages: [
      "/industrial-landscape-concrete-steel.jpg",
      "/black-and-white-monochrome-photography.jpg",
      "/minimalist-photography-empty-space.jpg",
    ],
    content: `Lanskap industri itu paradoks: keras tapi indah, fungsional tapi puitis. Gedung beton, jembatan baja, pipa-pipa besar — semua terlihat kaku, tapi diam-diam mereka menyimpan ritme dan pola.

Beton dan baja punya bahasanya sendiri. Kalau diperhatikan, permukaannya merekam waktu: hujan, debu, sinar matahari. Setiap retakan dan noda adalah cerita kecil tentang bertahan.

Tantangan memotret tempat seperti ini adalah menemukan sisi manusianya. Tempat yang awalnya tampak dingin bisa terasa hidup kalau ditangkap di cahaya yang tepat. Kadang yang paling keras justru menyimpan keindahan paling tenang.

Fotografi industri bukan soal gedung atau mesin, tapi tentang bagaimana manusia membentuk dunia, dan bagaimana dunia perlahan membentuk balik manusia.`,
  },
}


export default function BlogPost({ params }: { params: { id: string } }) {
  const post = blogPostsData[params.id]
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (!post) {
    return (
      <main className="min-h-screen bg-white px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl font-black mb-8">Post Not Found</h1>
          <Link href="/" className="font-body text-sm font-bold uppercase tracking-widest hover:underline">
            ← Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b-2 border-black px-6 md:px-12 py-6">
        <Link
          href="/"
          className="font-body text-xs font-bold uppercase tracking-widest hover:underline transition-all duration-300"
        >
          ← Back to Home
        </Link>
      </nav>

      {/* Featured Image - Full Width */}
      <div className="border-b-4 border-black overflow-hidden bg-gray-100 aspect-video md:aspect-auto md:h-96 lg:h-[500px]">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover animate-fade-in"
        />
      </div>

      {/* Article Header - Newspaper Masthead */}
      <article className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Category & Date */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-6 border-b-2 border-black gap-2">
          <span className="font-body text-xs uppercase tracking-widest font-bold text-gray-700">{post.category}</span>
          <span className="font-body text-xs uppercase tracking-widest text-gray-600">{post.date}</span>
        </div>

        {/* Main Title - Bold & Large */}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tighter mb-6 animate-fade-in">
          {post.title}
        </h1>

        {/* Subtitle */}
        <p className="font-body text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl">{post.subtitle}</p>

        {/* Byline - Newspaper Style */}
        <div className="border-t-2 border-b-2 border-black py-6 mb-12">
          <p className="font-body text-sm text-gray-700">
            <span className="font-bold">By {post.author}</span>
            <span className="text-gray-600"> | Published {post.date}</span>
          </p>
        </div>

        {/* Article Content - Newspaper Column Style */}
        <div className="max-w-3xl">
          {post.content.split("\n\n").map((paragraph, index) => {
            const isGalleryPosition = index === 2
            return (
              <div key={index}>
                <p
                  className="font-body text-base md:text-lg leading-relaxed mb-6 text-gray-800 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {paragraph}
                </p>
                {isGalleryPosition && (
                  <div className="my-12 md:my-16">
                    <div className="border-4 border-black p-8 md:p-12 bg-gray-50">
                      <h3 className="font-serif text-2xl md:text-3xl font-black mb-8 uppercase tracking-tight">
                        Gallery
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {post.galleryImages.map((img, imgIndex) => (
                          <div
                            key={imgIndex}
                            onClick={() => setSelectedImage(img)}
                            className="border-2 border-black overflow-hidden bg-gray-200 aspect-square group cursor-pointer"
                          >
                            <img
                              src={img || "/placeholder.svg"}
                              alt={`Gallery image ${imgIndex + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out animate-fade-in"
                              style={{ animationDelay: `${(index + imgIndex) * 50}ms` }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Article Footer */}
        <div className="border-t-4 border-black mt-16 md:mt-20 pt-12">
          <Link
            href="/"
            className="inline-block font-body text-xs font-bold uppercase tracking-widest border-2 border-black px-6 py-4 hover:bg-black hover:text-white transition-all duration-300 whitespace-nowrap"
          >
            ← Back to Articles
          </Link>
        </div>
      </article>

      {/* Footer */}
      <Footer />

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] border-4 border-white animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Full size gallery image"
              className="w-full h-full object-contain"
            />
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white text-black border-2 border-white w-12 h-12 flex items-center justify-center font-bold text-xl hover:bg-black hover:text-white transition-all duration-300"
              aria-label="Close modal"
            >
              ✕
            </button>
            {/* Keyboard hint */}
            <div className="absolute bottom-4 left-4 text-white font-body text-xs uppercase tracking-widest">
              Press ESC or click outside to close
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
