import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Container, Typography, CssBaseline } from '@mui/material';

import AppTheme from './theme/AppTheme';
import HomePage from "./pages/Home";
import NavBar from "./components/NavBar";

type Thread = {
  title: string;
  author: string;
  upvote: number;
  downvote: number;
  postType: string;
  body: string;

}
const threads: Thread[] = [
  {
    title:"Sigma", 
    author:"Sigma",
    upvote:0,
    downvote:0,
    postType:"text", 
    body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }
];


export default function App(){

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <NavBar />
      <Container>
        <HomePage />
      </Container>
    </AppTheme>
  );
}