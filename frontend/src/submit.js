"use client";
import { Button } from "./components/ui/moving-border";
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { toast } from 'react-hot-toast';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes,
          edges,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Display the results in a user-friendly alert
      toast.success(
        <div className="text-center">
          <h3 className="font-bold text-lg">Pipeline Analysis Results</h3>
          <p>Nodes: {result.num_nodes}</p>
          <p>Edges: {result.num_edges}</p>
          <p>Is DAG: {result.is_dag ? '✅ Yes' : '❌ No'}</p>
        </div>,
        {
          duration: 5000,
          style: {
            minWidth: '300px',
          },
        }
      );
      
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      toast.error('Failed to submit pipeline');
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-2 max-sm:mb-3">
      <Button 
        onClick={handleSubmit}
        type="button"
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
        max-sm:text-base max-sm:px-4 max-sm:py-2"
      >
        Submit Pipeline
      </Button>
    </div>
  );
};