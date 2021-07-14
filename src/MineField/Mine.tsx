import React from "react";
import { IMine, Marker } from "../model";

import css from './Mine.module.scss'

const debuggingWithHoverEnabled = false;

export const Mine: React.FC<IMine> = props => {
    if (props.revealed) {
        if (props.isBomb) {
            return (
                <i className="bi bi-star"/>
            )
        }
        if (props.surrounding > 0) {
            return (
                <span>{props.surrounding}</span>
            )
        }
        return <span/>
    }

    switch (props.marker) {
        case Marker.FLAG:
            return (
                <i className="bi bi-flag"/>
            )
        case Marker.UNSURE:
            return (
                <span>?</span>
            )
        default:
            if (debuggingWithHoverEnabled) {
                const text = props.isBomb ? (
                    <i className="bi bi-star"/>
                ) : props.surrounding;

                return (
                    <span className={css.DebugMineText}>
                        {text}
                    </span>
                )
            }
            return <span/>
    }
}
