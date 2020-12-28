import React from 'react';
import GJTopMenu from './GJTopMenu';
import './stylesheet.scss';

class Menu extends React.Component {
  render() {
    const cssClass = 'gj-header';
    return (
      <div className={`${cssClass} gj-bg-color`}>
        <GJTopMenu />
      </div>
    );
  }
}

export default Menu;
