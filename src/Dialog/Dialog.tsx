import React from "react";

import './Dialog.scss'

export interface IDialogComponentProps {
    onClose(): void;
}

export type DialogComponentType<P> = React.ComponentType<IDialogComponentProps & P>;

interface IProps {
    title?: string;

    confirmButton: string;

    isValid?: boolean;

    onSubmit?(): void;
}

const Dialog: React.FC<IProps> = props => {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit?.();
    };

    return (
        <form className="Dialog shadow p-3"
              onSubmit={onSubmit}>
            <h6 className="Title">{props.title}</h6>
            {props.children}
            <div className="d-flex flex-row mt-3">
                <button type="submit" className="ms-auto"
                        disabled={!props.isValid}>
                    {props.confirmButton}
                </button>
            </div>
        </form>
    );
};

export default Dialog;

