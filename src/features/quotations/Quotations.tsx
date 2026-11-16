import { useContext } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import QuotationsContext from "../../context/QuotationsContext";

export default function Quotations() {
  const context = useContext(QuotationsContext);

  if (context === null) {
    throw new Error("Quotations debe estar dentro de QuotationsProvider");
  }

  const { quotations } = context;

  return (
    <Box component="section" aria-labelledby="quotations-title">
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
    </Box>
  );
}
