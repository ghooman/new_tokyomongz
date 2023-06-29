import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Provider } from "react-redux";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThirdwebProvider activeChain="mumbai">
        {/* <ThirdwebProvider activeChain="goerli"> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThirdwebProvider>
    </Provider>
  </React.StrictMode>
);
