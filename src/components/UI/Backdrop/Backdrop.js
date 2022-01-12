import React from 'react'
import classes from "./Backdrop.module.css";
import Aux from "../../../hoc/Aux";

const backdrop = props => (
    <Aux>
        { props.show ? <div onClick={props.clicked} className={classes.Backdrop}></div> : null }
    </Aux>
)

export default backdrop;