import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AvatarProvider } from './components/Profile/AvatarContext.jsx';
import { CartProvider } from '../src/components/E-Pharmacy/Cart/CartContext.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AvatarProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AvatarProvider>
  </React.StrictMode>
);
