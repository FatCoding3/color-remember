import React from "react";
import {EColor} from "../enums/color.enum";
import blockWoodImg from "../assets/image/block-color.jpg";
import blankBlockImg from "../assets/image/blank-block.jpg";

interface ColorBlockProps {
  id: number;
  color: EColor | string;
  isAvailable: boolean
  stillInBoard: boolean
  peep: boolean;
  setPeep: () => void;
}

export const ColorBlock = (props: ColorBlockProps) => {
  const backgroundImg = (props.stillInBoard) ?
    <img src={blockWoodImg} alt={''} className={'h-full w-full'}/> :
    <img src={blankBlockImg} alt={''} className={'h-full w-full'}/>
  return (
    <button
      onClick={() => props.setPeep()}
      disabled={!props.isAvailable || !props.stillInBoard}
      className={
        'rounded-full w-full h-full overflow-hidden ' +
        (props.color)
      }
    >
      {(props.peep && props.stillInBoard) ? <div className="w-full h-full"/> : backgroundImg}
    </button>
  )
}