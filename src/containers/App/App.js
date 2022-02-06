import React, {Component} from "react";
import Layout from "../../hoc/Layout/Layout";
import {connect} from "react-redux";
import AuthRoutes from "../../components/Routes/AuthRoutes";
import AnonymousRoutes from "../../components/Routes/AnonymousRoutes";
import {checkAuthState} from "../../store/actions/auth";


class App extends Component {
    componentDidMount() {
        this.props.onCheckAuthState()
    }

    render() {
        let routes = this.props.isAuthenticated ? <AuthRoutes /> : <AnonymousRoutes />
        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthState: () => dispatch(checkAuthState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
