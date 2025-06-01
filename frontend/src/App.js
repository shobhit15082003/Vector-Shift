import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='bg-[#F8FAFC] h-[100vh] dark:bg-[#0F172A] overflow-hidden'>
      {/* Add Toaster component here at the root level */}
      <Toaster 
        position="top-center"
        toastOptions={{
          className: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100',
          duration: 5000,
          style: {
            borderRadius: '0.5rem',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
          success: {
            className: 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200',
            iconTheme: {
              primary: 'rgb(21 128 61)',
              secondary: 'white',
            },
          },
          error: {
            className: 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200',
          },
        }}
      />
      
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;