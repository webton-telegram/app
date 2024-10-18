import { useState } from 'react';
import WebApp from '@twa-dev/sdk';

import LayoutContainer from 'components/layout/LayoutContainer';
import ThemeControlSwitch from 'components/ThemeControlSwitch';

WebApp.ready();

function App() {
  const [count, setCount] = useState(0);

  return (
    <LayoutContainer>
      <h1>WebTON</h1>
      <div className="card">
        <button onClick={() => setCount((prevState) => prevState + 1)}>
          count is {count}
        </button>
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
      <ThemeControlSwitch />
    </LayoutContainer>
  );
}

export default App;
