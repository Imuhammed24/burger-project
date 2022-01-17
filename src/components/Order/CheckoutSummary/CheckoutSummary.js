import React from "react";
import Button from "../../UI/Button/Button";
import Burger from "../../Burger/Burger";
import classes from "./CheckoutSummary.module.css";
import {withRouter} from "react-router-dom";
import Aux from "../../../hoc/Aux";

const checkoutSummary = props => {
     return (
            <Aux>
                <div className={classes.CheckoutSummary}>
                    <h3>We hope it tastes well!!</h3>
                    <div style={{width:'90%', height:'300px', margin:'auto'}}>
                        <Burger ingredients={props.ingredients} />
                    </div>
                    <Button clicked={props.checkoutCancelClicked} buttonType="Danger">CANCEL</Button>
                    <Button clicked={props.checkoutContinueClicked} buttonType="Success">CONTINUE</Button>
                </div>
            </Aux>
        )
}

export default withRouter(checkoutSummary);