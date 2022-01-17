import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Redirect, Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let checkout = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        totalPrice={this.props.totalPrice}
                        checkoutContinueClicked={this.checkoutContinuedHandler}
                        checkoutCancelClicked={this.checkoutCancelledHandler}
                    />
                    <Route path="/checkout/contact-data" render={() => <ContactData
                        ingredients={this.props.ingredients}
                        totalPrice={this.props.totalPrice}/>}/>
                </div>
            )

        if (this.props.totalPrice === 4) {
            checkout = <Redirect to="/"  exact/>
        }
        return checkout
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
    }
}

export default connect(mapStateToProps)(Checkout);