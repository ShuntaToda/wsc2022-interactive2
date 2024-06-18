import React, { useEffect, useRef, useState } from 'react'
import { Player } from './Player'
import { Barrier } from './Barrier'

export const MovingArea = ({ player, movePlayer }) => {
  const areaRef = useRef(null)
  const backgroundColor = "lightgray"
  const [objects, setObjects] = useState([])
  useEffect(() => {
    setObjects(areaRef.current.querySelectorAll("div.moving-obj"))
  }, [player, areaRef])
  return (
    <div
      ref={areaRef}
      style={{
        background: backgroundColor,
        height: "500px",
        width: "100%",
        position: "relative"
      }}>
      <Player player={player} objects={objects} movePlayer={movePlayer} areaEl={areaRef.current} />
      <Barrier />
    </div>
  )
}
