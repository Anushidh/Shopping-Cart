import { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { calculateTotals } from '../../lib/cartCalculations';
import { ShippingFormSchema } from '../../types/shipping';
import type { ShippingFormData } from '../../types/shipping';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, Check } from 'lucide-react';
import { z } from 'zod';

type CheckoutStep = 1 | 2 | 3 | 4; 

export const CheckoutPage = () => {
  const [step, setStep] = useState<CheckoutStep>(1);
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();
  
  const [formData, setFormData] = useState<ShippingFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: ''
  });
  
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ShippingFormData, string>>>({});
  
  const totals = calculateTotals(items);
  const isMinCheckoutMet = totals.subtotal >= 10;
  const isCartEmpty = items.length === 0;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof ShippingFormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      ShippingFormSchema.parse(formData);
      setStep(3);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: any = {};
        err.issues.forEach((issue: z.ZodIssue) => {
          if (issue.path[0]) {
            errors[issue.path[0]] = issue.message;
          }
        });
        setFormErrors(errors);
      }
    }
  };

  const handlePlaceOrder = () => {
    setStep(4);
    clearCart();
  };

  if (step === 4) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8">
          <Check size={32} />
        </div>
        <h1 className="text-3xl font-light uppercase tracking-[0.2em] mb-4">Order Confirmed</h1>
        <p className="text-gray-500 mb-12">Thank you for your purchase. Your order is being processed.</p>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12">
      <div className="flex items-center justify-center gap-8 mb-16 border-b border-gray-200 pb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`flex items-center gap-2 text-xs uppercase tracking-widest font-bold ${step === s ? 'text-black' : 'text-gray-300'}`}>
            <span className={`w-6 h-6 flex items-center justify-center border ${step === s ? 'border-black bg-black text-white' : 'border-gray-300'}`}>
              {s}
            </span>
            <span className="hidden sm:inline">
              {s === 1 ? 'Cart' : s === 2 ? 'Shipping' : 'Payment'}
            </span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="animate-in fade-in duration-500">
          <h2 className="text-2xl font-light uppercase tracking-[0.2em] mb-8">Shopping Bag</h2>
          
          {isCartEmpty ? (
            <div className="py-12 text-center text-gray-500">
              <p className="uppercase tracking-widest text-sm mb-6 text-black">Your bag is empty</p>
              <Link to="/" className="btn btn-primary">
                Return to Shop
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-grow space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 border-b border-gray-100 pb-6">
                    <div className="w-24 h-32 bg-gray-50 flex-shrink-0">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-2">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-xs uppercase tracking-widest font-bold">{item.title}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{item.category}</p>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-black">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-100 disabled:opacity-30 cursor-pointer" disabled={item.quantity <= 1}>
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-100 disabled:opacity-30 cursor-pointer" disabled={item.quantity >= 5}>
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="w-full lg:w-80 flex-shrink-0">
                <div className="bg-gray-50 p-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Order Summary</h3>
                  <div className="space-y-4 text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-500 uppercase text-[10px] tracking-widest">Subtotal</span>
                      <span>${totals.subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {!isMinCheckoutMet && (
                    <div className="bg-red-50 text-red-600 p-4 text-[10px] uppercase tracking-widest mb-6 border border-red-100">
                      Minimum order value of $10.00 required to checkout.
                    </div>
                  )}
                  
                  <button 
                    onClick={() => setStep(2)} 
                    disabled={!isMinCheckoutMet}
                    className="btn btn-primary w-full gap-2"
                  >
                    CONTINUE <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="animate-in fade-in duration-500 max-w-xl mx-auto">
          <h2 className="text-2xl font-light uppercase tracking-[0.2em] mb-8 text-center">Shipping Details</h2>
          <form onSubmit={handleShippingSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input type="text" name="fullName" placeholder="FULL NAME" value={formData.fullName} onChange={handleFormChange} className={`input-field ${formErrors.fullName ? 'border-red-500 border-b-2' : ''}`} />
                {formErrors.fullName && <p className="text-[10px] text-red-500 uppercase tracking-widest mt-1">{formErrors.fullName}</p>}
              </div>
              <div>
                <input type="email" name="email" placeholder="EMAIL ADDRESS" value={formData.email} onChange={handleFormChange} className={`input-field ${formErrors.email ? 'border-red-500 border-b-2' : ''}`} />
                {formErrors.email && <p className="text-[10px] text-red-500 uppercase tracking-widest mt-1">{formErrors.email}</p>}
              </div>
            </div>
            
            <div>
              <input type="text" name="phoneNumber" placeholder="PHONE NUMBER" value={formData.phoneNumber} onChange={handleFormChange} className={`input-field ${formErrors.phoneNumber ? 'border-red-500 border-b-2' : ''}`} />
              {formErrors.phoneNumber && <p className="text-[10px] text-red-500 uppercase tracking-widest mt-1">{formErrors.phoneNumber}</p>}
            </div>

            <div>
              <input type="text" name="address" placeholder="STREET ADDRESS" value={formData.address} onChange={handleFormChange} className={`input-field ${formErrors.address ? 'border-red-500 border-b-2' : ''}`} />
              {formErrors.address && <p className="text-[10px] text-red-500 uppercase tracking-widest mt-1">{formErrors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input type="text" name="city" placeholder="CITY" value={formData.city} onChange={handleFormChange} className={`input-field ${formErrors.city ? 'border-red-500 border-b-2' : ''}`} />
                {formErrors.city && <p className="text-[10px] text-red-500 uppercase tracking-widest mt-1">{formErrors.city}</p>}
              </div>
              <div>
                <input type="text" name="postalCode" placeholder="POSTAL CODE" value={formData.postalCode} onChange={handleFormChange} className={`input-field ${formErrors.postalCode ? 'border-red-500 border-b-2' : ''}`} />
                {formErrors.postalCode && <p className="text-[10px] text-red-500 uppercase tracking-widest mt-1">{formErrors.postalCode}</p>}
              </div>
            </div>

            <div className="flex gap-4 pt-8">
              <button 
                type="button" 
                onClick={() => {
                  setFormErrors({});
                  setStep(1);
                }} 
                className="btn btn-secondary w-full"
              >
                BACK TO CART
              </button>
              <button type="submit" className="btn btn-primary w-full gap-2">
                CONTINUE <ArrowRight size={14} />
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
          <h2 className="text-2xl font-light uppercase tracking-[0.2em] mb-8 text-center">Payment Summary</h2>
          
          <div className="bg-gray-50 p-8 mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Shipping To</h3>
            <div className="text-sm space-y-1 text-gray-600">
              <p className="font-medium text-black uppercase tracking-widest text-xs">{formData.fullName}</p>
              <p>{formData.address}</p>
              <p>{formData.city}, {formData.postalCode}</p>
              <p>{formData.email} • {formData.phoneNumber}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">Order Details</h3>
            <div className="space-y-4 mb-8">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 uppercase tracking-widest text-[10px]">{item.quantity}x {item.title}</span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase text-[10px] tracking-widest">Subtotal</span>
                <span>${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase text-[10px] tracking-widest">Tax (5%)</span>
                <span>${totals.tax.toFixed(2)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span className="uppercase text-[10px] tracking-widest">Discount (10%)</span>
                  <span>-${totals.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between pt-4 mt-4 border-t border-black text-lg font-bold">
                <span className="uppercase tracking-widest">Total</span>
                <span>${totals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setStep(2)} className="btn btn-secondary w-full">
              EDIT DETAILS
            </button>
            <button onClick={handlePlaceOrder} className="btn btn-primary w-full">
              PLACE ORDER
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
