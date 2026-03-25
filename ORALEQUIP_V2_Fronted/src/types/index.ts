// Portable Text block type (matches Sanity output)
export interface PortableTextSpan {
    _type: 'span';
    _key?: string;
    text: string;
    marks?: string[];
}

export interface PortableTextBlock {
    _type: 'block';
    _key: string;
    style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
    children: PortableTextSpan[];
    markDefs?: { _key: string; _type: string; href?: string }[];
}

export interface SanityImage {
    url: string;
    alt?: string;
}

export interface ProductSpec {
    label: string;
    value: string;
}

export interface ProductFAQ {
    question: string;
    answer: string;
}

// Product — 1:1 mapping to future Sanity product schema
export interface Product {
    _id: string;
    title: string;
    slug: { current: string };
    category: 'Instruments' | 'Equipment' | 'Consumables';
    material: string;
    image: SanityImage;
    gallery?: SanityImage[];
    description: PortableTextBlock[];
    specs: ProductSpec[];
    clinicalApplications: string[];
    features: string[];
    faqs?: ProductFAQ[];
}

// BlogPost — 1:1 mapping to future Sanity post schema
export interface BlogPost {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    image: SanityImage;
    author: string;
    clinic: string;
    date: string;
    readTime: string;
    featured?: boolean;
    body: PortableTextBlock[];
}
