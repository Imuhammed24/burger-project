import {Switch} from "react-router-dom";
import {Route} from "react-router-dom";
import Auth from "../../containers/Auth/Auth";
import BurgerBuilder from "../../containers/BurgerBuilder/BurgerBuilder";
import React from "react";
import Logout from "../../containers/Logout/Logout";

const anonymousRoutes = () => {
    return (
        <Switch>
            <Route path="/logout" component={Logout}/>
            <Route path="/auth" component={Auth}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route component={BurgerBuilder}/>
        </Switch>
    )
}

export default anonymousRoutes;
