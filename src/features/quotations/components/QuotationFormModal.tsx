import { useContext, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CustomersContext from "../../../context/CustomersContext";
import ProductContext from "../../../context/ProductContext";
import type { Quotation } from "../../../context/QuotationsContext";
import type { QuotationDraft, QuotationLineDraft } from "../services/quotationDraft";

type QuotationFormModalProps = {
  open: boolean;
  quotation: Quotation | null;
  onClose: () => void;
  onSave: (draft: QuotationDraft) => string | null;
};

export default function QuotationFormModal({
  open,
  quotation,
  onClose,
  onSave,
}: QuotationFormModalProps) {
  const customersContext = useContext(CustomersContext);
  const productContext = useContext(ProductContext);
  const [customerId, setCustomerId] = useState(quotation?.customer.id ?? "");
  const [lines, setLines] = useState<QuotationLineDraft[]>(() =>
    quotation?.items.map((item) => ({
      productId: item.productId,
      quantity: String(item.quantity),
    })) ?? [],
  );
  const [error, setError] = useState<string | null>(null);

  if (customersContext === null || productContext === null) {
    throw new Error("QuotationFormModal requiere CustomersProvider y ProductsProvider");
  }

  const { customers } = customersContext;
  const { products } = productContext;

  const updateLine = (index: number, changes: Partial<QuotationLineDraft>) => {
    setLines((previousLines) =>
      previousLines.map((line, lineIndex) =>
        lineIndex === index ? { ...line, ...changes } : line,
      ),
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="quotation-form-title"
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: { m: 2, width: "calc(100% - 32px)" },
        },
      }}
    >
      <DialogTitle id="quotation-form-title">
        {quotation === null ? "Crear cotización" : "Editar cotización"}
      </DialogTitle>
      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          setError(onSave({ customerId, items: lines }));
        }}
      >
        <DialogContent>
          <Stack spacing={2}>
            {error !== null && <Alert severity="error">{error}</Alert>}
            <TextField
              id="quotation-customer"
              name="customerId"
              select
              label="Cliente"
              value={customerId}
              onChange={(event) => setCustomerId(event.target.value)}
              autoFocus
              required
              fullWidth
              disabled={customers.length === 0}
              helperText={customers.length === 0 ? "No hay clientes disponibles." : undefined}
            >
              <MenuItem value="">Selecciona un cliente</MenuItem>
              {quotation !== null && customerId === quotation.customer.id &&
                !customers.some((customer) => customer.id === quotation.customer.id) && (
                  <MenuItem value={quotation.customer.id} disabled>
                    {quotation.customer.name} — Ya no está en el catálogo
                  </MenuItem>
                )}
              {customers.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.id === quotation?.customer.id ? quotation.customer.name : customer.name}
                </MenuItem>
              ))}
            </TextField>
            {lines.map((line, index) => (
              <Box
                component="fieldset"
                key={index}
                sx={{ border: 1, borderColor: "divider", borderRadius: 1, p: 2, minWidth: 0 }}
              >
                <Typography component="legend" variant="body2" sx={{ px: 1 }}>
                  Línea {index + 1}
                </Typography>
                <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
                  <TextField
                    id={`quotation-product-${index}`}
                    name={`productId-${index}`}
                    select
                    required
                    label="Producto"
                    value={line.productId}
                    onChange={(event) => updateLine(index, { productId: event.target.value })}
                    fullWidth
                  >
                    <MenuItem value="">Selecciona un producto</MenuItem>
                    {quotation?.items[index] !== undefined &&
                      line.productId === quotation.items[index].productId &&
                      !products.some((product) => product.id === quotation.items[index].productId) && (
                        <MenuItem value={quotation.items[index].productId} disabled>
                          {quotation.items[index].productName} — Ya no está en el catálogo
                        </MenuItem>
                      )}
                    {products.map((product) => (
                      <MenuItem key={product.id} value={product.id}>
                        {product.id === quotation?.items[index]?.productId
                          ? quotation.items[index].productName
                          : product.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id={`quotation-quantity-${index}`}
                    name={`quantity-${index}`}
                    label="Cantidad"
                    type="number"
                    required
                    value={line.quantity}
                    onChange={(event) => updateLine(index, { quantity: event.target.value })}
                    slotProps={{ htmlInput: { min: 1, step: 1 } }}
                    fullWidth
                  />
                </Stack>
              </Box>
            ))}
            {products.length === 0 && (
              <Typography component="p" color="text.secondary">
                No hay productos disponibles.
              </Typography>
            )}
            <Button
              type="button"
              variant="outlined"
              disabled={products.length === 0}
              onClick={() => setLines((previousLines) => [
                ...previousLines,
                { productId: "", quantity: "" },
              ])}
              sx={{ minHeight: 44, alignSelf: "flex-start" }}
            >
              Agregar línea
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button type="button" onClick={onClose} sx={{ minHeight: 44 }}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" sx={{ minHeight: 44 }}>
            {quotation === null ? "Guardar" : "Guardar cambios"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
