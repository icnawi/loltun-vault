import { FC, ReactElement } from "react";

type ButtonProps = {
    children: ReactElement | string;
    onClick: () => void;
    value?: string; 
}

const Button: FC<ButtonProps> = ({ children, onClick, value }) => {
    return (
        <button type="button" onClick={onClick} value={value} className="">{children}</button>
    )
}
export default Button;