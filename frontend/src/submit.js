"use client";
import { Button } from "./components/ui/moving-border";

export const SubmitButton = () => {
  return (
    <div className="flex items-center justify-center">
      <Button 
        type="submit"
        className="text-xl font-medium tracking-wide transition-all duration-300
        bg-slate-300 dark:bg-[#060b16]
        text-[#1E293B] dark:text-[#E2E8F0]
        border-2 border-[#E2E8F0] dark:border-[#334155]
        hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]
        hover:border-[#3B82F6] dark:hover:border-[#60A5FA]
        hover:text-[#2563EB] dark:hover:text-[#60A5FA]
        active:scale-[0.98] 
        shadow-sm hover:shadow-md
        px-8 py-3 rounded-lg"
      >
        Submit
      </Button>
    </div>
  );
};