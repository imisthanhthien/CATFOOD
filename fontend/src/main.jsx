import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Store } from './GioHang/store.jsx'; 
import { Provider } from 'react-redux';
import { UserProvider } from './hooks/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <UserProvider>
        <App/>
      </UserProvider>
    </Provider>
  </StrictMode>,
);
