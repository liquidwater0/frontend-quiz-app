import "./index.scss";
import type { ReactNode, HTMLAttributes } from "react";

interface IconProps extends HTMLAttributes<HTMLDivElement> {
    iconStyle?: string,
    icon: ReactNode
}

export default function Icon({ iconStyle, icon, className, ...props }: IconProps) {
    return (
        <div 
            className={`icon ${className ? className : ""} ${iconStyle ? iconStyle : ""}`}
            { ...props }
        >
            { icon }
        </div>
    );
}