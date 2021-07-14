import React from 'react';

import './Input.scss'

export enum ErrorState {
    EmptyField,
    NegativeOrZero,
}

function getErrorMsg(error: ErrorState | undefined) {
    switch (error) {
        case ErrorState.EmptyField:
            return 'No value has been specified';
        case ErrorState.NegativeOrZero:
            return 'Cannot be zero or less';
    }
}

interface IProps {
    error?: ErrorState;
    value: number;

    id?: string;
    label?: string;

    onChange(value: number, error: ErrorState | undefined): void;

    autoFocus?: boolean;
}

const IntegerInput: React.FC<IProps> = props => {
    const {value, error} = props;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let error: ErrorState | undefined;
        let value = +event.target.value;
        if (value === 0) {
            error = ErrorState.NegativeOrZero;
        }

        props.onChange(value, error);
    };
    const isValid = error === undefined;
    const errorMsg = getErrorMsg(error);
    const label = props.label ? (
        <label htmlFor={props.id}
               className="Label">
            {props.label}
        </label>
    ) : undefined;

    return (
        <div>
            {label}
            <input type="number"
                   autoFocus={props.autoFocus}
                   value={value}
                   className={isValid ? '' : 'invalid'}
                   id={props.id}
                   step={1}
                   min={1}
                   onChange={onChange}/>
            <p className="mb-0 invalid-feedback"
               style={{display: errorMsg ? 'block' : 'none'}}>
                {errorMsg}
            </p>
        </div>
    );
};

export default IntegerInput;
