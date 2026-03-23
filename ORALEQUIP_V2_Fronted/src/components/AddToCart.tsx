import React, { useState } from 'react';
import { addInquiryItem } from '../store/inquiryStore';

interface Props {
  product: {
    id: string;
    name: string;
    sku?: string;
    imageUrl?: string;
  };
  className?: string;
}

export default function AddToCart({ product, className = "" }: Props) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // In case it's inside an anchor tag
    addInquiryItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // Reset after 2s
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
        added ? 'bg-green-500 hover:bg-green-600' : 'bg-[var(--primary)] hover:opacity-90'
      } ${className}`}
    >
      {added ? (
        <>
          <span>✅</span> Added
        </>
      ) : (
        <>
          <span>➕</span> Add to Quote
        </>
      )}
    </button>
  );
}
