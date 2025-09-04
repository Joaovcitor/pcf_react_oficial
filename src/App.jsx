import "leaflet/dist/leaflet.css";
import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import GlobalStyle from "./styles/GlobalStyle";
import theme from "./theme";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import Header from "./components/Header";
import Routes from "./routes";
import history from "./services/history";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router history={history}>
            <Header />
            <Routes />
            <GlobalStyle />
            <ToastContainer autoClose={2000} className="toast-container" />
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
