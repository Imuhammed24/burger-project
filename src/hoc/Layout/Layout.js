import React, {Component} from "react";
import Aux from '../Aux'
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

class Layout extends Component{
    state = {
        showSideDrawer: false,
    }

    sideDrawerToggleHandler = () =>{
        this.setState(prevState => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    showSideDrawerHandler = () =>{
        this.setState(prevState => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return(
        <Aux>
            <Toolbar
                drawerToggleClicked={this.sideDrawerToggleHandler}
                isAuth={this.props.isAuthenticated}
            />
            <SideDrawer
                show={this.state.showSideDrawer}
                clicked={this.showSideDrawerHandler}
                isAuth={this.props.isAuthenticated}
            />

            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
    );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
