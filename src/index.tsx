import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import App from "./App";
import AppProvider from "./context/context";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <BrowserRouter>
    <AppProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AppProvider>
  </BrowserRouter>
);
