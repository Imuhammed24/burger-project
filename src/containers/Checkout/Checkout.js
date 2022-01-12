import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component{
    state = {
        ingredients: {},
        totalPrice: 0,
    }

    componentDidMount() {
        let ingredients = {};
        let totalPrice = 0;

        let queryParams = new URLSearchParams(this.props.location.search);
        for (let param of queryParams.entries()){
            if (param[0] === 'totalPrice'){
                totalPrice = +param[1]
            }else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: totalPrice
        })
        }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}
                    checkoutContinueClicked={this.checkoutContinuedHandler}
                    checkoutCancelClicked={this.checkoutCancelledHandler}
                />
                <Route path="/checkout/contact-data" render={() => <ContactData
                    ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice} />} />
            </div>
        )
    }
}

export default Checkout;