import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import SearchLayOut from './search/Layout';
import SessionsDetailOfClass from './session';
import './stylesheet.scss';
import nodeActions from 'actions/node/creators';
import { getParams } from 'common';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 07/10/2017
 * */
class TimeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    const timetableMainPanel = ReactDOM.findDOMNode(
      this.refs.timetableMainPanel,
    );
    if (
      timetableMainPanel &&
      this.state.panelHeight !== timetableMainPanel.clientHeight
    ) {
      clearTimeout(this.state.timeOutId);
      let timeOutId = setTimeout(() => {
        this.setState({
          timeOutId,
          panelHeight: timetableMainPanel.clientHeight,
        });
      }, 100);
    }
  }

  componentDidMount() {
    this.getClass();
  }

  reloadClass = () => {
    this.getClass();
  };

  getClass = (nextProps) => {
    const props = nextProps || this.props;

    let classIid = getParams(props).classIid;
    if (!classIid) {
      classIid = props.classIid;
    }

    if (!classIid) {
      return;
    }
    this.setState({ classIid });
    const { dispatch } = props;
    dispatch(
      nodeActions.fetchNode({
        iid: classIid,
        ntype: 'course',
        depth: 2,
        is_timetable: true,
      }),
    );
  };

  getSession = () => {
    let sessions = [];
    if (this.props.clazz) {
      sessions = this.props.clazz.sessions || [];
    }
    return sessions;
  };

  render() {
    const { daysOfWeekOfClass } = this.props;
    return (
      <div className="timetable-main-panel" ref="timetableMainPanel">
        <SearchLayOut
          reloadClass={this.reloadClass}
          daysOfWeekOfClass={daysOfWeekOfClass}
          clazz={this.props.clazz}
          classIid={this.state.classIid}
        />
        <SessionsDetailOfClass
          height={this.state.panelHeight}
          clazz={this.props.clazz}
          sessions={this.getSession()}
        />
      </div>
    );
  }
}

const getDayOfWeeksAvailable = (clazz) => {
  if (
    !clazz ||
    !clazz.slots_of_day ||
    Object.keys(clazz.slots_of_day).length === 0
  ) {
    return undefined;
  }
  return Object.keys(clazz.slots_of_day);
};

const mapStateToProps = (state, props) => {
  let clazz;

  let classIid = getParams(props).classIid;
  if (!classIid) {
    classIid = props.classIid;
  }

  if (classIid) {
    clazz = state.tree[classIid];
  }
  const daysOfWeekOfClass = getDayOfWeeksAvailable(clazz);

  return {
    clazz,
    daysOfWeekOfClass,
  };
};

export default connect(mapStateToProps)(TimeTable);
