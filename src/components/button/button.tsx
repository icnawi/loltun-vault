import { FC, ReactElement } from "react";

type ButtonProps = {
    children: ReactElement | string;
    onClick: () => void;
    classNames?: string; 
}

export const Button: FC<ButtonProps> = ({ children, onClick, classNames }) => {
    return (
        <button type="button" onClick={onClick} className={classNames}>{children}</button>
    )
}