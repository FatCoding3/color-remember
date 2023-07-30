import React, { ReactNode } from "react";
import {EColor} from "../enums/color.enum";
import {ColorBlock} from "./color-block";
export interface BoardDataItem {
  color: EColor | string;
  peep: boolean;
  isAvailable: boolean;
  stillInBoard: boolean;
}
export interface BoardProps {
  data: BoardDataItem[];
  setPeep: (id: number) => void;
}
export const Board = (props: BoardProps) => {
  const allBlock: ReactNode[] = [];
  props.data.forEach((item, index) => {
    const colorBlock = <ColorBlock
      id = {index}
      color = {item.color}
      isAvailable = {item.isAvailable}
      stillInBoard = {item.stillInBoard}
      peep = {item.peep}
      setPeep = {() => props.setPeep(index)}
    />
    allBlock.push(<div className="w-[100%] h-[100%]">
      {colorBlock}
    </div>)
    allBlock.push(<div className="w-[100%] h-[100%]"/>)
  })
  
  return (
    <div className="w-full h-full grid grid-cols-9 gap-x-[1.25%] gap-y-[12.5%]">
      {allBlock.slice(0, -1)}
    </div>
  )
}