import {Switch} from "react-router-dom";
import {Route} from "react-router-dom";
import Logout from "../../containers/Logout/Logout";
import Orders from "../../containers/Orders/Orders";
import Checkout from "../../containers/Checkout/Checkout";
import BurgerBuilder from "../../containers/BurgerBuilder/BurgerBuilder";
import React from "react";
import Auth from "../../containers/Auth/Auth";

const authRoutes = () => {
    return (
        <Switch>
            <Route path="/logout" component={Logout}/>
            <Route path="/auth" component={Auth}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route component={BurgerBuilder}/>
        </Switch>
    )
}

export default authRoutes;