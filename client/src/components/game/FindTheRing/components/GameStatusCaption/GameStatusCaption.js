import React, { useContext } from 'react';
import { GameEndPhrases } from '../../consts';
import { Context } from '../../store/contextProvider';
import './GameStatusCaption.css';

const GameStatusCaption = () => {
  const [state] = useContext(Context);
  const { gameStatus } = state;

  return (
    <div className="GameStatusCaption">
      <p className="GameStatusCaption__text">{GameEndPhrases[gameStatus]}</p>
    </div>
  );
};

export default GameStatusCaption;
