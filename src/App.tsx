import { Routes, Route } from 'react-router-dom';
import { ProductListing } from './features/products/ProductListing';
import { ProductDetails } from './features/products/ProductDetails';
import { CheckoutPage } from './features/checkout/CheckoutPage';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
}

export default App;
