import CardProduct from "@/common/components/Card/CardProduct";
import TableSearch from "@/common/components/input/SearchComponent";
import TablePagination from "@/common/components/pagination/Pagination";
import { useProductContext } from "@/common/context/ProdukContext";
import { formatPrice } from "@/common/utils/formatPrice";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductScreen = () => {
  const [search, setSearch] = useState("");
  const { products, updateQuantity } = useProductContext();

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // Reset ke halaman 1 kalau search berubah
  useEffect(() => {
    setPage(1);
  }, [search]);

  // Filter berdasarkan search
  const filtered = products.filter(
    (p) => p.title.toLowerCase().includes(search.toLowerCase()) // gunakan title biar konsisten
  );

  // Hitung item yang akan ditampilkan sesuai halaman
  const startIndex = (page - 1) * itemsPerPage;
  const currentProducts = filtered.slice(startIndex, startIndex + itemsPerPage);

  const cartItems = products.filter((p) => p.quantity_payment > 0);
  const router = useRouter();

  return (
    <div className="flex w-full justify-between">
      {/* Kiri */}
      <div
        className={`flex flex-col gap-6 transition-all duration-300 ease-in-out ${
          cartItems.length > 0 ? "w-[calc(100%-400px)]" : "w-full"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">Product</h1>
          <div className="flex items-center gap-4">
            <div
              className={`${cartItems.length > 0 ? "w-[200px]" : "w-[300px]"}`}
            >
              <TableSearch
                value={search}
                onChange={setSearch}
                placeholder="Search"
              />
            </div>
            <button
              onClick={() => router.push("/product/add")}
              className={`rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-all duration-300 hover:bg-blue-700 ${
                cartItems.length > 0 ? "w-[120px]" : "w-[200px]"
              }`}
            >
              + Add New
            </button>
          </div>
        </div>

        {/* List Produk */}
        <div className="flex w-full flex-wrap items-start gap-3">
          {currentProducts.length > 0 ? (
            currentProducts.map((v) => (
              <CardProduct
                key={v.id}
                title={v.title}
                price={v.price}
                quantity={v.quantity_payment}
                onAdd={() => {
                  if (v.quantity_payment < v.quantity) {
                    updateQuantity(v.id, v.quantity);
                  }
                }}
                onRemove={() => updateQuantity(v.id, v.quantity)}
                disable={v.quantity === 0 || v.quantity_payment >= v.quantity}
              />
            ))
          ) : (
            <p className="text-gray-500">No products found</p>
          )}
        </div>

        {/* Pagination */}
        {filtered.length > itemsPerPage && (
          <TablePagination
            currentPage={page}
            onPageChange={setPage}
            totalItems={filtered.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>

      {/* Kanan - Cart */}
      {cartItems.length > 0 && (
        <div className="fixed top-0 right-0 z-50 h-screen w-[380px] overflow-y-auto rounded-md bg-white p-4 shadow-lg transition-transform duration-300">
          <h2 className="mb-4 text-lg font-semibold">Order</h2>
          <ul className="flex flex-col gap-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between text-sm"
              >
                <div className="flex items-start gap-2">
                  <Image
                    src={"https://placehold.co/150x150/000000/FFFFFF/png"}
                    width={80}
                    height={80}
                    alt={item.title}
                  />
                  <div className="flex flex-col items-start justify-between gap-2">
                    <span className="line-clamp-2 w-[140px] text-sm font-semibold">
                      {item.title}
                    </span>
                    <span className="text-xs font-medium">
                      x{item.quantity_payment}
                    </span>
                  </div>
                </div>
                <span className="text-base font-semibold">
                  {formatPrice(item.price * item.quantity_payment)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
