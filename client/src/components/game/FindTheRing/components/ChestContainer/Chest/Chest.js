import React from 'react';
import './Chest.css';

const Chest = ({ chest, openChest }) => {
  const classes = ['Chest'];
  if (chest.isOpen) {
    classes.push('Chest--open');
    if (chest.hasRing) {
      classes.push('Chest--has-ring');
    }
  }

  return <div className={classes.join(' ')} onClick={openChest} />;
};

export default Chest;
