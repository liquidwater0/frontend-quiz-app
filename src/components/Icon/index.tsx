import "./index.scss";
import type { ReactNode, HTMLAttributes } from "react";

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
    iconStyle?: string,
    icon: ReactNode
}

export default function Icon({ iconStyle, icon, className, ...props }: IconProps) {
    return (
        <span 
            className={`icon ${className ? className : ""} ${iconStyle ? iconStyle : ""}`}
            { ...props }
        >
            { icon }
        </span>
    );
}