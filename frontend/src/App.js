import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ThemeProvider } from './ThemeContext';

function App() {
  return (

    <div className='bg-red-400 h-[100vh] dark:bg-green-400'>
   
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      
    </div>
  );
}

export default App;
