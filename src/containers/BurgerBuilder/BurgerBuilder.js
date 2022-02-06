import React, {Component} from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Spinner from "../../components/UI/Spinner/Spinner";
import {connect} from "react-redux";
import * as actionTypes from '../../store/actions/';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // const sum = Object.keys(this.props.ingredients).map(ingredientKey => {
        //     return this.props.ingredients[ingredientKey]
        // }).reduce((sum, el) => {
        //     return sum + el;
        // }, 0);
        // let orderIsEmpty = sum !== 0
        // if (!this.props.purchasable === orderIsEmpty) {
        //     this.setState({purchasable: orderIsEmpty});
        // }
    }

    componentDidMount() {
        if (!this.props.isAuthenticated && !this.props.purchasable) {
            this.props.onFetchIngredients()
        }
    }

    purchaseHandler = () => {
        this.setState(prevState => {
            return {purchasing: true}
        })

        if (!this.props.isAuthenticated){
            this.props.history.replace("/auth")
        }
    }

    purchaseCancelHandler = () => {
        this.setState(prevState => {
            return {purchasing: false}
        })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')

    }

    render() {
        const disabledStatus = {
            ...this.props.ingredients
        };

        for (let key in this.props.ingredients) {
            disabledStatus[key] = disabledStatus[key] < 1;
        }

        return (
            <Aux>
                <Backdrop show={this.state.purchasing} clicked={this.purchaseCancelHandler}/>
                <Modal show={this.state.purchasing}>
                    <OrderSummary continueClicked={this.purchaseContinueHandler}
                                  cancelClicked={this.purchaseCancelHandler}
                                  totalPrice={this.props.totalPrice}
                                  ingredients={this.props.ingredients}/>
                </Modal>

                {/*  BURGER AND INGREDIENTS  */}
                {this.props.error ? <p>Something went wrong.</p> :
                    !this.props.pulledIngredients ? <Spinner/> :
                        <Burger ingredients={this.props.ingredients}/>}

                {/*  BUILD CONTROLS  */}
                {this.props.error ? <p>Something went wrong.</p> :
                    !this.props.pulledIngredients ? <Spinner/> :
                        <BuildControls
                            ingredients={this.props.ingredients}
                            disabledStatus={disabledStatus}
                            addIngredientHandler={this.props.onAddIngredient}
                            removeIngredientHandler={this.props.onRemoveIngredient}
                            isAuthenticated={this.props.isAuthenticated}
                            purchasableStatus={this.props.purchasable}
                            totalPrice={this.props.totalPrice}
                            checkoutClicked={this.purchaseHandler}/>}
            </Aux>);
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        ingredients: state.burgerBuilder.ingredients,
        error: state.burgerBuilder.error,
        purchasable: state.burgerBuilder.purchasable,
        totalPrice: state.burgerBuilder.totalPrice,
        pulledIngredients: state.burgerBuilder.pulledIngredients
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchIngredients: () => dispatch(actionTypes.fetchIngredients()),
        onAddIngredient: (ingName) => dispatch(actionTypes.addIngredients(ingName)),
        onRemoveIngredient: (ingName) => dispatch(actionTypes.removeIngredients(ingName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)
