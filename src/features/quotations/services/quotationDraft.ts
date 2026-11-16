export type QuotationLineDraft = {
  productId: string;
  quantity: string;
};

export type QuotationDraft = {
  customerId: string;
  items: QuotationLineDraft[];
};

export const validateQuotationDraft = (draft: QuotationDraft): string | null => {
  if (draft.customerId === "") {
    return "Selecciona un cliente.";
  }

  if (draft.items.length === 0) {
    return "Agrega al menos una línea.";
  }

  for (const [index, item] of draft.items.entries()) {
    if (item.productId === "") {
      return `Selecciona un producto en la línea ${index + 1}.`;
    }

    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return `La cantidad de la línea ${index + 1} debe ser un entero mayor que 0.`;
    }
  }

  return null;
};
