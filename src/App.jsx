import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from './api';

function App() {
  const [count, setCount] = useState(0)
  const [apiResult, setApiResult] = useState(null);

  const callApi = async (endpoint) => {
    try {
      const res = await api.get(endpoint);
      setApiResult(JSON.stringify(res.data));
    } catch (e) {
      setApiResult(null); // Error handled globally
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div style={{ margin: '20px 0' }}>
        <button onClick={() => callApi('/success')}>Call Success API</button>
        <button onClick={() => callApi('/validation-error')}>Validation Error</button>
        <button onClick={() => callApi('/business-error')}>Business Error</button>
        <button onClick={() => callApi('/system-error')}>System Error</button>
        {apiResult && <pre>{apiResult}</pre>}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
