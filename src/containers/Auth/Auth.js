import React, {Component} from "react";
import classes from "./Auth.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";
import {Redirect, withRouter} from "react-router-dom";
import {updateObject} from "../../utils/updateObject";
import {checkValidity} from "../../utils/validateForm";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Email'
                },
                valid: false,
                validation: {
                    required: true,
                    isEmail: true,
                    minLength: 6,
                },
                touched: false,
                value: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Password'
                },
                valid: false,
                validation: {
                    required: true,
                    minLength: 6,
                },
                touched: false,
                value: ''
            }
        },
        isSignup: false,
    }

    inputChangedHandler = (event, controlName) => {
        let updatedControls = updateObject(
            {...this.state.controls},
            {
                [controlName]: updateObject(
                    {...this.state.controls[controlName]},
                    {
                        elementConfig: {...this.state.controls[controlName].elementConfig},
                        validation: {...this.state.controls[controlName].validation},
                        value: event.target.value,
                        touched: true,
                        valid: checkValidity(event.target.value, this.state.controls[controlName].validation)
                    }
                )
            })
        this.setState({controls: updatedControls})
    }

    submitFormHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup)
    }

    toggleSignup = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    render() {

        let inputControls = [];
        for (let controlName in this.state.controls) {
            inputControls.push({
                id: controlName,
                config: this.state.controls[controlName],
            });
        }
        let form = (
            <div>
                {inputControls.map(formElement => (
                    <Input
                        elementtype={formElement.config.elementType}
                        name={formElement.id}
                        key={formElement.id}
                        // label={formElement.id.toUpperCase()}
                        valid={formElement.config.valid}
                        shouldvalidate={formElement.config.touched}
                        elementconfig={formElement.config.elementConfig}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
            </div>
        )
        let buttonContent = this.state.isSignup ? 'REGISTER' : 'LOGIN'
        if (this.props.loading) {
            buttonContent = 'Loading...'
        }

        return (
            <div className={classes.Auth}>
                {this.props.isAuthenticated ? <Redirect exact to="/"/> : null}
                <form action="" method="post" onSubmit={(event) => this.submitFormHandler(event)}>
                    {form}
                    <Button
                        htmlBtnType="submit"
                        buttonType="Success"
                        btnDisabled={!!this.props.loading}>
                        {buttonContent}
                    </Button>
                </form>
                <Button
                    clicked={this.toggleSignup}
                    buttonType="Danger"
                    btnDisabled={!!this.props.loading}>
                    Switch to {this.state.isSignup ? 'Login' : 'Register'}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth))
