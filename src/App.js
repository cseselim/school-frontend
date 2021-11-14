import React from "react";
import Layout from "./Layout/layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import AllRroutes from "./router/AllRroutes";
import store from './app/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Layout>
          <AllRroutes/>
        </Layout>
      </Provider> 
    </BrowserRouter>
  );
}

export default App;
