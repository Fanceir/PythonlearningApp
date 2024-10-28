// pages/Home.js
import { useState } from 'react';
import { executeCode } from '../services/api';

function Home() {
  const [code, setCode] = useState('print("Hello, Python!")');
  const [output, setOutput] = useState('');

  const handleExecute = async () => {
    try {
      const response = await executeCode({ code });
      setOutput(response.data.result);
    } catch (error) {
      console.error('Execution failed:', error);
    }
  };

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={handleExecute}>Run Code</button>
      <pre>{output}</pre>
    </div>
  );
}

export default Home;
