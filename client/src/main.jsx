import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';
import { ProductProvider } from './context/ProductContext.jsx';
import { UserProvider } from './context/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <ProductProvider>
    <App />
    </ProductProvider>
    </UserProvider>
    <Toaster/>
  </StrictMode>,
)
