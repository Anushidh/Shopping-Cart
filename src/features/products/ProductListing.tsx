import { useProducts } from '../../hooks/useProducts';
import { useProductFilters } from '../../hooks/useProductFilters';
import { ProductCard } from '../../components/ProductCard';
import { X, Loader2, AlertCircle } from 'lucide-react';

export const ProductListing = () => {
  const { data: response, isLoading, isError, error } = useProducts();
  
  const {
    search,
    setSearch,
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    sortOption,
    setSortOption,
    filteredProducts,
    uniqueCategories,
    clearFilters,
  } = useProductFilters(response?.products);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-black gap-4">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="uppercase text-xs tracking-widest">Loading Collection</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-red-600 gap-4">
        <AlertCircle className="w-10 h-10" />
        <p className="uppercase text-xs tracking-widest">Failed to load collection</p>
        <p className="text-xs">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
      <aside className="w-full md:w-56 flex-shrink-0">
        <div className="sticky top-24 space-y-12">
          <div className="flex items-center justify-between border-b border-black pb-4">
            <h2 className="text-xs uppercase tracking-widest font-bold">Filters</h2>
            {(search || category || maxPrice || sortOption) && (
              <button onClick={clearFilters} className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-black flex items-center gap-1 cursor-pointer">
                <X size={12} /> Clear
              </button>
            )}
          </div>

          <div className="space-y-8">
            <div className="relative">
              <input
                type="text"
                placeholder="SEARCH..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field text-xs uppercase tracking-widest"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest font-bold block">Sort By</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="input-field appearance-none cursor-pointer text-xs uppercase tracking-widest pb-1"
              >
                <option value="">RECOMMENDED</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
                <option value="rating-desc">HIGHEST RATED</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest font-bold block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field appearance-none cursor-pointer text-xs uppercase tracking-widest pb-1"
              >
                <option value="">ALL</option>
                {uniqueCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest font-bold flex justify-between">
                <span>Max Price</span>
                <span>${maxPrice || 'ANY'}</span>
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={maxPrice || 1000}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-black cursor-pointer h-1 bg-gray-200 rounded-none appearance-none"
              />
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-grow">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-3xl lg:text-4xl font-light uppercase tracking-[0.2em] mb-2">Collection</h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </header>

        {filteredProducts.length === 0 ? (
          <div className="py-24 flex flex-col items-center text-center text-gray-400">
            <p className="text-sm uppercase tracking-widest mb-6 text-black">No items match your criteria</p>
            <button onClick={clearFilters} className="btn btn-primary">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
