import { useState } from 'react';
import WebApp from '@twa-dev/sdk';

import './App.css';

WebApp.ready();

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>WebTON</h1>
      <div className="card">
        <button onClick={() => setCount((prevState) => prevState + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <div className="card">
        <button
          onClick={() =>
            WebApp.showAlert(`Hello World! Current count is ${count}`)
          }
        >
          Show Alert
        </button>
      </div>
    </>
  );
}

export default App;
