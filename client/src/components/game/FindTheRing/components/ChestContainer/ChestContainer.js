import React, { useContext } from 'react';
import { GameStatus } from '../../consts';
import { Context } from '../../store/contextProvider';
import { openChest } from '../../store/actions';
import Chest from './Chest/Chest';
import GameStatusCaption from '../GameStatusCaption/GameStatusCaption';
import './ChestContainer.css';

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
    </div>
  );
};

export default ChestContainer;
