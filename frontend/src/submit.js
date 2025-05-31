// submit.js
"use client";

import { Button } from "./components/ui/moving-border";

export const SubmitButton = () => {

    return (
        <div className="flex items-center justify-center">
            <Button 
            type="submit"
        className=" border-3 text-xl transition ease-in-out duration-300 hover:scale-105   bg-[#0f172b] "
      >
        Submit 
      </Button>
            
        </div>
    );
}
