import React, { useContext } from 'react';
import { GameEndPhrases } from '../../consts';
import { Context } from '../../store/contextProvider';

const GameStatusCaption = () => {
  const [state] = useContext(Context);
  const { gameStatus } = state;

  return (
    <div className="GameStatusCaption">
      <p className="GameStatusCaption__text">{GameEndPhrases[gameStatus]}</p>
      <style jsx>{`
      .GameStatusCaption {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0 auto;
        background: linear-gradient(to bottom, rgba(222, 222, 222, 0.8) 49%, rgba(184, 184, 184, 0.8) 50%);
        border: 4px solid rgba(0, 0, 0, 0.8);
        padding: 10px;
      }

      .GameStatusCaption__text {
        margin: 0;
        font-size: 12px;
        white-space: nowrap;
      }
      `}</style>
    </div>
  );
};

export default GameStatusCaption;
