import { EColor } from "../enums/color.enum";

export interface PlayerProfileProps {
  name: string,
  marks: number,
  colorToGo?: EColor|string,
}

export const PlayerProfile = (props: PlayerProfileProps) => {
  return (<div className="w-full h-full p-3 bg-[#003A00] flex flex-col gap-2">
    <div className="text-left font-bold text-gray-300">{props.name}</div>
    <div className="text-left text-green-300">{`Marks:  ${props.marks}`}</div>
    <div className={"flex gap-3 " + (props.colorToGo ? '' : 'invisible')}>
      <div className="text-left text-blue-300">Color to find:</div>
      <div className={"w-5 h-5 rounded-full " + props.colorToGo}/>
    </div>
  </div>)
}