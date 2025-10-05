import React from 'react';
import { SparklesIcon, LoaderIcon } from './Icons';

interface ButtonProps {
    onClick: () => void;
    disabled: boolean;
    isLoading: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-900 font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-amber-500/20 disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-amber-400"
    >
      {isLoading ? (
        <>
          <LoaderIcon />
          <span>Generating...</span>
        </>
      ) : (
        <>
          <SparklesIcon />
          <span>Generate Magic</span>
        </>
      )}
    </button>
  );
};

export default Button;