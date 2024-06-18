import React, { useEffect } from 'react'

export const Player = ({ player, objects, movePlayer, areaEl }) => {
  const handleKeydown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        return movePlayer("top", objects, areaEl)
      case "ArrowDown":
        return movePlayer("down", objects, areaEl)
      case "ArrowRight":
        return movePlayer("right", objects, areaEl)
      case "ArrowLeft":
        return movePlayer("left", objects, areaEl)
    }

  }
  useEffect(() => {
    document.addEventListener("keydown", handleKeydown)
    return () => {
      document.removeEventListener("keydown", handleKeydown)
    }
  }, [player, objects])
  return (
    <div style={{
      height: player.height,
      width: player.width,
      border: "solid gray 1px",
      position: 'absolute',
      top: player.position.y + "px",
      left: player.position.x + "px",
    }}>
      <div></div>
    </div>
  )
}
