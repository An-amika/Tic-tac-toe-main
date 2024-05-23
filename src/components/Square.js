import React from 'react';

function Square({ value, onClick, color }) {
  return (
    <button className="square" onClick={onClick} style={{ color: color }}>
      {value}
    </button>
  );
}

export default Square;
