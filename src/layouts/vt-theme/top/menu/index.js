import React from 'react';
import VTMenuInfo from './VTMenuInfo';
import VTTopMenu from './VTTopMenu';
import './stylesheet.scss';

class Menu extends React.Component {
  render() {
    const cssClass = 'vt-header';
    return (
      <div className={`${cssClass}`}>
        <VTMenuInfo />
        <VTTopMenu />
      </div>
    );
  }
}

export default Menu;
