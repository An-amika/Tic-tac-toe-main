import React, { useState, useEffect } from 'react';
import Square from './Square';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('scores'));
    if (savedScores) {
      setScores(savedScores);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('scores', JSON.stringify(scores));
  }, [scores]);

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);

    const winner = calculateWinner(newSquares);
    if (winner) {
      setScores((prevScores) => ({
        ...prevScores,
        [winner]: prevScores[winner] + 1,
      }));
      setWinner(winner);
      setTimeout(() => {
        window.alert(`Player ${winner === 'X' ? 'Blue' : 'Red'} won!`);
      }, 100);
    } else if (newSquares.every(square => square !== null)) {
      setDraw(true);
      setTimeout(() => {
        window.alert("It's a draw! Keep going!");
      }, 100);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const renderSquare = (i) => {
    const player = squares[i];
    const color = player === 'X' ? 'blue' : player === 'O' ? 'red' : 'black';
    return <Square value={player} onClick={() => handleClick(i)} color={color} />;
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setDraw(false);
  };

  let status;
  if (winner) {
    status = 'Winner: ' + (winner === 'X' ? 'Blue' : 'Red');
  } else if (draw) {
    status = "It's a draw! Keep going!";
  } else {
    status = 'Next player: ' + (xIsNext ? 'Blue' : 'Red');
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="score">
        <span>Blue (X): {scores.X}</span> | <span>Red (O): {scores.O}</span>
      </div>
      <div
        className="board-container"
        style={{
          backgroundColor: winner === 'X' ? 'blue' : winner === 'O' ? 'red' : 'transparent',
          borderRadius: '15px',
          padding: '20px'
        }}
      >
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;
