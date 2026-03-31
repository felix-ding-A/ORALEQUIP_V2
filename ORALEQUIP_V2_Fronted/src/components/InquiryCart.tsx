import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { inquiryCart, updateInquiryQuantity, removeInquiryItem, clearInquiryCart } from '../store/inquiryStore';

export default function InquiryCart() {
  const cartItems = useStore(inquiryCart);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    whatsapp: '',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems, contact: formData })
      });
      
      if (response.ok) {
        clearInquiryCart();
        setFormData({ name: '', email: '', company: '', country: '', whatsapp: '', requirements: ''});
        window.location.href = '/';
      } else {
        const err = await response.json();
        console.error("Server Error:", err);
        alert(`There was an error submitting your inquiry. Please check the console or ensure Feishu columns match.`);
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return <div className="text-center py-20 animate-pulse text-gray-400">Loading your inquiry list...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border shadow-sm" style={{ borderColor: 'var(--border)' }}>
        <span className="text-6xl mb-6 block">📋</span>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Your Inquiry List is Empty</h2>
        <p className="mb-8 max-w-md mx-auto" style={{ color: 'var(--muted-foreground)' }}>
          You haven't added any products to your quote list yet. Browse our professional dental catalog and add the items you need.
        </p>
        <a href="/premium-selection" className="inline-flex bg-[var(--primary)] text-white px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 shadow-md">
          Browse Products
        </a>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-5 gap-10">
      {/* Left Column: Cart Items (Takes 3 columns) */}
      <div className="lg:col-span-3">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
            Selected Products ({cartItems.length})
          </h2>
          <button 
            onClick={() => clearInquiryCart()}
            className="text-sm font-medium text-red-500 hover:underline"
          >
            Clear All
          </button>
        </div>
        
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center shadow-sm" style={{ borderColor: 'var(--border)' }}>
              <div className="w-full sm:w-24 sm:h-24 aspect-square rounded-xl overflow-hidden bg-[var(--muted)] shrink-0 border" style={{ borderColor: 'var(--border)' }}>
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                )}
              </div>
              <div className="flex-1 w-full">
                <a href={`/premium-selection/${item.sku}`} className="font-semibold text-base mb-1 hover:underline block truncate" style={{ color: 'var(--foreground)' }}>
                  {item.name}
                </a>
                {item.sku && <p className="text-xs mb-3" style={{ color: 'var(--muted-foreground)' }}>SKU: {item.sku}</p>}
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center border rounded-lg h-9 overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                    <button 
                      type="button"
                      onClick={() => updateInquiryQuantity(item.id, item.quantity - 1)}
                      className="w-10 h-full flex items-center justify-center hover:bg-gray-50 transition-colors bg-white font-medium"
                      style={{ color: 'var(--foreground)' }}
                    >-</button>
                    <input 
                      type="number" 
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateInquiryQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="w-12 h-full text-center text-sm border-x focus:outline-none bg-gray-50 font-semibold"
                      style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                    />
                    <button 
                      type="button"
                      onClick={() => updateInquiryQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-full flex items-center justify-center hover:bg-gray-50 transition-colors bg-white font-medium"
                      style={{ color: 'var(--foreground)' }}
                    >+</button>
                  </div>
                  
                  <button 
                    onClick={() => removeInquiryItem(item.id)}
                    className="text-sm text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1"
                  >
                    × Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Contact Form (Takes 2 columns) */}
      <div className="lg:col-span-2">
        <div className="bg-white border rounded-3xl p-6 md:p-8 shadow-md sticky top-24" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3 mb-6 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
            <span className="text-3xl">📨</span>
            <div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>Submit Your Inquiry</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>Fill out the form below to receive a custom quote.</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Full Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" required 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow" 
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Work Email <span className="text-red-500">*</span></label>
                <input 
                  type="email" required 
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow" 
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
                  placeholder="john@clinic.com"
                />
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Company/Clinic <span className="text-red-500">*</span></label>
                <input 
                  type="text" required 
                  value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                  className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow" 
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
                  placeholder="Dental Care Inc."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Country <span className="text-red-500">*</span></label>
                <input 
                  type="text" required 
                  value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})}
                  className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow" 
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
                  placeholder="United States"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>WhatsApp / TEL</label>
              <input 
                type="tel" 
                value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow" 
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
                placeholder="+1 (123) 456-7890"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Additional Requirements</label>
              <textarea 
                rows={4}
                value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})}
                placeholder="E.g., Require CE certification, Need shipping estimate to specific location, Target timeline..."
                className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-y transition-shadow" 
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full text-white px-6 py-4 rounded-xl font-bold transition-all mt-6 shadow-lg shadow-teal-500/20 disabled:shadow-none hover:-translate-y-0.5 disabled:translate-y-0 bg-[var(--primary)] hover:opacity-90 disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                '🚀 Request Bulk Quote'
              )}
            </button>
            <p className="text-xs text-center mt-4" style={{ color: 'var(--muted-foreground)' }}>
              🔒 Your information is secure. We will reach out within 24 hours.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
