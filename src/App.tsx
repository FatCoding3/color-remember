import { useRef, useState } from 'react';
import './App.css';
import {EColor} from "./enums/color.enum";
import { Board, BoardDataItem } from './components/board';
import { PlayerProfile } from './components/player-profile';
import woodBackgroundImg from './assets/image/wood-background.jpg'

const numOfBlock = 23;
const colorNeed = 6;

function getAllColor(): {[key: string]: number} {
  const allColor = Object.values(EColor);
  const result: {[key: string]: number} = {};
  const defaultOneColorNum = Math.floor(numOfBlock/colorNeed) + 1;;
  for (let i = 0; i<colorNeed; i++ ) {
    const randomIndex = Math.floor(Math.random() * allColor.length);
    
    result[allColor[randomIndex]] = defaultOneColorNum

    if (i === colorNeed - 1) {
      result[allColor[randomIndex]] = numOfBlock%defaultOneColorNum;
    }

    allColor.splice(randomIndex, 1);
  }
  return result;
}

function App() {
  const allColor = useRef(getAllColor());
  const lastId = useRef(-1);
  const [colorToGo, setColorToGo] = useState(Object.keys(allColor.current)[0]);
  const [boardData, setBoardData] = useState(getInitialData(allColor.current));
  
  const [pause, setPause] = useState(false);
  const [marks, setMarks] = useState({1: 0, 2: 0});
  const [isPlayer1, setIsPlayer1] = useState(true);

  const chooseColor = () => {
    const randomColorIndex = Math.floor(Math.random() * Object.keys(allColor.current).length);
    return Object.keys(allColor.current)[randomColorIndex];
  }
  const removeOneInColor = (colorKey: string) => {
    allColor.current[colorKey] = allColor.current[colorKey] - 1;
    if (allColor.current[colorKey] <= 0) delete allColor.current[colorKey];
  }

  const checkRightColor = (id: number) => {
    if (lastId.current >= 0) removeColorBlock(lastId.current);
    if (colorToGo === boardData[id].color) {
      setOnePeep(id);
      setOneUnavailable(id);
      setColorToGo(chooseColor());
      setMarks({
        1: isPlayer1 ? marks[1] + 1 : marks[1],
        2: !isPlayer1 ? marks[2] + 1 : marks[2],
      });
      removeOneInColor(colorToGo);
      lastId.current = id;
      return true;
    }
    return false;
  }

  const removeColorBlock = (id: number) => {
    const cloneBoardData = [...boardData];
    cloneBoardData[id].stillInBoard = false;
    setBoardData(cloneBoardData);
  }

  const setOnePeep = (id: number) => {
    const cloneBoardData = [...boardData];
    cloneBoardData[id].peep = true;
    setBoardData(cloneBoardData);
  }

  const setOneUnavailable = (id: number) => {
    const cloneBoardData = [...boardData];
    cloneBoardData[id].isAvailable = false;
    setBoardData(cloneBoardData);
  }

  const colorBlockSetPeep = (id: number) => {
    if (checkRightColor(id)) return;
    setOnePeep(id);
    setPause(true);
    setAllAvailable(false);
  }

  const setAllAvailable = (available: boolean) => {
    const cloneBoardData = boardData.map(item => ({
      ...item,
      isAvailable: available,
    }))
    setBoardData(cloneBoardData);
  }

  const setAllPeepDown = () => {
    const cloneBoardData = boardData.map(item => ({
      ...item,
      peep: false,
      isAvailable: true,
    }))
    setBoardData(cloneBoardData);
  }

  if (window.innerWidth > 400) return (<div>This app now support for smart phone only</div>)

  return (
    <div className="App flex flex-col items-center gap-4 h-full">
      <img src={woodBackgroundImg} alt={''} className={'h-[100vh] fixed top-0 left-0 z-[-1]'}/>
      <div className='w-full'>
        <div className={'bg-gray-700 text-slate-300 w-full h-full p-1'}>Color Remember Game (beta 0.1)</div>
        <div className='flex w-full gap-[2px] bg-gray-600'>  
          <PlayerProfile name={'Player 1'} marks={marks[1]} colorToGo={isPlayer1 ? colorToGo : undefined}/>
          <PlayerProfile name={'Player 2'} marks={marks[2]} colorToGo={isPlayer1 ? undefined : colorToGo}/>
        </div>
      </div>

      <div className='w-[95vw] h-[95vw]'>
        <Board
          data = {boardData}
          setPeep = {colorBlockSetPeep}
        />
      </div>

      <button 
        onClick={() => {
          setPause(false); 
          setAllPeepDown();
          setIsPlayer1(!isPlayer1);
          setColorToGo(chooseColor());
        }}
        disabled = {!pause}
        className={'bg-cyan-600 text-white w-[50vw] p-1 rounded-full ' + (pause ? '' : 'invisible')}
      >Next Player</button>
    </div>
  );
}

function getInitialData(allColor: {[key: string]: number}) {
  const colorData = getColorData(allColor);
  return colorData.map((thisColor): BoardDataItem => ({
    color: thisColor,
    peep: false,
    isAvailable: true,
    stillInBoard: true,
  }))
}

function getColorData(allColor: {[key: string]: number}) {
  const thisAllColor = {...allColor};
  const data: string[] = [];
  for (let i = 0; i<numOfBlock; i++) {
    const randomColorIndex = Math.floor(Math.random() * Object.keys(thisAllColor).length);
    const colorKey = Object.keys(thisAllColor)[randomColorIndex];
    thisAllColor[colorKey] = thisAllColor[colorKey] - 1;
    if (thisAllColor[colorKey] <= 0) delete thisAllColor[colorKey];
    data.push(colorKey);
  }
  return data;
}

export default App;
