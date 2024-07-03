import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ParsePage from './parserPage/ParsePage';
import './index.css';
import TablePage from './tablePage/TablePage';
import ErrorPage from './errorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ParsePage/>,
  },
  {
    path: "/table",
    element: <TablePage/>
  },
  {
    path: "/*",
    element: <ErrorPage/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router}/>
    </ChakraProvider>
  </React.StrictMode>
);
