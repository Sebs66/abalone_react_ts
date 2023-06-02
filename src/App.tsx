import './App.css'
import React,{ useContext, useEffect } from "react";
import BoardContext from "./context/board";
import TableBoard from './components/tableBoard/TableBoard';
import InfoPanel from './components/infoPanel/InfoPanel';
import OptionsPanel from './components/optionsPanel/OptionsPanel'
import Modal from './components/modal/Modal';


function App(){
  const {displayModal} = useContext(BoardContext);

  return (<>
  {displayModal && <Modal></Modal>}
  <div> <a href="https://github.com/Sebs66/abalone_react_ts">Github repo</a></div>
  <div className="content">
    <OptionsPanel></OptionsPanel>
    <TableBoard></TableBoard>
    <InfoPanel></InfoPanel>
  </div>
  </>
  )
}

export default App
