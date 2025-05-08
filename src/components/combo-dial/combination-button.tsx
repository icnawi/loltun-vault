import clsx from "clsx";
import React from "react";
import { COMBO_DIAL_COLORS, DEFAULT_DIAL_COLOR } from "../../constants";
import { DialId } from "../../types";

interface ComboDialProps {
    id: DialId;
    onClick: (id: DialId) => void;
    isHighlighted: boolean;
    isDisabled: boolean;
}

const CombintaionButton: React.FC<ComboDialProps> = ({id, onClick, isHighlighted, isDisabled}) => {
    const colorClass = isHighlighted ? COMBO_DIAL_COLORS[id] : DEFAULT_DIAL_COLOR;

    return <button
      onClick={() => onClick(id)}
      disabled={isDisabled}
      className={clsx(
        'w-24 h-24 md:w-32 md:h-32 rounded-full text-4xl font-bold text-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-opacity-75 shadow-lg m-2',
        colorClass,
        isDisabled && 'opacity-50 cursor-not-allowed',
        !isDisabled && 'transform hover:scale-105' // Hover Effect
      )}
    >
      {id}
    </button>
}

export default CombintaionButton;