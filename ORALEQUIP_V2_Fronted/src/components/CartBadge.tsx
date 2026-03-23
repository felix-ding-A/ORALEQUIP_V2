import React from 'react';
import { useStore } from '@nanostores/react';
import { inquiryItemCount } from '../store/inquiryStore';
import { ClipboardList } from 'lucide-react';

export default function CartBadge() {
  const count = useStore(inquiryItemCount);

  if (count === 0) return null;

  return (
    <a
      href="/quote"
      className="fixed bottom-6 right-6 z-50 bg-[var(--primary)] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform group"
      aria-label="View Inquiry List"
      style={{ boxShadow: '0 10px 25px rgba(77,182,172,0.4)' }}
    >
      <ClipboardList size={24} className="group-hover:animate-pulse" />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md border-2 border-white">
        {count}
      </span>
    </a>
  );
}
