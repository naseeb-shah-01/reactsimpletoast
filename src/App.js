import logo from './logo.svg';
import './App.css';
import { MyComponent } from 'firtlib'; // Assuming this is a fictional library, replace with actual import if needed
import { ToastProvider, toast } from 'react-toast-simple';
import { useState } from 'react';

const ToastCode = ({ code }) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div>
      <button onClick={() => setShowCode(!showCode)}>
        {showCode ? 'Hide Code' : 'Show Code'}
      </button>
      {showCode && (
        <pre style={{ backgroundColor: 'white', padding: '10px', borderRadius: '5px', overflowX: 'auto', color: 'black' }}>
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
};

const positions = [
  'topRight', 'bottomRight', 'topCenter', 
  'topLeft', 'bottomLeft', 'bottomCenter', 'center'
];

const types = [
  { type: 'success', label: 'Success' },
  { type: 'error', label: 'Error' },
  { type: 'info', label: 'Info' }
];

function App() {
  return (
    <ToastProvider>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-brand">
            <img src={logo} className="App-logo" alt="logo" />
            <span className="app-title">React Toast Simple</span>
          </div>
          <div className="navbar-links">
            <a href='https://www.npmjs.com/package/react-toast-simple'>NPM</a>
            <a href="https://github.com/naseeb-shah" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/naseeb-khan-deenshah/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:shahnaseeb1010@gmail.com">Email</a>
          </div>
        </nav>
        <div className="installation">
          <h2>Installation</h2>
          <p>To install React Toast Simple, use the following command:</p>
          <pre style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', overflowX: 'auto', color: 'black' }}>
            <code>npm install react-toast-simple</code>
          </pre>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: "row",
          justifyContent: 'space-between',
          margin: '10px',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          cursor: 'pointer',
          flexWrap: 'wrap'
        }}>
          {types.map(({ type, label }) => (
            positions.map((position) => (
              <div style={{ width: '30%', margin: "20px" }} key={`${type}-${position}`} >
                <button
                  className='toast-button'
                  onClick={() => toast[type](`This is a ${label.toLowerCase()} message!`, position)}
                >
                  Show {label} ({position.charAt(0).toUpperCase() + position.slice(1)})
                </button>
                <ToastCode code={`toast.${type}('${label} message', '${position}');`} />
              </div>
            ))
          ))}
        </div>
       
        <button
        className='toast-button'
          onClick={() => toast.custom(
            <div style={{ color: 'white', backgroundColor: 'black', height: "200px", width: "300px",textAlign:'center',padding:"25%",borderRadius:'25px' }}>
This is custom Toast.
<p> Time Duration is : 6000 milliseconds</p>
<p>
  toast.custom(<>Your Custom Component</>,position = custom, Duration)
</p>
            </div>,
            'center',
            6000
          )}
        >
          Show Custom Toast (Center)
        </button>
        
      </div>
    </ToastProvider>
  );
}

export default App;
