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
import { MdEdit, MdDeleteOutline } from "../../assets/icons";
import ProductContext, { type Product } from "../../context/ProductContext";
import CreateModalButton from "../../shared/components/CreateModalButton";
import ProductFormModal from "./components/ProductFormModal";

export default function Products() {
  const context = useContext(ProductContext);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (context === null) {
    throw new Error("Products debe estar dentro de ProductsProvider");
  }

  const { products, createProduct, updateProduct, deleteProduct } = context;

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = (name: string, description: string) => {
    if (selectedProduct === null) {
      createProduct(name, description);
    } else {
      updateProduct(selectedProduct.id, name, description);
    }

    handleCloseProductModal();
  };

  return (
    <Box sx={{ pb: "calc(88px + env(safe-area-inset-bottom, 0px))" }}>
      <TableContainer component={Paper} variant="outlined">
        <Table
          aria-label="Productos"
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
              <TableCell scope="col" sx={{ width: "30%" }}>Nombre</TableCell>
              <TableCell scope="col">Descripción</TableCell>
              <TableCell scope="col" sx={{ width: { xs: 104, sm: 120, md: 136 } }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell component="th" scope="row">{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
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
                      aria-label={`Editar ${product.name}`}
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsProductModalOpen(true);
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
                      aria-label={`Eliminar ${product.name}`}
                      onClick={() => deleteProduct(product.id)}
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
      <CreateModalButton
        label="Crear Producto"
        onClick={() => {
          setSelectedProduct(null);
          setIsProductModalOpen(true);
        }}
      />
      {isProductModalOpen && (
        <ProductFormModal
          key={selectedProduct?.id ?? "create"}
          open={isProductModalOpen}
          product={selectedProduct}
          onClose={handleCloseProductModal}
          onSave={handleSaveProduct}
        />
      )}
    </Box>
  );
}
