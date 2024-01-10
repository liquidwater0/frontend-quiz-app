import type { HTMLAttributes } from "react";
import Button from "./Button";

interface OptionButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export default function OptionButton({ children, className, ...props }: OptionButtonProps) {
    return (
        <Button 
            className={`option-button shadow ${className ? className : ""}`}
            { ...props }
        >
            { children }
        </Button>
    );
}