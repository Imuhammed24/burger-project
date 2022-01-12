import React from 'react';
import classes from "./BuildControl.module.css";

const BuildControl = props => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>
                {props.label}
            </div>
            {
                props.disabledStatus ?
                <button disabled className={classes.Less} onClick={() => props.removeClicked(props.type)}> Less </button>:
                <button className={classes.Less} onClick={() => props.removeClicked(props.type)}> Less </button>
            }
            <button className={classes.More}
                    onClick={() => props.addClicked(props.type)}>
                More
            </button>
        </div>
    );
}

export default BuildControl;