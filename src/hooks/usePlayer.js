import { useEffect, useState } from "react"

export const usePlayer = (initPlayer) => {
  const getInitPosition = () => {
    if (localStorage.getItem("player") === null) return { x: 0, y: 0 }
    const localPlayer = JSON.parse(localStorage.getItem("player"))
    return localPlayer.position
  }
  const [position, setPosition] = useState(getInitPosition())
  const player = {
    position: position,
    height: initPlayer.height ?? 150,
    width: initPlayer.width ?? 80,
    moveDistance: initPlayer.moveDistance ?? 50
  }
  const [moveDistance, setMoveDistance] = useState(player.moveDistance)

  const getMovedPosition = (direction) => {
    switch (direction) {
      case "top":
        return { x: player.position.x, y: player.position.y - moveDistance }
      case "down":
        return { x: player.position.x, y: player.position.y + moveDistance }
      case "right":
        return { x: player.position.x + moveDistance, y: player.position.y }
      case "left":
        return { x: player.position.x - moveDistance, y: player.position.y }
      default:
        return { x: player.position.x, y: player.position.y }
    }

  }
  const movePlayer = (direction, hitBoxEls, areaEl) => {
    const checkOverArea = (checkPosition) => {
      const areaRect = areaEl.getBoundingClientRect()
      if (checkPosition.x < 0) return { ...checkPosition, x: 0 }
      if (checkPosition.y < 0) return { ...checkPosition, y: 0 }
      if (areaRect.width < checkPosition.x + player.width) return { ...checkPosition, x: areaRect.width - player.width }
      if (areaRect.height < checkPosition.y + player.height) return { ...checkPosition, y: areaRect.height - player.height }
      return false
    }

    const checkHitEls = (checkPosition) => {
      let resultPosition = checkPosition
      const hitedEl = Array.from(hitBoxEls).find(el => {
        if (
          (checkPosition.x < el.offsetLeft + el.offsetWidth &&
            el.offsetLeft < checkPosition.x + player.width &&
            checkPosition.y < el.offsetTop + el.offsetHeight &&
            el.offsetTop < checkPosition.y + player.height
          )
        ) return true
        return false
      });
      console.log(hitedEl);
      if (hitedEl === undefined) return false
      switch (direction) {
        case "top":
          return { ...checkPosition, y: hitedEl.offsetTop + hitedEl.offsetHeight }
        case "down":
          return { ...checkPosition, y: hitedEl.offsetTop - player.height }
        case "right":
          return { ...checkPosition, x: hitedEl.offsetLeft - player.width }
        case "left":
          return { ...checkPosition, x: hitedEl.offsetLeft + hitedEl.offsetWidth }
      }
    }

    const hitedPosition = (checkPosition) => {
      const overAreaReslut = checkOverArea(checkPosition)
      const hitBoxElsReslut = checkHitEls(checkPosition)
      console.log(overAreaReslut, hitBoxElsReslut);
      return hitBoxElsReslut !== false ? hitBoxElsReslut : overAreaReslut
    }

    const checkPosition = getMovedPosition(direction)
    const hitedPositionResult = hitedPosition(checkPosition)
    setPosition(hitedPositionResult === false ? { ...checkPosition } : hitedPositionResult)
  }

  useEffect(() => {
    localStorage.setItem("player", JSON.stringify(player))
  }, [player, position])

  return { player, movePlayer, setMoveDistance }
}