import React from "react";
import reactDom from "react-dom";
import Layout from "./Layout/layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route,Switch } from "react-router-dom";
import AllRroutes from "./router/AllRroutes";
import Home from "./Components/Home";
function App() {
  return (
    <BrowserRouter>
    <Layout>
      <AllRroutes/>
    </Layout>
    </BrowserRouter>
  );
}

export default App;
