import { useState } from 'react';
import './App.css';
import { MainActivityArea } from './components/MainActivityArea';
import { MovingArea } from './components/MovingArea';
import { usePlayer } from './hooks/usePlayer';

function App() {
  const initPlayer = {
    position: { x: 0, y: 0 },
    height: 150,
    width: 80,
  }

  const { player, movePlayer } = usePlayer(initPlayer)

  return (
    <div className="App">
      <div style={{
        display: 'flex',
        justifyContent: "center"
      }}>
        <MainActivityArea />
      </div>
      <MovingArea player={player} movePlayer={movePlayer} />
    </div>
  );
}

export default App;
