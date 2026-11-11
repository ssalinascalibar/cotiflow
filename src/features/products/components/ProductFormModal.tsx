import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import type { Product } from "../../../context/ProductContext";

type ProductFormModalProps = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
};

export default function ProductFormModal({
  open,
  product,
  onClose,
  onSave,
}: ProductFormModalProps) {
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="product-form-title"
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: { m: 2, width: "calc(100% - 32px)" },
        },
      }}
    >
      <DialogTitle id="product-form-title">
        {product === null ? "Crear producto" : "Editar producto"}
      </DialogTitle>
      <Box
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          onSave(name, description);
        }}
      >
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              id="product-name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              label="Nombre"
              autoFocus
              fullWidth
            />
            <TextField
              id="product-description"
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              label="Descripción"
              multiline
              minRows={3}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button type="button" onClick={onClose} sx={{ minHeight: 44 }}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" sx={{ minHeight: 44 }}>
            {product === null ? "Crear producto" : "Guardar cambios"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
