import React from "react";
import ReactDOM from "react-dom";
import ReduxToastr from "react-redux-toastr";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import createNewStore from "./store/store";
import App from "./App";
import Loader from "./components/loader/loader";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "./index.scss";

export const store = createNewStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
    <Loader source="store" position="fixed" />
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="top-right"
      getState={state => state.toastrReducer}
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
