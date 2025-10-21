export type Article = {
    id: string | number;
    image?: string;
    title: string;
    excerpt?: string;
    category?: string;
    date?: string;
};

export const articles: Article[] = [
    {
        id: 1,
        image: "/brutalist-urban-architecture-concrete-buildings.jpg",
        title: "Brutalist Lines",
        excerpt: "Exploring the geometry of concrete in urban spaces.",
        category: "Architecture",
        date: "Aug 02, 2025",
    },
    {
        id: 2,
        image: "/black-and-white-monochrome-photography.jpg",
        title: "Monochrome Silence",
        excerpt: "A study in light, shadow, and the spaces between.",
        category: "Monochrome",
        date: "Aug 08, 2025",
    },
    {
        id: 3,
        image: "/minimalist-photography-empty-space.jpg",
        title: "The Weight of Empty Space",
        excerpt: "Minimalist frames that breathe and linger.",
        category: "Minimalism",
        date: "Aug 12, 2025",
    },
    {
        id: 4,
        image: "/industrial-landscape-concrete-steel.jpg",
        title: "Steel Veins",
        excerpt: "Industrial landscapes and the poetry of machinery.",
        category: "Landscape",
        date: "Aug 15, 2025",
    },
];


