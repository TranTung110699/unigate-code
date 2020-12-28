/**
 * Created by hungvo on 03/05/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import actions from 'actions/saga-creators';
import { RIEInput } from 'riek';
import apiUrls from 'api-endpoints';
import CircularProgress from 'material-ui/CircularProgress';
import routes from 'routes';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import GroupReport from './GroupReport';
import UserReport from './UserReport';

const getKeySateNodeReport = (node, type = 'node') => {
  let keyState = 'node-report';
  if (type === 'node') {
    keyState = `${node.iid}-${keyState}`;
  } else if (type === 'target') {
    keyState = `${node.iid}-progress-${keyState}`;
  } else if (type === 'report') {
    keyState = `${node.iid || node.ntype}_report`;
  }
  return keyState;
};

class ReportLayout extends Component {
  spanStyle = { marginLeft: 30, borderBottom: '1px solid #00BCD4' };

  rIEInputEditProps = {
    style: {
      borderBottom: '2px solid #00BCD4',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      treeData: null,
    };
    this.saveProgress = this.saveProgress.bind();
  }

  componentWillMount() {
    this.getData(this.props);
    this.onFetchNodeReport(this.props);
    this.setState({
      loading: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      itemReport,
      targetReport,
      node,
      itemAncestors,
      progress,
    } = this.props;

    if (
      (!this.state.treeData ||
        (!progress && nextProps.progress) ||
        (nextProps.targetReport.ntype === 'user' &&
          nextProps.targetReport.iid !== targetReport.iid)) &&
      nextProps &&
      nextProps.treeData
    ) {
      const treeData = this.formatDataDrawTreeview(
        nextProps.treeData,
        itemAncestors[0],
        targetReport,
        nextProps.progress,
      );
      if (treeData) {
        this.setState({
          treeData: toggleExpandedForAll({
            treeData,
            expanded: false,
          }),
        });
      }
    }

    if (
      typeof nextProps !== 'undefined' &&
      ((nextProps.itemReport !== 'undefined' &&
        nextProps.itemReport.iid &&
        nextProps.itemReport.iid != itemReport.iid) ||
        (nextProps.targetReport !== 'undefined' &&
          nextProps.targetReport.iid &&
          nextProps.targetReport.iid != targetReport.iid) ||
        (nextProps.node !== 'undefined' &&
          nextProps.node.iid &&
          nextProps.node.iid != node.iid))
    ) {
      this.getData(nextProps);
      this.setState({
        loading: true,
      });
      return;
    }

    if (
      nextProps &&
      nextProps.itemLearning &&
      nextProps.itemLearning &&
      Object.keys(nextProps.itemLearning).length
    ) {
      this.setState({
        loading: false,
      });
    }
  }

  onFetchNodeReport(props) {
    const { dispatch, node, targetReport } = props;
    if (!node || !node.iid) {
      return;
    }

    let params = {
      iid: node.ntype === 'course' ? node.syllabus : node.iid,
      ntype: node.ntype === 'course' ? 'syllabus' : node.ntype,
      depth: -1,
    };
    let url = apiUrls.fetch_node;
    let keyState = getKeySateNodeReport(node, 'node');
    dispatch(sagaActions.getDataRequest({ url, keyState }, params));

    if (targetReport && targetReport.ntype === 'user') {
      params = {
        tcos: node.ntype === 'course' ? node.syllabus : node.iid,
        children: 1,
        depth: 5,
        userIid: targetReport.iid,
      };
      url = apiUrls.tracker_progress_get();
      keyState = getKeySateNodeReport(targetReport, 'target');
      dispatch(sagaActions.getDataRequest({ url, keyState }, params));
    }
  }

  getData = (data) => {
    const { dispatch } = this.props;
    const { itemReport, targetReport, node } = data;
    const params = {
      target_type: targetReport.ntype,
      target_iid: targetReport.iid,
      item_ntype: itemReport.ntype || node.ntype,
      item_iid: itemReport.iid || node.iid,
    };
    const url = '/skill/api/details-skills';
    const keyState = getKeySateNodeReport(targetReport, 'report');
    dispatch(sagaActions.getDataRequest({ url, keyState }, params));
  };

  formatDataDrawTreeview = (data, node, targetReport, progress = []) => {
    if (data.constructor !== Array) {
      data = data.children || [data];
    }
    const result = [];
    data.forEach((value, index) => {
      if (value.children) {
        value = Object.assign(value, {
          children: this.formatDataDrawTreeview(
            value.children,
            node,
            targetReport,
            progress,
          ),
        });
      }
      const p = progress[value.iid] || {};
      value.title =
        ['question', 'vocab'].indexOf(value.ntype) === -1 ? (
          <div>
            <Link
              to={`${routes.url('node_edit', {
                iid: node.iid,
                ntype: node.ntype,
              })}/${targetReport.ntype}/${targetReport.iid}/${value.ntype}/${
                value.iid
              }/report`}
            >
              <IconButton iconClassName="mi mi-remove-red-eye" />
              {value.name}
            </Link>
            {targetReport.ntype === 'user' && (
              <span style={this.spanStyle}>
                {['syllabus', 'sco'].indexOf(value.ntype) !== -1 ? (
                  p.p
                ) : (
                  <RIEInput
                    change={(message = {}) => {
                      this.saveProgress(
                        targetReport.iid,
                        value.iid,
                        message.message,
                      );
                    }}
                    validate={(text) => {
                      const n = Math.floor(Number(text));
                      return String(n) === text && n >= 0 && n <= 100;
                    }}
                    classEditing="editing"
                    value={p.p || '0'}
                    propName="message"
                    editProps={this.rIEInputEditProps}
                    defaultProps={this.rIEInputEditProps}
                  />
                )}
              </span>
            )}
          </div>
        ) : (
          value.name || `Question-${index}`
        );
      result.push(value);
    });
    return result;
  };

  saveProgress = (userIid, tcoIid, p) => {
    const { dispatch, node } = this.props;
    const data = {
      progress: [
        {
          tco_iid: tcoIid,
          p,
        },
      ],
      userIid,
    };
    dispatch(actions.trackerProgressSave(data));
  };

  renderTreeViewDataReport = (data) => (
    <SortableTree
      treeData={data}
      canDrop={() => false}
      onChange={(treeData) => this.setState({ treeData })}
      maxDepth={1}
      canDrag={() => false}
    />
  );

  render() {
    const { targetReport, itemLearning, node, targetInfo } = this.props;
    const treeData = this.state.treeData;

    return (
      <div>
        {treeData ? (
          <div>
            {targetInfo && targetInfo.iid && (
              <h3>
                <Link
                  to={`${routes.url('node_edit', {
                    iid: node.iid,
                    ntype: node.ntype,
                  })}/${targetReport.ntype}/${targetReport.iid}/report`}
                >
                  {targetInfo.name}({targetInfo.iid})
                </Link>
              </h3>
            )}
            {targetReport.ntype === 'group' ? (
              <GroupReport
                {...this.props}
                itemLearning={itemLearning}
                saveProgress={this.saveProgress}
                treeData={this.renderTreeViewDataReport(treeData)}
              />
            ) : (
              <UserReport
                {...this.props}
                treeData={this.renderTreeViewDataReport(treeData)}
              />
            )}
          </div>
        ) : (
          <div>
            <CircularProgress />
            <CircularProgress size={60} thickness={5} />
            <CircularProgress size={80} thickness={7} />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const itemAncestors = state.editing.itemAncestors || [];
  const targetReport = itemAncestors[1] || {};
  const itemReport =
    (itemAncestors.length > 2
      ? itemAncestors[itemAncestors.length - 1]
      : itemAncestors[0]) || {};
  let keyState = getKeySateNodeReport(targetReport, 'report');
  const data = state.dataApiResults[keyState] || {};
  const userProgress = data.userProgress || [];
  const skills = data.skills || [];
  const itemsKey = data.itemsKey || [];
  const itemLearning = data.itemLearning || {};
  const targetInfo = data.targetInfo || {};
  const node = props.node;
  keyState = getKeySateNodeReport(node, 'node');
  const treeData = state.dataApiResults[keyState];
  keyState = getKeySateNodeReport(targetReport, 'target');
  const progress = state.dataApiResults[keyState];
  return {
    skills,
    itemsKey,
    targetInfo,
    itemReport,
    targetReport,
    userProgress,
    itemLearning,
    itemAncestors,
    treeData,
    progress,
  };
}

export default connect(mapStateToProps)(ReportLayout);
