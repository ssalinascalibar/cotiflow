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
  updateQuotation: (id: string, changes: Pick<Quotation, "customer" | "items">) => void;
  deleteQuotation: (id: string) => void;
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

  const updateQuotation = (id: string, changes: Pick<Quotation, "customer" | "items">) => {
    setQuotations((previousQuotations) =>
      previousQuotations.map((quotation) =>
        quotation.id === id
          ? { ...quotation, customer: changes.customer, items: changes.items }
          : quotation,
      ),
    );
  };

  const deleteQuotation = (id: string) => {
    setQuotations((previousQuotations) =>
      previousQuotations.filter((quotation) => quotation.id !== id),
    );
  };

  return (
    <QuotationsContext.Provider
      value={{ quotations, addQuotation, updateQuotation, deleteQuotation }}
    >
      {children}
    </QuotationsContext.Provider>
  );
}

export { QuotationsProvider };
export default QuotationsContext;
