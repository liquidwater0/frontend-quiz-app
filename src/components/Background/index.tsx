import "./index.scss";
import type { Theme } from "../../App";

import desktopPatternDark from "../../assets/images/pattern-background-desktop-dark.svg";
import desktopPatternLight from "../../assets/images/pattern-background-desktop-light.svg";
import mobilePatternDark from "../../assets/images/pattern-background-mobile-dark.svg";
import mobilePatternLight from "../../assets/images/pattern-background-mobile-light.svg";
import tabletPatternDark from "../../assets/images/pattern-background-tablet-dark.svg";
import tabletPatternLight from "../../assets/images/pattern-background-tablet-light.svg";

interface BackgroundProps {
    theme: Theme
}

export default function Background({ theme }: BackgroundProps) {
    return (
        <picture>
            <source 
                srcSet={theme === "dark" ? mobilePatternDark : mobilePatternLight}
                media="(max-width: 525px)"
            />
            <source 
                srcSet={theme === "dark" ? tabletPatternDark : tabletPatternLight}
                media="(max-width: 768px)"
            />
            <img 
                src={theme === "dark" ? desktopPatternDark : desktopPatternLight} 
                alt="app background" 
            />
        </picture>
    );
}