interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    form?: string;
    value?: string;
    autoFocus?: boolean;
}
