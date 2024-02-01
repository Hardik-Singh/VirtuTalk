import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch("http://localhost:5003/") // Assuming Flask is running on port 5003
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json(); // Parse the response as JSON
      })
      .then((responseData) => {
        setData(responseData);
        console.log(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setMessage(inputValue);
    setInputValue('');
  };

  return (
    <>
      <h1>Bite + React</h1>
      <div className="card">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type something..."
        />
        <button onClick={handleButtonClick}>Save Input</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>Message: {message}</p>
      <p>Data: {data ? JSON.stringify(data) : null}</p>
    </>
  );
}

export default App;
