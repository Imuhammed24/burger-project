import React from "react";
import Layout from "../../hoc/Layout/Layout";
import BurgerBuilder from "../BurgerBuilder/BurgerBuilder";
import {Switch} from "react-router-dom";
import {Route} from "react-router-dom";
import Checkout from "../Checkout/Checkout";
import Orders from "../Orders/Orders";

function App() {
  return (
      <Layout>
          <Switch>
              <Route path="/orders" component={Orders} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/" exact component={BurgerBuilder} />
          </Switch>
      </Layout>
  );
}

export default App;
