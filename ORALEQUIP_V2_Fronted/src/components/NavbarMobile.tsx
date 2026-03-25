import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
    { href: '/', label: 'Home' },
    { href: '/products?cat=Instruments', label: 'Instruments' },
    { href: '/products?cat=Equipment', label: 'Equipment' },
    { href: '/products', label: 'All Products' },
    { href: '/blog', label: 'Blog' },
];

export function NavbarMobile({ currentPath }: { currentPath: string }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className="md:hidden p-2 text-[var(--foreground)] rounded-lg hover:bg-[var(--muted)] transition-colors"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                aria-expanded={open}
            >
                {open ? <X size={24} /> : <Menu size={24} />}
            </button>

            {open && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-[var(--border)] px-4 py-4 space-y-1 shadow-lg z-50">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className={`block px-4 py-2.5 rounded-xl transition-colors ${currentPath === link.href
                                    ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                                    : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="mailto:info@oralequip.com"
                        onClick={() => setOpen(false)}
                        className="block text-center bg-[var(--primary)] text-white px-5 py-2.5 rounded-xl mt-2 hover:opacity-90 transition-opacity"
                    >
                        Request a Quote
                    </a>
                </div>
            )}
        </>
    );
}
