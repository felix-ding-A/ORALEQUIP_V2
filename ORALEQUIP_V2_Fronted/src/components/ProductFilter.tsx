import { useState, useEffect } from 'react';
import type { Product } from '../types';

const CATEGORIES = ['All', 'Instruments', 'Equipment', 'Consumables'] as const;
const MATERIALS = ['All', 'Stainless Steel', 'Titanium', 'Composite', 'Resin', 'Silicone', 'Digital', 'Mixed'] as const;

interface Props {
    products: Product[];
}

export function ProductFilter({ products }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedMaterial, setSelectedMaterial] = useState<string>('All');

    // Sync state with URL on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get('cat');
        const mat = params.get('mat');
        if (cat && CATEGORIES.includes(cat as any)) setSelectedCategory(cat);
        if (mat && MATERIALS.includes(mat as any)) setSelectedMaterial(mat);
    }, []);

    // Update URL when state changes
    const handleCategoryChange = (cat: string) => {
        setSelectedCategory(cat);
        setCurrentPage(1);
        const url = new URL(window.location.href);
        if (cat === 'All') url.searchParams.delete('cat');
        else url.searchParams.set('cat', cat);
        window.history.pushState({}, '', url);
    };

    const handleMaterialChange = (mat: string) => {
        setSelectedMaterial(mat);
        setCurrentPage(1);
        const url = new URL(window.location.href);
        if (mat === 'All') url.searchParams.delete('mat');
        else url.searchParams.set('mat', mat);
        window.history.pushState({}, '', url);
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 12;

    const filtered = products.filter((p) => {
        const catMatch = selectedCategory === 'All' || p.category === selectedCategory;
        const matMatch = selectedMaterial === 'All' || p.material === selectedMaterial;
        return catMatch && matMatch;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginatedProducts = filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    function FilterPanel() {
        return (
            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Category</h3>
                    <div className="space-y-1">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`block w-full text-left px-3 py-2 rounded-xl transition-colors text-sm ${selectedCategory === cat
                                        ? 'font-semibold'
                                        : ''
                                    }`}
                                style={{
                                    background: selectedCategory === cat ? 'rgba(77,182,172,0.1)' : 'transparent',
                                    color: selectedCategory === cat ? 'var(--primary)' : 'var(--muted-foreground)',
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Material</h3>
                    <div className="space-y-1">
                        {MATERIALS.map((mat) => (
                            <button
                                key={mat}
                                onClick={() => handleMaterialChange(mat)}
                                className={`block w-full text-left px-3 py-2 rounded-xl transition-colors text-sm`}
                                style={{
                                    background: selectedMaterial === mat ? 'rgba(77,182,172,0.1)' : 'transparent',
                                    color: selectedMaterial === mat ? 'var(--primary)' : 'var(--muted-foreground)',
                                }}
                            >
                                {mat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-56 shrink-0">
                <div className="rounded-2xl p-5 border sticky top-24 bg-white" style={{ borderColor: 'var(--border)' }}>
                    <FilterPanel />
                </div>
            </aside>

            {/* Mobile filter overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
                    <div className="absolute right-0 top-0 bottom-0 w-72 bg-white p-6 overflow-y-auto shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>Filters</h3>
                            <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg hover:bg-gray-100">
                                ✕
                            </button>
                        </div>
                        <FilterPanel />
                    </div>
                </div>
            )}

            {/* Product grid */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                        {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
                    </p>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-xl border text-sm"
                        style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    >
                        🔧 Filters
                    </button>
                </div>

                {filtered.length === 0 ? (
                    <div className="text-center py-20">
                        <span className="text-5xl">🔍</span>
                        <p className="mt-4 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                            No products match your current filters.
                        </p>
                        <button
                            onClick={() => { handleCategoryChange('All'); handleMaterialChange('All'); }}
                            className="mt-4 text-sm font-medium underline"
                            style={{ color: 'var(--primary)' }}
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {paginatedProducts.map((product) => (
                                <a
                                    key={product._id}
                                    href={`/products/${product.slug.current}`}
                                    className="group bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition-all hover:-translate-y-1"
                                    style={{ borderColor: 'var(--border)' }}
                                >
                                    <div className="overflow-hidden" style={{ aspectRatio: '4/3', background: 'var(--muted)' }}>
                                        <img
                                            src={product.image.url}
                                            alt={product.image.alt ?? product.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                            width="400"
                                            height="300"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <span
                                            className="inline-block px-3 py-0.5 rounded-full mb-2 text-xs font-medium"
                                            style={{ background: 'rgba(77,182,172,0.1)', color: 'var(--primary)' }}
                                        >
                                            {product.category}
                                        </span>
                                        <h3 className="mb-3 font-semibold" style={{ color: 'var(--foreground)', fontSize: '15px' }}>
                                            {product.title}
                                        </h3>
                                        <span className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--primary)' }}>
                                            View Details →
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Pagination UI */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-12">
                                <button
                                    onClick={() => {
                                        setCurrentPage(prev => Math.max(1, prev - 1));
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    disabled={currentPage === 1}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center border transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    ←
                                </button>
                                {[...Array(totalPages)].map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setCurrentPage(idx + 1);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className={`w-10 h-10 rounded-xl font-medium transition-colors border ${
                                            currentPage === idx + 1
                                                ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                                                : 'hover:bg-gray-50 text-[var(--foreground)] border-[var(--border)]'
                                        }`}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => {
                                        setCurrentPage(prev => Math.min(totalPages, prev + 1));
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    disabled={currentPage === totalPages}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center border transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
