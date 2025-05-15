import { FC, ReactElement } from "react";

type IconButtonProps = {
    children: ReactElement;
    onClick: () => void;
    title: string;
};

export const IconButton: FC<IconButtonProps> = (
    { children, title, onClick },
) => {
    return (
        <button
            type="button"
            onClick={onClick}
            title={title}
            aria-label={title}
            className={`btn btn-sm w-10 h-10 inline-flex items-center justify-center bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white border border-gray-500 hover:border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition duration-200 ease-in-out shadow-sm hover:shadow-md`}
        >
            {children}
        </button>
    );
};
