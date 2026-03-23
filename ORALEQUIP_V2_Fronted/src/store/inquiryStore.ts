import { persistentAtom } from '@nanostores/persistent';
import { computed } from 'nanostores';

export type InquiryItem = {
  id: string;      // Product ID or slug
  name: string;
  sku?: string;
  imageUrl?: string;
  quantity: number;
};

// Initialize persistent atom for cart storage
export const inquiryCart = persistentAtom<InquiryItem[]>(
  'oralequip-inquiry-cart',
  [],
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

// Actions
export function addInquiryItem(item: Omit<InquiryItem, 'quantity'>, quantity: number = 1) {
  const currentItems = inquiryCart.get();
  const existingItemIndex = currentItems.findIndex((i) => i.id === item.id);
  
  if (existingItemIndex > -1) {
    const newItems = [...currentItems];
    newItems[existingItemIndex] = {
      ...newItems[existingItemIndex],
      quantity: newItems[existingItemIndex].quantity + quantity
    };
    inquiryCart.set(newItems);
  } else {
    inquiryCart.set([...currentItems, { ...item, quantity }]);
  }
}

export function updateInquiryQuantity(id: string, newQuantity: number) {
  if (newQuantity <= 0) {
    removeInquiryItem(id);
    return;
  }
  
  const currentItems = inquiryCart.get();
  inquiryCart.set(
    currentItems.map((i) => 
      i.id === id ? { ...i, quantity: newQuantity } : i
    )
  );
}

export function removeInquiryItem(id: string) {
  inquiryCart.set(inquiryCart.get().filter((i) => i.id !== id));
}

export function clearInquiryCart() {
  inquiryCart.set([]);
}

// Total unique items count (for the badge)
export const inquiryItemCount = computed(inquiryCart, items => {
  return items.length; 
});
