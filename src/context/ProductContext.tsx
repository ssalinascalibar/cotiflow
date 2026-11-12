import { createContext, useState, type ReactNode } from "react";
import productsFixture from "../data/products.json";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

type ProductContextValue = {
  products: Product[];
  createProduct: (name: string, description: string) => void;
  updateProduct: (id: string, name: string, description: string) => void;
  deleteProduct: (id: string) => void;
};

const ProductContext = createContext<ProductContextValue | null>(null);

function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(productsFixture);

  const createProduct = (name: string, description: string) => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name,
      description,
      price: 0,
    };

    setProducts((previousProducts) => [
      ...previousProducts,
      newProduct,
    ]);
  };

  const updateProduct = (id: string, name: string, description: string) => {
    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        product.id === id ? { ...product, name, description } : product,
      ),
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((previousProducts) =>
      previousProducts.filter((product) => product.id !== id),
    );
  };

  return (
    <ProductContext.Provider
      value={{ products, createProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export { ProductsProvider };
export default ProductContext;
