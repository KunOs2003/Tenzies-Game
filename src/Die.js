import React from 'react'

export default function Die(props) {
  return (
    <>
        <div>
            <h1 className="dice--num" style={props.notYet ? {background:"#EF6079FF",color:"white"}:!props.isHeld ? {background:'#59E391',color:"white"} : {}} onClick={props.onClick}>{props.num}</h1>
        </div>
    </>
  )
}
