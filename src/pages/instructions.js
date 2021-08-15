import React from 'react';

const Instructions = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'Right',
        alignItems: 'Right',
        height: '100vh'
      }}
    >
      <h3>This is how you play. Pay attention to the clues on the left and top of the puzzle. These tell you how many cells for each row/column should be filled out. If there is a space between the clue numbers, it means 1+ cell is necessary between the two numbers. The filled-in cells will form a picture at the end of the puzzle.</h3>
    </div>
  );
};

export default Instructions;
