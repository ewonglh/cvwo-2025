import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import App from './App';

createRoot(document.querySelector("#root")!).render(
  
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <Routes>
          
        </Routes>
        <App />
      </BrowserRouter>
    </StyledEngineProvider>
  </StrictMode>
);
