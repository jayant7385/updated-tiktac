import React,{ useState, useEffect } from 'react'
import Square from "./Components/Square";
import { Patterns } from "./Components/Patterns";
const Game = ({fname,sname}) => {
const [board, setBoard] = useState(Array(9).fill(""));
const [player, setPlayer] = useState("O");
const [result, setResult] = useState({ winner: "none", state: "none" });
const [history, setHistory] = useState([Array(9).fill(null)]);    //----->> new

useEffect(() => {
  checkWin();
  checkIfTie();
  if (player === "X") {
    setPlayer("O");
  } else {
    setPlayer("X");
  }
}, [board]);

useEffect(() => {
  if (result.state !== "none") {
    alert(`Game Finished! Winning Player: ${result.winner}`);
   // console.log(fname,sname)
    restartGame();
    setHistory([])//------>> new 
  }
}, [result]);

const chooseSquare = (square) => {
  setBoard(
    board.map((val, idx) => {
      if (idx === square && val === "") {
        return player;
      }
      return val;
    })
  ); 
  setHistory([...history, board]);    //----->> new
};

const checkWin = () => {
  Patterns.forEach((currPattern) => {
    const firstPlayer = board[currPattern[0]];
    if (firstPlayer === "") return;
    let WinningPattern = true;
    currPattern.forEach((idx) => {
      if (board[idx] !== firstPlayer) {
        WinningPattern = false;
      }
    });

    if (WinningPattern) {
      if(player==="O"){
        setResult({ winner: sname, state: "Won" });
      }else{
        setResult({ winner: fname, state: "Won" });
      }
    }
  });
};

const checkIfTie = () => {
  let filled = true;
  board.forEach((square) => {
    if (square === "") {
      filled = false;
    }
  });
  if (filled) {
    setResult({ winner: "No One", state: "Tie" });
  }
};

const restartGame = () => {
  setBoard(["", "", "", "", "", "", "", "", ""]);
  setPlayer("O");
};
 
  const moves = history.map((step, move)=>{
  const desc = move ? `Go to Move #${move}` : 'Go to Game Start';
  return (
      <li key={move}>
          <button onClick={()=>{jumpToMomve(move)}}> {desc} </button>
      </li>
  )
})

const jumpToMomve = (step)=>{
  setBoard(history[step]);
  setResult({ winner: "none", state: "none" });
  setHistory(history.slice(0, step + 1))
}


return (
  <div className="App">
    <h1 className="heading">Tic Tac Toe</h1>
    <div className="board">
      <div className="row">
        <Square val={board[0]} chooseSquare={() =>{chooseSquare(0)}}/>
        <Square val={board[1]} chooseSquare={() =>{chooseSquare(1)}}/>
        <Square val={board[2]} chooseSquare={() =>{chooseSquare(2)}}/>
      </div>
      <div className="row">
        <Square val={board[3]} chooseSquare={() =>{chooseSquare(3)}}/>
        <Square val={board[4]} chooseSquare={() =>{chooseSquare(4)}}/>
        <Square val={board[5]} chooseSquare={() =>{chooseSquare(5)}}/>
      </div>
      <div className="row">
        <Square val={board[6]} chooseSquare={() =>{chooseSquare(6)}}/>
        <Square val={board[7]} chooseSquare={() =>{chooseSquare(7)}}/>
        <Square val={board[8]} chooseSquare={() =>{chooseSquare(8)}}/>
      </div>
    </div>
    <ol>
      {moves}
    </ol>
  </div>
);
}

export default Game