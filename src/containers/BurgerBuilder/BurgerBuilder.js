import React, {Component} from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import axios from 'axios';
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENTS_PRICES = {
    salad: 0.3,
    bacon: 0.7,
    meat: 1.6,
    cheese: 0.4
}

class BurgerBuilder extends Component {
    state = {
        ingredients: [],
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    }
    axios;

    componentDidUpdate(prevProps, prevState, snapshot) {
        const sum = Object.keys(this.state.ingredients).map(ingredientKey => {
            return this.state.ingredients[ingredientKey]
        }).reduce(
            (sum, el) => {
                return sum + el;
            }, 0);
        let orderIsEmpty = sum !== 0
        if (!this.state.purchasable === orderIsEmpty) {
            this.setState({purchasable: orderIsEmpty});
        }
    }

    componentDidMount() {
        axios.get('/ingredients.json').then(response => {
            if (response.data) {
                this.setState({
                    ingredients: response.data,
                    pulledIngredients: true,
                })
            }
        }).catch(error => {
            this.setState({
                pulledIngredientsError: true,
            })
            console.log(error)
        })
    }

    addIngredientHandler = (type) => {
        this.setState(prevState => {
                // update ingredients
                let ingredients = {...prevState.ingredients};
                ingredients[type] += 1;

                // update total price
                let totalPrice = prevState.totalPrice;
                let priceToAdd = INGREDIENTS_PRICES[type];
                let newTotalPrice = totalPrice + priceToAdd;

                // update state
                return {
                    ingredients: ingredients,
                    totalPrice: newTotalPrice
                }
            }
        )
    }

    removeIngredientHandler = (type) => {
        this.setState(prevState => {
                // update ingredients
                let ingredients = {...prevState.ingredients};
                ingredients[type] -= 1;

                // update total price
                let totalPrice = prevState.totalPrice;
                let priceToRemove = INGREDIENTS_PRICES[type];
                let newTotalPrice = totalPrice - priceToRemove;

                // update state
                return {
                    ingredients: ingredients,
                    totalPrice: newTotalPrice
                }
            }
        )
    }

    purchaseHandler = () => {
        this.setState(prevState => {
            return {purchasing: true}
        })
    }

    purchaseCancelHandler = () => {
        this.setState(prevState => {
            return {purchasing: false}
        })
    }

    purchaseContinueHandler = () => {
        const queryParams = []
        for (let ig in this.state.ingredients){
            queryParams.push(encodeURIComponent(ig) + '=' + encodeURIComponent(this.state.ingredients[ig]));
        }
        queryParams.push(encodeURIComponent('totalPrice') + '=' + encodeURIComponent(this.state.totalPrice))
        const queryString = queryParams.join('&')

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })

    }

    render() {
        const disabledStatus = {
            ...this.state.ingredients
        };

        for (let key in this.state.ingredients) {
            disabledStatus[key] = disabledStatus[key] < 1;
        }

        return (
            <Aux>
                <Backdrop show={this.state.purchasing} clicked={this.purchaseCancelHandler}/>
                <Modal show={this.state.purchasing}>
                    <OrderSummary continueClicked={this.purchaseContinueHandler}
                                  cancelClicked={this.purchaseCancelHandler}
                                  totalPrice={this.state.totalPrice}
                                  ingredients={this.state.ingredients}/>
                </Modal>
                {this.state.pulledIngredientsError ?
                    <p>Something went wrong.</p> :

                    !this.state.pulledIngredients ?
                        <Spinner/> :

                        <Burger ingredients={this.state.ingredients}/>}

                {
                    this.state.pulledIngredientsError ?
                        <p>Something went wrong.</p> :

                        !this.state.pulledIngredients ?
                            <Spinner/> :

                            <BuildControls
                                ingredients={this.state.ingredients}
                                disabledStatus={disabledStatus}
                                addIngredientHandler={this.addIngredientHandler}
                                removeIngredientHandler={this.removeIngredientHandler}
                                purchasableStatus={this.state.purchasable}
                                totalPrice={this.state.totalPrice}
                                checkoutClicked={this.purchaseHandler}/>
                }
            </Aux>
        );
    }
}

export default BurgerBuilder