import React, { useContext } from 'react';
import { GameStatus } from '../../consts';
import { Context } from '../../store/contextProvider';
import { openChest } from '../../store/actions';
import Chest from './Chest/Chest';
import GameStatusCaption from '../GameStatusCaption/GameStatusCaption';


const ChestContainer = () => {
  const [state, dispatch] = useContext(Context);
  const { gameStatus, chests } = state;

  return (
    <div className="ChestContainer">
      {chests.map((chest, index) => (
        <Chest
          key={index}
          chest={chest}
          index={index}
          openChest={() => dispatch(openChest(index))}
        />
      ))}
      {gameStatus !== GameStatus.IN_PROGRESS && <GameStatusCaption />}
      <style jsx>{`
        .ChestContainer {
          display: flex;
          flex-wrap: wrap;
          margin: 0 0 20px;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default ChestContainer;
