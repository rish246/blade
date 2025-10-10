import { CSSProperties } from "react";
import { baseTheme } from "../theme/tokens";
import * as Icons from "./generated";

export type IconName = keyof typeof Icons;

export type IconProps = React.SVGProps<SVGSVGElement> & {
    name: IconName;
    size?: number;
    color?: string;
    className?: string;
    "aria-label"?: string;
    "aria-hidden"?: boolean;
    style?: CSSProperties;
};

const Icon = ({
    name,
    size = 24,
    color = baseTheme.colors.accent,
    "aria-label": ariaLabel,
    "aria-hidden": ariaHidden,
    className,
    style,
    ...props
}: IconProps) => {
    const SvgIcon = Icons[name];

    if (!SvgIcon) {
        console.warn(`⚠️ Icon not found: ${name}`);
        return null;
    }

    const isInformative = !!ariaLabel;
    const computedAriaHidden = ariaHidden ?? !isInformative;
    const stroke = style?.color || color || baseTheme.colors.accent;
    return (
        <span
            role="img"
            aria-label={isInformative ? ariaLabel : undefined}
            aria-hidden={computedAriaHidden}
            className={className}
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                ...style,
            }}
        >
            <SvgIcon
                width={size}
                height={size}
                stroke={stroke}
                focusable="false"
                {...props}
            />
        </span>
    );
};

export default Icon;
