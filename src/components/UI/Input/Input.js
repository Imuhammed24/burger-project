import React from "react";
import classes from "./Input.module.css";

const input = props => {
    let inputElement = null
    let inputClasses = [classes.InputElement]

    if (!props.valid && props.shouldvalidate){
        inputClasses.push(classes.Invalid)
    }

    switch (props.elementtype) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')}
                                  value={props.value}
                                  onChange={props.changed}
                                  {...props.elementconfig}/>;
            break;
        case ('textarea'):
            inputElement = <input className={inputClasses.join(' ')}
                                  value={props.value}
                                  onChange={props.changed}
                                  {...props.elementconfig} />;
            break;
        case ('select'):
            inputElement = <select className={inputClasses.join(' ')}
                                   value={props.value}
                                   onChange={props.changed}>
                {props.elementconfig.options.map(option => (
                    <option key={option.value}>{option.displayValue}</option>
                ))}
            </select>;
            break;
        default:
            inputElement = inputElement = <input className={inputClasses.join(' ')}
                                                 onChange={props.changed}
                                                 {...props} />;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;