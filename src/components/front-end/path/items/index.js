/**
 * Created by quandv on 11/05/17.
 */
import React, { Component } from 'react';
import Course from 'components/front-end/course/in-grid';
import Path from './path-item';

class LearningItem extends Component {
  render() {
    const { item, rootPathIid, parentClassName } = this.props;
    return (
      <div className={parentClassName}>
        {item.ntype === 'course' && (
          <Course item={item} rootPathIid={rootPathIid} />
        )}
        {item.ntype === 'path' && (
          <Path item={item} rootPathIid={rootPathIid} />
        )}
      </div>
    );
  }
}

export default LearningItem;
