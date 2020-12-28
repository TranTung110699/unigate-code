import React, { Component } from 'react';
import Presenter from './Presenter';
import items from './configs';

/** Container component * */
export default class MenuLeft extends Component {
  onUnfreeze() {}

  onFreeze() {}

  render() {
    // TODO: get available menu items

    return (
      <Presenter
        syllabus={this.props.syllabus}
        menuItems={items(this.props.syllabus)}
        onFreeze={this.onFreeze}
        onUnfreeze={this.onUnfreeze}
      />
    );
  }
}
