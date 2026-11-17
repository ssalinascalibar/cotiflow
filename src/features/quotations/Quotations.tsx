import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { MdEdit, MdDeleteOutline, MdPictureAsPdf } from "../../assets/icons";
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
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);

  if (context === null || customersContext === null || productContext === null) {
    throw new Error("Quotations requiere los proveedores de cotizaciones, clientes y productos");
  }

  const { quotations, addQuotation, updateQuotation, deleteQuotation } = context;
  const { customers } = customersContext;
  const { products } = productContext;

  const handleCloseQuotationModal = () => {
    setIsQuotationModalOpen(false);
    setSelectedQuotation(null);
  };

  const handleSaveQuotation = (draft: QuotationDraft): string | null => {
    const validationError = validateQuotationDraft(draft);
    if (validationError !== null) {
      return validationError;
    }

    const customer = selectedQuotation?.customer.id === draft.customerId
      ? selectedQuotation.customer
      : customers.find((entry) => entry.id === draft.customerId);
    if (customer === undefined) {
      return "El cliente seleccionado ya no está disponible. Selecciona otro cliente.";
    }

    const items: Quotation["items"] = [];
    for (const [index, line] of draft.items.entries()) {
      const savedItem = selectedQuotation?.items[index];
      if (savedItem !== undefined && savedItem.productId === line.productId) {
        items.push({ ...savedItem, quantity: Number(line.quantity) });
        continue;
      }

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

    const changes = {
      customer: {
        id: customer.id,
        name: customer.name,
        rut: customer.rut,
        email: customer.email,
      },
      items,
    };

    if (selectedQuotation === null) {
      addQuotation({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...changes,
      });
    } else {
      updateQuotation(selectedQuotation.id, changes);
    }
    handleCloseQuotationModal();
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
                <TableCell scope="col" sx={{ width: { xs: 148, sm: 164, md: 180 } }}>
                  Acciones
                </TableCell>
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
                  <TableCell>
                    <Stack
                      direction="row"
                      sx={{
                        "& .MuiIconButton-root": {
                          width: 44,
                          height: 44,
                          color: "grey.400",
                          "&.Mui-focusVisible": {
                            outline: "2px solid currentColor",
                            outlineOffset: -2,
                          },
                        },
                      }}
                    >
                      <IconButton
                        type="button"
                        disabled
                        aria-label={`PDF de la cotización de ${quotation.customer.name}: aún no disponible`}
                      >
                        <MdPictureAsPdf size={20} aria-hidden="true" />
                      </IconButton>
                      <IconButton
                        type="button"
                        aria-label={`Editar cotización de ${quotation.customer.name} del ${quotation.createdAt}`}
                        onClick={() => {
                          setSelectedQuotation(quotation);
                          setIsQuotationModalOpen(true);
                        }}
                        sx={{
                          "&:hover, &.Mui-focusVisible, &:active": {
                            color: "primary.main",
                          },
                        }}
                      >
                        <MdEdit size={20} aria-hidden="true" />
                      </IconButton>
                      <IconButton
                        type="button"
                        aria-label={`Eliminar cotización de ${quotation.customer.name} del ${quotation.createdAt}`}
                        onClick={() => deleteQuotation(quotation.id)}
                        sx={{
                          "&:hover, &.Mui-focusVisible, &:active": {
                            color: "error.main",
                          },
                        }}
                      >
                        <MdDeleteOutline size={20} aria-hidden="true" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <CreateModalButton
        label="Crear cotización"
        onClick={() => {
          setSelectedQuotation(null);
          setIsQuotationModalOpen(true);
        }}
      />
      {isQuotationModalOpen && (
        <QuotationFormModal
          key={selectedQuotation?.id ?? "create"}
          open={isQuotationModalOpen}
          quotation={selectedQuotation}
          onClose={handleCloseQuotationModal}
          onSave={handleSaveQuotation}
        />
      )}
    </Box>
  );
}
