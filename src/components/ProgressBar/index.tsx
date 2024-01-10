import "./index.scss";
import { useEffect, useRef } from "react";
import type { HTMLAttributes } from "react";

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
    value?: number
}

export default function ProgressBar({ value = 0, className, ...props }: ProgressBarProps) {
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let percentage = value;

        if (value < 0) percentage = 0;
        if (value > 100) percentage = 100;

        progressRef.current?.style.setProperty("--width", percentage.toFixed().toString());
    }, [value]);

    return (
        <div 
            className={`progress-bar-container ${className ? className : ""}`}
            { ...props }
        >
            <div 
                className="progress-bar"
                ref={progressRef}
            />
        </div>
    );
}