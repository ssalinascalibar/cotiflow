import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import CustomersContext from "../../context/CustomersContext";
import ProductContext from "../../context/ProductContext";
import QuotationsContext, { type Quotation } from "../../context/QuotationsContext";
import CreateModalButton from "../../shared/components/CreateModalButton";
import QuotationFormModal from "./components/QuotationFormModal";
import { validateQuotationDraft, type QuotationDraft } from "./services/quotationDraft";

export default function Quotations() {
  const context = useContext(QuotationsContext);
  const customersContext = useContext(CustomersContext);
  const productContext = useContext(ProductContext);
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);

  if (context === null || customersContext === null || productContext === null) {
    throw new Error("Quotations requiere los proveedores de cotizaciones, clientes y productos");
  }

  const { quotations, addQuotation } = context;
  const { customers } = customersContext;
  const { products } = productContext;

  const handleCreateQuotation = (draft: QuotationDraft): string | null => {
    const validationError = validateQuotationDraft(draft);
    if (validationError !== null) {
      return validationError;
    }

    const customer = customers.find((entry) => entry.id === draft.customerId);
    if (customer === undefined) {
      return "El cliente seleccionado ya no está disponible. Selecciona otro cliente.";
    }

    const items: Quotation["items"] = [];
    for (const [index, line] of draft.items.entries()) {
      const product = products.find((entry) => entry.id === line.productId);
      if (product === undefined) {
        return `El producto de la línea ${index + 1} ya no está disponible. Selecciona otro producto.`;
      }

      items.push({
        productId: product.id,
        productName: product.name,
        quantity: Number(line.quantity),
        unitPrice: product.price,
      });
    }

    const quotation: Quotation = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      customer: {
        id: customer.id,
        name: customer.name,
        rut: customer.rut,
        email: customer.email,
      },
      items,
    };

    addQuotation(quotation);
    setIsQuotationModalOpen(false);
    return null;
  };

  return (
    <Box
      component="section"
      aria-labelledby="quotations-title"
      sx={{ pb: "calc(88px + env(safe-area-inset-bottom, 0px))" }}
    >
      <Typography
        id="quotations-title"
        component="h1"
        variant="h4"
        sx={{
          mb: { xs: 3, md: 4 },
          fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
          fontWeight: 600,
        }}
      >
        Cotizaciones
      </Typography>
      {quotations.length === 0 ? (
        <Typography component="p" color="text.secondary">
          Aún no hay cotizaciones
        </Typography>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table
            aria-labelledby="quotations-title"
            sx={{
              tableLayout: "fixed",
              "& .MuiTableCell-root": {
                p: { xs: 1, sm: 2, md: 3 },
                fontSize: { xs: "0.8125rem", sm: "0.875rem", md: "1rem" },
                overflowWrap: "anywhere",
                verticalAlign: "top",
              },
              "& .MuiTableHead-root": { bgcolor: "action.hover" },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell scope="col">Fecha de creación</TableCell>
                <TableCell scope="col">Nombre</TableCell>
                <TableCell scope="col">RUT</TableCell>
                <TableCell scope="col">Correo electrónico</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quotations.map((quotation) => (
                <TableRow key={quotation.id}>
                  <TableCell>{quotation.createdAt}</TableCell>
                  <TableCell component="th" scope="row">
                    {quotation.customer.name}
                  </TableCell>
                  <TableCell>{quotation.customer.rut}</TableCell>
                  <TableCell>{quotation.customer.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <CreateModalButton
        label="Crear cotización"
        onClick={() => setIsQuotationModalOpen(true)}
      />
      {isQuotationModalOpen && (
        <QuotationFormModal
          open={isQuotationModalOpen}
          onClose={() => setIsQuotationModalOpen(false)}
          onSave={handleCreateQuotation}
        />
      )}
    </Box>
  );
}
