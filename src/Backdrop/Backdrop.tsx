import React from 'react';

import './Backdrop.scss';

interface IProps {
    isEnabled?: boolean;

    onClick?(): void;
}

const Backdrop: React.FC<IProps> = props => {
    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        props.onClick?.();
    };
    return (
        <div style={{display: props.isEnabled !== false ? 'block' : 'none'}}
             className="Backdrop position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center"
             onClick={onClick}>
            <div className="Content"
                 onClick={e => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
};

export default Backdrop;
