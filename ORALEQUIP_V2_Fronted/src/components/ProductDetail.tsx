import { useState } from 'react';
import RichText from './RichText';
import type { Product } from '../types';

interface Props {
    product: Product;
    related: Product[];
}

const TABS = [
    { key: 'specs', label: 'Specifications' },
    { key: 'clinical', label: 'Clinical Applications' },
    { key: 'features', label: 'Features' },
] as const;

type TabKey = typeof TABS[number]['key'];

export function ProductDetail({ product, related }: Props) {
    const [activeTab, setActiveTab] = useState<TabKey>('specs');
    const gallery = product.gallery?.length ? product.gallery : (product.image ? [product.image] : []);
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div>
            {/* Product Layout */}
            <div className="grid lg:grid-cols-2 gap-10 mb-16">
                {/* Image Gallery */}
                <div>
                    <div className="bg-white rounded-2xl overflow-hidden border mb-4" style={{ borderColor: 'var(--border)' }}>
                        <img
                            src={gallery[selectedImage]?.url}
                            alt={gallery[selectedImage]?.alt ?? product.title}
                            className="w-full object-cover"
                            style={{ aspectRatio: '1/1' }}
                            width="600"
                            height="600"
                        />
                    </div>
                    {gallery.length > 1 && (
                        <div className="flex gap-3">
                            {gallery.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className="w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors flex-shrink-0"
                                    style={{ borderColor: selectedImage === i ? 'var(--primary)' : 'var(--border)' }}
                                >
                                    <img src={img.url} alt={img.alt ?? ''} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div>
                    <span
                        className="inline-block px-3 py-1 rounded-full mb-4 text-sm font-medium"
                        style={{ background: 'rgba(77,182,172,0.1)', color: 'var(--primary)' }}
                    >
                        {product.category}
                    </span>
                    <h1
                        className="font-bold mb-4"
                        style={{ color: 'var(--foreground)', fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.3 }}
                    >
                        {product.title}
                    </h1>

                    <div className="text-base mb-8 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                        <RichText value={product.description} />
                    </div>

                    <a
                        href="mailto:info@oralequip.com"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white px-8 py-4 rounded-xl hover:opacity-90 transition-opacity mb-4 font-semibold text-base"
                        style={{ background: 'var(--primary)' }}
                    >
                        ✉️ Request a Quote / Contact Us
                    </a>

                    <div
                        className="flex items-center gap-2 mt-6 px-4 py-3 rounded-xl text-sm"
                        style={{ background: 'rgba(255,224,130,0.2)', color: 'var(--muted-foreground)' }}
                    >
                        🛡️&nbsp;<span>Approved by <strong style={{ color: 'var(--foreground)' }}>HI SMILE DENTAL</strong> — Clinic-tested and verified</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border overflow-hidden mb-16" style={{ borderColor: 'var(--border)' }}>
                <div className="flex border-b overflow-x-auto" style={{ borderColor: 'var(--border)' }}>
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className="px-6 py-4 whitespace-nowrap transition-colors border-b-2 text-sm font-medium"
                            style={{
                                borderBottomColor: activeTab === tab.key ? 'var(--primary)' : 'transparent',
                                color: activeTab === tab.key ? 'var(--primary)' : 'var(--muted-foreground)',
                                background: activeTab === tab.key ? 'rgba(77,182,172,0.05)' : 'transparent',
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="p-6 md:p-8">
                    {activeTab === 'specs' && (
                        <div className="space-y-4">
                            {(product.specs || []).map((spec: any) => (
                                <div
                                    key={spec.label}
                                    className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 border-b last:border-0"
                                    style={{ borderColor: 'var(--border)' }}
                                >
                                    <span className="w-40 shrink-0 text-sm" style={{ color: 'var(--muted-foreground)' }}>{spec.label}</span>
                                    <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'clinical' && (
                        <ul className="space-y-3">
                            {(product.clinicalApplications || []).map((app: any, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div
                                        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs"
                                        style={{ background: 'rgba(77,182,172,0.1)', color: 'var(--primary)' }}
                                    >
                                        →
                                    </div>
                                    <span className="text-sm" style={{ color: 'var(--foreground)' }}>{app}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    {activeTab === 'features' && (
                        <ul className="space-y-3">
                            {(product.features || []).map((feat: any, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div
                                        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm"
                                        style={{ background: 'rgba(255,224,130,0.5)' }}
                                    >
                                        ✨
                                    </div>
                                    <span className="text-sm" style={{ color: 'var(--foreground)' }}>{feat}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Related Products */}
            {related.length > 0 && (
                <div>
                    <h2 className="font-bold mb-6" style={{ color: 'var(--foreground)', fontSize: 'clamp(20px, 2.5vw, 28px)' }}>
                        Related Products
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {related.map((p) => (
                            <a
                                key={p._id}
                                href={`/products/${p.slug.current}`}
                                className="group bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition-all hover:-translate-y-1"
                                style={{ borderColor: 'var(--border)' }}
                            >
                                <div className="overflow-hidden" style={{ aspectRatio: '4/3', background: 'var(--muted)' }}>
                                    <img
                                        src={p.image.url}
                                        alt={p.image.alt ?? p.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                        width="300"
                                        height="225"
                                    />
                                </div>
                                <div className="p-4">
                                    <span
                                        className="inline-block px-2 py-0.5 rounded-full mb-2 text-xs font-medium"
                                        style={{ background: 'rgba(77,182,172,0.1)', color: 'var(--primary)' }}
                                    >
                                        {p.category}
                                    </span>
                                    <h4 className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>{p.title}</h4>
                                    <span className="inline-flex items-center gap-1 text-xs font-medium mt-2" style={{ color: 'var(--primary)' }}>
                                        View →
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
