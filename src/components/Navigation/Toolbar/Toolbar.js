import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../BurgerLogo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => {
    return(
        <div className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <Logo />
            <nav className={classes.DesktopOnly}>
                <NavigationItems
                    isAuthenticated={props.isAuth}
                />
            </nav>
        </div>
    )
}

export default toolbar;