import React from "react";
import { Terminal } from "lucide-react";

interface LogoProps {
  size?: "normal" | "large";
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ size = "normal", onClick }) => {
  const isLarge = size === "large";
  
  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-3 select-none cursor-default"
    >
       <div className={`
          flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]
          ${isLarge ? "w-12 h-12" : "w-10 h-10"}
       `}>
          <Terminal size={isLarge ? 28 : 20} />
       </div>
       <div>
         <h1 className={`font-black tracking-tighter font-sans leading-none ${isLarge ? "text-3xl" : "text-xl"}`} dir="ltr">
             <span className="text-white">DARK</span>
             <span className="text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">CODE</span>
         </h1>
         {isLarge && (
            <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></span>
                <p className="text-[10px] text-dim font-mono tracking-[0.2em] uppercase">Intelligence System</p>
            </div>
         )}
       </div>
    </div>
  );
};