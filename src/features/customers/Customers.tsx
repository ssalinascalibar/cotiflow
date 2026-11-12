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
import CustomersContext, { type Customer } from "../../context/CustomersContext";
import CreateModalButton from "../../shared/components/CreateModalButton";
import CustomerFormModal from "./components/CustomerFormModal";

export default function Customers() {
  const context = useContext(CustomersContext);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  if (context === null) {
    throw new Error("Customers debe estar dentro de CustomersProvider");
  }

  const { customers, createCustomer, updateCustomer, deleteCustomer } = context;

  const handleCloseCustomerModal = () => {
    setIsCustomerModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleSaveCustomer = (name: string, email: string) => {
    if (selectedCustomer === null) {
      createCustomer(name, email);
    } else {
      updateCustomer(selectedCustomer.id, name, email);
    }

    handleCloseCustomerModal();
  };

  return (
    <Box sx={{ pb: "calc(88px + env(safe-area-inset-bottom, 0px))" }}>
      <TableContainer component={Paper} variant="outlined">
        <Table
          aria-label="Clientes"
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
              <TableCell scope="col" sx={{ width: "30%" }}>
                Nombre
              </TableCell>
              <TableCell scope="col">
                RUT
              </TableCell>
              <TableCell scope="col">
                Correo electrónico
              </TableCell>
              <TableCell
                scope="col"
                sx={{ width: { xs: 104, sm: 120, md: 136 } }}
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell component="th" scope="row">
                  {customer.name}
                </TableCell>
                <TableCell>{customer.rut}</TableCell>
                <TableCell>{customer.email}</TableCell>
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
                      aria-label={`Editar a ${customer.name}`}
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setIsCustomerModalOpen(true);
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
                      aria-label={`Eliminar a ${customer.name}`}
                      onClick={() => deleteCustomer(customer.id)}
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
        label="Crear Cliente"
        onClick={() => {
          setSelectedCustomer(null);
          setIsCustomerModalOpen(true);
        }}
      />

      {isCustomerModalOpen && (
        <CustomerFormModal
          key={selectedCustomer?.id ?? "create"}
          open={isCustomerModalOpen}
          customer={selectedCustomer}
          onClose={handleCloseCustomerModal}
          onSave={handleSaveCustomer}
        />
      )}
    </Box>
  );
}
