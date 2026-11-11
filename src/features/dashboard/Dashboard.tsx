import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import customersFixture from '../../data/customers.json';
import productsFixture from '../../data/products.json';

export default function Dashboard() {
  const [counts] = useState(() => ({
    customers: customersFixture.length,
    products: productsFixture.length,
    quotations: 0,
  }));

  const counters = [
    { label: 'Clientes', value: counts.customers },
    { label: 'Productos', value: counts.products },
    { label: 'Cotizaciones', value: counts.quotations },
  ];

  return (
    <Box component="section" aria-labelledby="dashboard-title" sx={{ maxWidth: 1200 }}>
      <Box component="header" sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography
          id="dashboard-title"
          component="h1"
          variant="h4"
          sx={{ fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' }, fontWeight: 600 }}
        >
          Dashboard
        </Typography>
        <Typography component="p" color="text.secondary" sx={{ mt: 1 }}>
          Resumen general
        </Typography>
      </Box>
      <Box
        component="dl"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
          gap: { xs: 2, md: 3 },
          m: 0,
        }}
      >
        {counters.map(({ label, value }) => (
          <Card
            key={label}
            variant="outlined"
            sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, borderTop: 3, borderTopColor: 'primary.main' }}
          >
            <Typography component="dt" variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              {label}
            </Typography>
            <Typography
              component="dd"
              variant="h3"
              sx={{ mt: 2, ml: 0, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}
            >
              {value}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
