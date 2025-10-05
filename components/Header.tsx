import React from 'react';
import { BananaIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <BananaIcon className="w-8 h-8 text-amber-400" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100">
            Banana Photo Editor
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;