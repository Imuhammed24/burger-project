import React, {Component} from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "axios";
import {withRouter} from "react-router-dom";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component{
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Name'
                },
                valid: false,
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                },
                shouldValidate: false,
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Email'
                },
                valid: false,
                validation: {
                    required: true,
                    minLength: 3,
                },
                shouldValidate: false,
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Street'
                },
                shouldValidate: false,
                valid: false,
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                },
                value: ''
            },
            postcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Postcode'
                },
                valid: false,
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                },
                shouldValidate: false,
                value: ''
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    type: 'text',
                    options: [
                        {value: 'fast', displayValue: 'Fast'},
                        {value: 'faster', displayValue: 'Faster'},
                        {value: 'fastest', displayValue: 'Fastest'},
                    ]
                },
                valid: false,
                validation: {},
                shouldValidate: false,
                value: 'fastest'
            },
        },
        purchasing: false,
        orderFormValid: false,
        error: false
    }

    checkValidity(value, rules){
        let is_valid = true;
        if (rules==={}){
            return is_valid;
        }

        if (rules.required){
            is_valid = value.trim() !== "" && is_valid;
        } if (rules.minLength){
            is_valid = value.length >= rules.minLength && is_valid;
        } if (rules.maxLength){
            is_valid = value.length <= rules.maxLength && is_valid;
        }
        return is_valid;
    }

    orderSubmitHandler = (event) =>{
        event.preventDefault();
        this.setState({purchasing: true})

        let formData = {}
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        let orderData = {
            contactDetails: formData,
            ingredients: this.props.ingredients,
            orderTotal: this.props.totalPrice,
        }

        axios.post('/orders.json', orderData).then(response => {
            this.setState(prevState => {
                return {purchasing: false}
            })
            this.props.history.push('/')
        }).catch(error => {
            this.setState({error: true})
            console.log(error)
        })
    }

    inputChangedHandler = (event, elementIdentifier) => {
        let updatedOrderForm = {...this.state.orderForm}
        updatedOrderForm[elementIdentifier].value = event.target.value;
        updatedOrderForm[elementIdentifier].valid = this.checkValidity(updatedOrderForm[elementIdentifier].value, updatedOrderForm[elementIdentifier].validation)
        updatedOrderForm[elementIdentifier].shouldValidate = true

        let validForm = true;
        for (let formElement in updatedOrderForm){
            validForm = this.checkValidity(updatedOrderForm[formElement].value, updatedOrderForm[formElement].validation) && validForm;
        }

        this.setState({orderForm: updatedOrderForm, orderFormValid: validForm});
        console.log(validForm)
    }

    render() {
        let formElementsArray = []
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = <Spinner />
        if (this.state.error){
            form = <h3>Something went wrong</h3>
        }else if(!this.state.error && !this.state.purchasing) {
            form = (
                <form action="">
                    {formElementsArray.map(formElement => (
                        <Input elementtype={formElement.config.elementType}
                               name={formElement.id}
                               key={formElement.id}
                               label={formElement.id.toUpperCase()}
                               valid={formElement.config.valid}
                               shouldvalidate={formElement.config.shouldValidate}
                               elementconfig={formElement.config.elementConfig}
                               changed={(event)=>this.inputChangedHandler(event, formElement.id)}
                        />
                    ))}
                    <Button className={classes.Input}
                            btnDisabled={!this.state.orderFormValid}
                            buttonType="Success"
                            clicked={(event) => this.orderSubmitHandler(event)}>ORDER</Button>
                </form>
            )
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Contact Details</h4>
                {form}
            </div>
        )
    }
}

export default withRouter(ContactData);