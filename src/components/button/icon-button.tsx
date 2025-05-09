import { FC, ReactElement } from "react";

type IconButtonProps = {
    children: ReactElement;
    onClick: () => void;
    title: string;
}

export const IconButton: FC<IconButtonProps> = ({ children, title, onClick }) => {
    // TODO: Add <button> tailwind styling
    return (
        <button type="button" onClick={onClick} title={title} aria-label={title}
         className="">{children}</button>
    )
}