import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [displayText, setDisplayText] = useState('');

  const handleClick = () => {
    setDisplayText(text);
  };

  return (
      <div className="App">
        <input type="text" value={text} onChange={(e) => { setText(e.target.value); }} />
        <button onClick={() => { handleClick(); }}>Ok</button>
        <p>{displayText}</p>
      </div>
  );
}

export default App;