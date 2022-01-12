import React, {Component} from "react";
import Aux from '../Aux'
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

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
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
            <SideDrawer
                show={this.state.showSideDrawer}
                clicked={this.showSideDrawerHandler} />

            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
    );
    }
}

export default Layout;