/**
 * Created by hungvo on 25/08/17.
 */
import React from 'react';
import DashBoardReport from './charts';

const USER_TARGET = 'user';
const GROUP_TARGET = 'group';

class DashBoardControlled extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabActive: 'user',
      groups: [],
    };
  }

  componentWillMount() {
    this.setTabActive(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const subAction = this.props.subAction || [];
    if (
      nextProps &&
      nextProps.subAction &&
      nextProps.subAction[0] &&
      nextProps.subAction[0] !== subAction[0]
    ) {
      this.setTabActive(nextProps);
    }

    const group = this.getGroupViewer(this.props);
    const newGroup = this.getGroupViewer(nextProps);
    if (
      newGroup &&
      newGroup.iid &&
      (!group || !group.iid || group.iid !== newGroup.iid)
    ) {
      this.setTabActive(nextProps);
    }
  }

  getGroupViewer = (props) => {
    const itemAncestors = props.itemAncestors || [];
    return itemAncestors[1];
  };

  setTabActive = (props) => {
    let tabActive = this.state.tabActive;
    const subAction = props.subAction || [];
    if (subAction[0] && subAction[0] === GROUP_TARGET) {
      tabActive = GROUP_TARGET;
    } else if (subAction[0] && subAction[0] === USER_TARGET) {
      tabActive = USER_TARGET;
    }
    const group = this.getGroupViewer(props);
    let groups = [];
    if (group && group.iid) {
      groups = group.iid.split('+');
      tabActive = GROUP_TARGET;
    }

    this.setState({
      tabActive,
      groups,
    });
  };

  render() {
    const { node } = this.props;
    const { tabActive, groups } = this.state;

    return <DashBoardReport node={node} target={tabActive} groups={groups} />;
  }
}

export default DashBoardControlled;
