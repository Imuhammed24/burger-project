import React, {Component} from "react";
import {connect} from "react-redux";
import {logout} from "../../store/actions";
import {Redirect} from "react-router-dom";

class Logout extends Component{
    componentDidMount() {
        this.props.onLogout()
    }

    render() {
        let userRedirect = null
        if (!this.props.isAuthenticated){
            userRedirect = <Redirect exact to="/" />
        }

        return userRedirect
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
