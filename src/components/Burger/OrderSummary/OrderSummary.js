import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients).map(ingredient => (
        <li key={ingredient}><span style={{textTransform: 'capitalize'}}>{ingredient}:</span> {props.ingredients[ingredient]}</li>
    ));

    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
            <p> <strong>Total price:</strong> {props.totalPrice.toFixed(2)}</p>
            <Button clicked={props.continueClicked} buttonType="Success">
                Continue
            </Button>
            <Button clicked={props.cancelClicked} buttonType="Danger">
                Cancel
            </Button>
        </Aux>
    )
}

export default orderSummary;
