import { FC, ReactElement, ReactNode, useState } from "react";
import { GameplayStatus } from "../../constants";

type FlexRowProps = {
    children: ReactNode | ReactElement | ReactElement[];
    className?: string;
};

export const FlexRow: FC<FlexRowProps> = ({ children, className="" }) => (
    <div className={`flex flex-row justify-center ${className}`}>
        {children}
    </div>
);

export const ControlPanel: FC = () => {
    const [status, setStatus] = useState(GameplayStatus.IDLE);

    // --- Event Handlers ---
    const handleStart = () => {
        setStatus(GameplayStatus.RUNNING);
    };

    const handlePause = () => {
        setStatus(GameplayStatus.PAUSE);
    };

    const handleResume = () => {
        setStatus(GameplayStatus.RUNNING);
    };

    const handleReset = () => {
        setStatus(GameplayStatus.IDLE);
    };

    // --- Text and Button Configuration based on State ---
    let displayText = "";
    let primaryButton = null;
    let secondaryButton = null;

    // Common button classes for consistent styling
    const baseButtonClasses =
        "px-6 py-2 rounded-md font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors duration-150 flex items-center justify-center";
    const primaryButtonColors =
        "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400";
    const secondaryButtonColors =
        "bg-gray-300 hover:bg-gray-400 text-gray-800 focus:ring-gray-400";
    const warningButtonColors =
        "bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-400";
    const dangerButtonColors =
        "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400";

    switch (status) {
        case "idle":
            displayText = "Ready. Click Start to begin the process.";
            primaryButton = (
                <button
                    onClick={handleStart}
                    className={`${baseButtonClasses} ${primaryButtonColors}`}
                >
                    Start
                </button>
            );
            break;
        case "running":
            displayText = "Process is currently running...";
            primaryButton = (
                <button
                    onClick={handlePause}
                    className={`${baseButtonClasses} ${warningButtonColors}`}
                >
                    Pause
                </button>
            );
            break;
        case "pause":
            displayText = "Process paused. Resume or Reset.";
            primaryButton = (
                <button
                    onClick={handleResume}
                    className={`${baseButtonClasses} ${primaryButtonColors}`}
                >
                    Resume
                </button>
            );
            secondaryButton = (
                <button
                    onClick={handleReset}
                    className={`${baseButtonClasses} ${dangerButtonColors}`}
                >
                    Reset
                </button>
            );
            break;
        default:
            displayText = "Unknown state.";
            // Optionally, provide a way to reset from an unknown state
            primaryButton = (
                <button
                    onClick={handleReset}
                    className={`${baseButtonClasses} ${secondaryButtonColors}`}
                >
                    Reset
                </button>
            );
            break;
    }

    return (
        <FlexRow>
            <div className="p-6 bg-white rounded-lg text-center">
                {/* Display Area for Text */}
                <p className="text-lg text-gray-700 mb-6 min-h-[3em] flex items-center justify-center">
                    {displayText}
                </p>

                {/* Button Area */}
                <FlexRow className="space-x-4">
                    {primaryButton}
                    {secondaryButton}
                </FlexRow>
            </div>
        </FlexRow>
    );
};
