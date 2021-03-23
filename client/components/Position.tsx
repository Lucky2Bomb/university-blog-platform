import React from 'react';
import config from '../config';

interface PositionProps {
    positionName: string;
    className: any;
}

const Position: React.FC<PositionProps> = ({ positionName, className = null }) => {
    switch (positionName) {
        case "студент":
            return (
                <span {...className} style={{ color: config.colors.green000 }}>[{positionName}]</span>
            )

        case "администратор":
            return (
                <span {...className} style={{ color: config.colors.deepRed000 }}>[{positionName}]</span>
            )

        default:
            return (
                <span {...className} style={{ color: config.colors.aqua300 }}>[{positionName}]</span>
            )
    }

}

export default Position;
