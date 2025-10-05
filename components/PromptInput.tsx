import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  disabled: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, disabled }) => {
  return (
    <div className="w-full">
      <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
        3. Describe your edit
      </label>
      <textarea
        id="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={disabled}
        placeholder={disabled ? "Upload an image first" : "e.g., add a futuristic city in the background"}
        rows={4}
        className="w-full p-3 bg-slate-900/70 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
};

export default PromptInput;