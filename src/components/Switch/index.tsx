import "./index.scss";
import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import type { HTMLAttributes, ForwardedRef } from "react";

interface SwitchProps extends HTMLAttributes<HTMLButtonElement> {
    checked?: boolean,
    onSwitchChange?: (value: boolean) => void
}

export type SwitchMethods = { toggle: () => void };

function Switch(
    { checked, className, onSwitchChange, ...props }: SwitchProps,
    ref: ForwardedRef<SwitchMethods>
) {
    const [isChecked, setIsChecked] = useState<boolean>(checked || false);

    useImperativeHandle(ref, () => {
        return {
            toggle() {
                handleSwitchToggle();
            }
        }
    }, [isChecked]);

    useEffect(() => {
        if (!onSwitchChange) return;
        onSwitchChange(isChecked);
    }, [isChecked]);

    function handleSwitchToggle() {
        setIsChecked(currentChecked => !currentChecked);
    }

    return (
        <button 
            type="button"
            className={`switch ${className ? className : ""}`}
            role="switch"
            aria-checked={isChecked}
            onClick={handleSwitchToggle}
            { ...props }
        ></button>
    );
}

export default forwardRef(Switch);