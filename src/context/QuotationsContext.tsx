import { createContext, useState, type ReactNode } from "react";
import quotationsFixture from "../data/quotations.json";

export type Quotation = {
  id: string;
  createdAt: string;
  customer: {
    id: string;
    name: string;
    rut: string;
    email: string;
  };
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
};

type QuotationsContextValue = {
  quotations: Quotation[];
  addQuotation: (quotation: Quotation) => void;
};

const QuotationsContext = createContext<QuotationsContextValue | null>(null);

function QuotationsProvider({ children }: { children: ReactNode }) {
  const [quotations, setQuotations] = useState<Quotation[]>(quotationsFixture);

  const addQuotation = (quotation: Quotation) => {
    setQuotations((previousQuotations) => [
      ...previousQuotations,
      quotation,
    ]);
  };

  return (
    <QuotationsContext.Provider value={{ quotations, addQuotation }}>
      {children}
    </QuotationsContext.Provider>
  );
}

export { QuotationsProvider };
export default QuotationsContext;
