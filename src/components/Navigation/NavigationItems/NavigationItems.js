import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "../NavigationItem/NavigationItem";

const navigationItems = props => {
    let navItems = (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">
                BurgerBuilder
            </NavigationItem>
            <NavigationItem link='/auth'>
                Register
            </NavigationItem>
        </ul>
    )
    if (props.isAuthenticated) {
        navItems = (
            <ul className={classes.NavigationItems}>
            <NavigationItem link="/">
                BurgerBuilder
            </NavigationItem>
            <NavigationItem link='/orders'>
                Orders
            </NavigationItem>
            <NavigationItem link='/logout'>
                Logout
            </NavigationItem>
        </ul>
        )
    }
    return navItems
}

export default navigationItems;