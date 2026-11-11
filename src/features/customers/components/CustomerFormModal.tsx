import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import type { Customer } from "../../../context/CustomersContext";

type CustomerFormModalProps = {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
  onSave: (name: string, email: string) => void;
};

export default function CustomerFormModal({
  open,
  customer,
  onClose,
  onSave,
}: CustomerFormModalProps) {
  const [name, setName] = useState(customer?.name ?? "");
  const [email, setEmail] = useState(customer?.email ?? "");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="customer-form-title"
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: { m: 2, width: "calc(100% - 32px)" },
        },
      }}
    >
      <DialogTitle id="customer-form-title">
        {customer === null ? "Crear cliente" : "Editar cliente"}
      </DialogTitle>
      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          onSave(name, email);
        }}
      >
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              id="customer-name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              label="Nombre"
              autoComplete="name"
              autoFocus
              fullWidth
            />
            <TextField
              id="customer-email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              label="Correo electrónico"
              type="email"
              autoComplete="email"
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button type="button" onClick={onClose} sx={{ minHeight: 44 }}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" sx={{ minHeight: 44 }}>
            {customer === null ? "Crear cliente" : "Guardar cambios"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
