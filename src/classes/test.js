const board = [
  [0, 0, 0, 0, 0],         // 5 slots
  [0, 0, 0, 0, 0, 0],      // 6 slots
  [0, 0, 0, 0, 0, 0, 0],   // 7 slots
  [0, 0, 0, 0, 0, 0, 0, 0], // 8 slots
  [0, 0, 0, 0, 0, 0, 0, 0, 0],   // 9 slots
  [0, 0, 0, 0, 0, 0, 0, 0],      // 8 slots
  [0, 0, 0, 0, 0, 0, 0],   // 7 slots
  [0, 0, 0, 0, 0, 0],      // 6 slots
  [0, 0, 0, 0, 0]          // 5 slots
];

const axialCoordinates = [];

for (let i = 0; i < board.length; i++) {
  const row = board[i];
  const numSlots = row.length;
  const qOffset = Math.floor((board.length - numSlots) / 2);

  for (let j = 0; j < numSlots; j++) {
    const q = j + qOffset;
    const r = i;
    axialCoordinates.push([q, r]);
  }
}

console.log(axialCoordinates);