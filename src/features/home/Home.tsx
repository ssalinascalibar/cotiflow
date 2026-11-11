import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <Container
      component="section"
      maxWidth="lg"
      sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 1, sm: 3, md: 4 } }}
    >
      <Typography
        component="h1"
        variant="h4"
        sx={{ mb: { xs: 2, sm: 3, md: 4 }, fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' } }}
      >
        Cotiflow
      </Typography>
    </Container>
  );
}
