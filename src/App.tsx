import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Container, Typography, CssBaseline } from '@mui/material';

import AppTheme from './theme/AppTheme';
import HomePage from "./pages/Home";
import NavBar from "./components/NavBar";


export default function App(){

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Container // Spacing for the NavBar
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
      <NavBar />
      <HomePage />
      </Container>
    </AppTheme>
  );
}