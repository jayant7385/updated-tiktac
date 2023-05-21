import React,{useState} from "react";
import Game from "./Game";
const Homepage = () => {
const [fname,setFname]=useState("");
const [sname,setSname]=useState("");
const [show,setShow]=useState(false);
const btnhandler=()=>{
  setShow((fname && sname)?true:alert("Please enter player's name"));
}
  return (
    <>
    {!show?
    <div className="App">
     <h1 className="heading">Welcome to Tic-Tac-Toe</h1>
     <input placeholder="1'st Player Name...X"  onChange={(e)=>{setFname(e.target.value)}} value={fname}/> <br/><br/>
     <input placeholder="2'nd Player Name...O" onChange={(e)=>{setSname(e.target.value)}} value={sname}/> <br/><br/>
     <button onClick={btnhandler}>Submit</button>
    </div>: <Game fname={fname} sname={sname}/>
    }
    </>
  )
}

export default Homepage;