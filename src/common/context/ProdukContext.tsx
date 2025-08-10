import React, { createContext, useContext, useState, ReactNode } from "react";

// Tipe data untuk produk
interface ProductItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  quantity_payment: number;
}

const dataProduct: ProductItem[] = [
  {
    id: 1,
    title: "Shampoo",
    price: 20000,
    quantity: 10,
    quantity_payment: 0,
  },
  {
    id: 2,
    title: "Sabun",
    price: 30000,
    quantity: 5,
    quantity_payment: 0,
  },
  {
    id: 3,
    title: "Pasta Gigi",
    price: 20000,
    quantity: 20,
    quantity_payment: 0,
  },
  {
    id: 4,
    title: "Permen",
    price: 10000,
    quantity: 15,
    quantity_payment: 0,
  },
  {
    id: 5,
    title: "Pasta gigi",
    price: 20000,
    quantity: 8,
    quantity_payment: 0,
  },
  {
    id: 6,
    title: "Chocolate",
    price: 35000,
    quantity: 8,
    quantity_payment: 0,
  },
  {
    id: 7,
    title: "Chiki",
    price: 25000,
    quantity: 10,
    quantity_payment: 0,
  },
  {
    id: 8,
    title: "Sendal",
    price: 10000,
    quantity: 15,
    quantity_payment: 0,
  },
  {
    id: 9,
    title: "Sepatu",
    price: 20000,
    quantity: 10,
    quantity_payment: 0,
  },
  {
    id: 10,
    title: "Kaos Kaki",
    price: 30000,
    quantity: 5,
    quantity_payment: 0,
  },
  {
    id: 11,
    title: "Coca cola",
    price: 10000,
    quantity: 20,
    quantity_payment: 0,
  },
  {
    id: 12,
    title: "Fanta",
    price: 10000,
    quantity: 15,
    quantity_payment: 0,
  },
  {
    id: 13,
    title: "Sprite",
    price: 20000,
    quantity: 8,
    quantity_payment: 0,
  },
  {
    id: 14,
    title: "Aqua",
    price: 35000,
    quantity: 8,
    quantity_payment: 0,
  },
  {
    id: 15,
    title: "Mie Instan",
    price: 25000,
    quantity: 10,
    quantity_payment: 0,
  },
  {
    id: 16,
    title: "Gula",
    price: 10000,
    quantity: 15,
    quantity_payment: 0,
  },
];

// Tipe data untuk context
interface ProductContextType {
  products: ProductItem[];
  addProduct: (product: Omit<ProductItem, "id" | "quantity_payment">) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeProduct: (id: number) => void;
  clearProducts: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductItem[]>(dataProduct);

  // Tambah produk baru
  const addProduct = (
    product: Omit<ProductItem, "id" | "quantity_payment">
  ) => {
    setProducts((prev) => [
      ...prev,
      {
        id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1, // auto increment id
        quantity_payment: 0,
        ...product,
      },
    ]);
  };

  // Update quantity langsung (bisa naik/turun)
  const updateQuantity = (id: number, quantity: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(0, quantity) } : p
      )
    );
  };

  // Hapus produk dari list
  const removeProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Kosongkan semua produk
  const clearProducts = () => {
    setProducts([]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateQuantity,
        removeProduct,
        clearProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Hook untuk menggunakan context
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
