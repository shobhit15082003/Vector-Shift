"use client";
import { Button } from "./components/ui/moving-border";

export const SubmitButton = () => {
  return (
    <div className="flex items-center justify-center w-full  px-2 max-sm:mb-3">
      <Button 
        type="submit"
        className="text-lg sm:text-2xl font-medium tracking-wide transition-all duration-300
        bg-slate-300 dark:bg-[#060b16]
        text-[#1E293B] dark:text-[#E2E8F0]
        border-2 border-[#E2E8F0] dark:border-[#334155]
        hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]
        hover:border-[#3B82F6] dark:hover:border-[#60A5FA]
        hover:text-[#2563EB] dark:hover:text-[#60A5FA]
        active:scale-[0.98] 
        shadow-sm hover:shadow-md
        px-6 py-2 sm:px-8 sm:py-3 rounded-lg
        w-full sm:w-auto max-w-md
        max-sm:text-base max-sm:px-4 max-sm:py-2
        
        "  
        
      >
        Submit
      </Button>
    </div>
  );
};