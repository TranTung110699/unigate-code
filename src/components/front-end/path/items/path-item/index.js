/**
 * Created by quandv on 11/05/17.
 */
import React, { Component } from 'react';
import { layouts } from 'configs/constants';
import { connect } from 'react-redux';
import { getThemeConfig } from 'utils/selectors';
import LearningItem from '../index';
import './stylesheet.scss';

class Path extends Component {
  render() {
    const { item, rootPathIid, themeConfig } = this.props;
    const children = item.children;

    const parentClassName =
      themeConfig.layout !== layouts.ETEC
        ? 'col-md-4 col-lg-4 col-sm-6 col-xs-12 item'
        : 'col-xs-12';
    return (
      <div className="ui-path-viewer">
        <div className={'path-title'}>{item.name}</div>
        <ul className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
          {children &&
            children.map &&
            children.map((child) => (
              <div key={child.iid}>
                <LearningItem
                  rootPathIid={rootPathIid}
                  item={child}
                  parentClassName={parentClassName}
                />
              </div>
            ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const item = props.item || {};
  return {
    userInfo: state.user.info,
    progress: state.trackerProgress[item.iid],
    themeConfig: getThemeConfig(state),
  };
};

export default connect(mapStateToProps)(Path);
