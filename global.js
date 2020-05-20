import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Roboto, sans-serif;
  }

  .dashboard-container {
    background-color: ${({ theme }) => theme.body};
    
  }

  .modal-body {
  	background-color: #f5f5f5;
  }
`