import React from 'react';
import EVNMenuInfo from './evn-menu-info';
import EVNTopMenu from './evn-top-menu';
import './stylesheet.scss';

class Menu extends React.Component {
  render() {
    const cssClass = 'evn-header';
    return (
      <div className={`${cssClass}`}>
        <EVNMenuInfo />
        <EVNTopMenu />
      </div>
    );
  }
}

export default Menu;
