import Link from "next/link"
import Footer from "./components/Footer"
import BarberBorder from "./components/BarberBorder"
import HorizontalArticleScroller from "./components/HorizontalArticleScroller"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  image: string
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Seni di Tengah Kota",
    excerpt: "Melihat keindahan mentah dari jalanan dan bangunan kota.",
    date: "15 Oktober 2024",
    author: "Rama",
    category: "Kota",
    image: "/brutalist-urban-architecture-concrete-buildings.jpg",
  },
  {
    id: "2",
    title: "Belajar dari Ruang Kosong",
    excerpt: "Tentang bagaimana 'lebih sedikit' bisa berarti lebih banyak.",
    date: "8 Oktober 2024",
    author: "Rama",
    category: "Teknik",
    image: "/minimalist-photography-empty-space.jpg",
  },
  {
    id: "3",
    title: "Hitam Putih dan Cerita yang Tak Pernah Usang",
    excerpt: "Kenapa foto monokrom selalu punya kekuatan untuk bercerita.",
    date: "30 September 2024",
    author: "Rama",
    category: "Filosofi",
    image: "/black-and-white-monochrome-photography.jpg",
  },
  {
    id: "4",
    title: "Menangkap Cahaya",
    excerpt: "Tentang bagaimana gedung, bayangan, dan cahaya saling bicara.",
    date: "22 September 2024",
    author: "Rama",
    category: "Kota",
    image: "/industrial-landscape-concrete-steel.jpg",
  },
]


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Masthead - Newspaper Style */}
      <header className="border-b-4 border-black px-6 md:px-12 pb-6 pt-3 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-[3.5rem] p-0 md:text-8xl font-black text-center md:text-start mb-2">FOTONYARAMA</h1>
          <div className="border-t-4 border-black my-4" />
          <p className="font-body text-base md:text-lg text-gray-700 max-w-2xl leading-relaxed">
            Koleksi catatan visual tentang bagaimana aku melihat bentuk, cahaya, dan keanehan kecil di sekitar. Kadang benda sepele, kadang pantulan di kaca toko, atau bayangan di tembok yang kelihatan menarik tanpa alasan jelas.
          </p>
          <p className="font-body text-xs md:text-sm text-gray-600 uppercase tracking-widest mt-6">
            By Aulia Ramadhan
          </p>
        </div>
      </header>

      {/* Featured Article - Full Width */}
      <section className="border-b-4 border-black">
        <article className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Featured Image */}
          <div className="md:col-span-2 border-r-4 border-black overflow-hidden bg-gray-100 aspect-video md:aspect-auto md:h-96">
            <img
              src={blogPosts[0].image || "/placeholder.svg"}
              alt={blogPosts[0].title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>

          {/* Featured Content */}
          <div className="p-8 md:p-10 flex flex-col justify-between bg-white">
            <div>
              <div className="flex flex-col gap-2 mb-6 pb-4 border-b-2 border-black">
                <span className="font-body text-xs uppercase tracking-widest font-bold text-gray-700">
                  {blogPosts[0].category}
                </span>
                <span className="font-body text-xs uppercase tracking-widest text-gray-600">{blogPosts[0].date}</span>
              </div>

              <Link href={`/blog/${blogPosts[0].id}`}>
                <h2 className="font-serif text-3xl md:text-4xl font-black leading-tight mb-4 hover:underline cursor-pointer transition-all duration-300">
                  {blogPosts[0].title}
                </h2>
              </Link>

              <p className="font-body text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                {blogPosts[0].excerpt}
              </p>
            </div>

            <Link
              href={`/blog/${blogPosts[0].id}`}
              className="inline-block font-body text-xs font-bold uppercase tracking-widest border-2 border-black px-4 py-3 hover:bg-black hover:text-white transition-all duration-300 w-fit"
            >
              Read Article →
            </Link>
          </div>
        </article>
      </section>

      <BarberBorder />

      {/* Grid of Articles */}
      <HorizontalArticleScroller posts={blogPosts.slice(1)} />



      {/* Footer */}
      <Footer />
    </main>
  )
}
