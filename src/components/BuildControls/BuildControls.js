import React from 'react';
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const BuildControls = props => {

    const toTitleCase = (word) =>{
        return word.split(" ").map(([firstChar, ...rest]) => firstChar.toUpperCase() + rest.join("").toLowerCase()).join(" ")
    }

    const controls = Object.keys(props.ingredients).map(key => {
        return {label: toTitleCase(key), type: key}
    })


    const transformedControls = controls.map(ingredientObject => {
        return <BuildControl
                disabledStatus={props.disabledStatus[ingredientObject.type]}
                key={ingredientObject.label}
                type={ingredientObject.type}
                label={ingredientObject.label}
                addClicked = {props.addIngredientHandler}
                removeClicked = {props.removeIngredientHandler} />
    })
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: {props.totalPrice.toFixed(2)}</p>
            {transformedControls}
            {props.purchasableStatus ?
                <button onClick={props.checkoutClicked} className={classes.OrderButton}>{props.isAuthenticated ? 'Checkout' : 'SIGN IN'}</button> :
                <button disabled onClick={props.checkoutClicked} className={classes.OrderButton}>{props.isAuthenticated ? 'Checkout' : 'SIGN IN'}</button>
            }
        </div>
    );
}

export default BuildControls;