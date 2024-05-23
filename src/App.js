import React from 'react';
import Board from './components/Board';
import "./App.css";

function App() {
  const graffitiStyle = {
    fontFamily: 'Permanent Marker, cursive',
    fontSize: '3em', // Adjust the size as needed
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase' // Optional: Convert text to uppercase for a more graffiti-like effect
  };

  return (
    <div className="App">
      <h1 style={graffitiStyle}>Tic Tac Toe</h1>
      <Board />
    </div>
  );
}

export default App;
