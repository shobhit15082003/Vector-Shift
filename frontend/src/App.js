import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';


function App() {
  return (

    <div className='bg-[#F8FAFC ] h-[100vh] dark:bg-[#0F172A] overflow-hidden'>
   
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      
    </div>
  );
}

export default App;
