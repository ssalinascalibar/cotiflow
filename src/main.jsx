import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { CustomersProvider } from './context/CustomersContext.tsx';
import { ProductsProvider } from './context/ProductContext.tsx';
import { QuotationsProvider } from './context/QuotationsContext.tsx';
import App from './App.jsx'
import './assets/styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CustomersProvider>
        <ProductsProvider>
          <QuotationsProvider>
            <App />
          </QuotationsProvider>
        </ProductsProvider>
      </CustomersProvider>
    </BrowserRouter>
  </StrictMode>
)
