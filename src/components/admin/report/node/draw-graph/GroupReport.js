/**
 * Created by hungvo on 03/05/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GroupBarChart from 'components/common/d3/GroupBarChart';
import { randColor, wordBreadcrumb } from 'common/utils/string';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { RIEInput } from 'riek';
import FlatButton from 'components/common/mui/FlatButton';
import IconMail from 'material-ui/svg-icons/communication/message';
import Communicate from 'components/admin/course/mainstage/communication/Form';
import actions from 'actions/node/creators';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import routes from 'routes';
import Icon from 'components/common/Icon';
import { t1, t2 } from 'translate';
import nodeIcon from 'components/admin/node/icon';
import Links from 'routes/links';
import { Link } from 'react-router-dom';

import './GroupReport.scss';

class GroupReport extends Component {
  rIEInputEditProps = {
    style: {
      borderBottom: '2px solid #00BCD4',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      drawData: {},
      skillKey: [],
      itemKey: [],
      targetDraw: {
        skill: true,
        item: false,
      },
    };
    this.XAxisOnclick = this.XAxisOnclick.bind(this);
  }

  componentWillMount() {
    const { skillKey, itemKey, ...drawData } = this.formatDataDrawGraph(
      this.props,
    );
    this.setState({
      skillKey,
      itemKey,
      drawData,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps !== 'undefined' &&
      typeof nextProps.itemLearning !== 'undefined' &&
      nextProps.itemLearning
    ) {
      const { skillKey, itemKey, ...drawData } = this.formatDataDrawGraph(
        nextProps,
      );
      this.setState({ skillKey, itemKey, drawData });
    }
  }

  XAxisOnclick = (d, i) => {
    const { drawData } = this.state || {};
    const { dataSet } = drawData || [];
    const { node } = this.props;
    const targetReport = { ...dataSet[i], ntype: 'user' };
    const url = `${routes.url('node_edit', {
      iid: node.iid,
      ntype: node.ntype,
    })}/user/${targetReport.iid}/report`;
    window.location.href = url;
  };

  formatDataDrawGraph = (dataProps) => {
    let { userProgress, skills, itemsKey } = dataProps;
    userProgress = userProgress || [];
    skills = skills || [];
    itemsKey = itemsKey || [];
    const dataSet = [];

    const skillKey = [];
    const itemKey = [];

    userProgress.forEach((value) => {
      const data = {
        label: value.name,
        iid: value.iid,
      };
      const progress = value.progress || [];
      progress.forEach((p) => {
        data[p.iid] = p.p || 0.1;
      });
      dataSet.push(data);
    });
    const keyLabels = {};
    skills.forEach((skill) => {
      skillKey.push(skill.iid);
      keyLabels[skill.iid] = skill.name;
    });
    const colors = [];
    itemsKey.forEach((item) => {
      if (item.ntype !== 'skill') {
        itemKey.push(item.iid);
      }
      colors.push(randColor());
      keyLabels[item.iid] = item.name;
    });
    return {
      dataSet,
      colors,
      keyLabels,
      skillKey,
      itemKey,
    };
  };

  setTargetReport = (target, value) => {
    const targetDraw = this.state.targetDraw;
    targetDraw[target] = value;
    this.setState({ targetDraw });
  };

  sendMessage = (targets) => {
    targets = targets || this.props.targets || [];
    const { dispatch, node } = this.props;

    const targetsValue = [];
    targets.forEach((item) => {
      targetsValue.push({
        key: item.name,
        data: item,
      });
    });

    const contentDialog = (
      <Communicate
        modal={1}
        valuesSet={{ targets: targetsValue }}
        params={{ targets: { node_type: node.ntype, node_iid: node.iid } }}
      />
    );
    const optionsProperties = {
      modal: true,
      handleClose: true,
      title: t1('communication'),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { drawData } = this.state;
    let { userProgress, itemsKey, treeData, node } = this.props;
    userProgress = userProgress || [];
    itemsKey = itemsKey || [];
    const height = window.innerHeight * 0.7;
    const width = window.innerWidth * 0.8;
    let keys = [];
    if (this.state.targetDraw.skill || !this.state.itemKey.length) {
      keys = keys.concat(this.state.skillKey);
    }
    if (this.state.targetDraw.item || !this.state.skillKey.length) {
      keys = keys.concat(this.state.itemKey);
    }
    drawData.keys = keys;
    return (
      <div>
        <div className="row" style={{ height: height + 20 }}>
          <div className="col-md-4" style={{ height }}>
            {treeData}
          </div>
          <div className="col-md-8">
            {this.state.itemKey.length && this.state.skillKey.length ? (
              <div>
                <Checkbox
                  checkedIcon={<ActionFavorite />}
                  uncheckedIcon={<ActionFavoriteBorder />}
                  label={t1('skill')}
                  checked={this.state.targetDraw.skill}
                  onCheck={(e, value) => {
                    this.setTargetReport('skill', value);
                  }}
                />
                <Checkbox
                  checkedIcon={<ActionFavorite />}
                  uncheckedIcon={<ActionFavoriteBorder />}
                  label={t2('item_learning')}
                  checked={this.state.targetDraw.item}
                  onCheck={(e, value) => {
                    this.setTargetReport('item', value);
                  }}
                />
              </div>
            ) : (
              <div />
            )}
            <GroupBarChart
              XAxisOnclick={this.XAxisOnclick}
              data={drawData}
              config={{
                min: 0,
                max: 100,
                yAxisLabel: 'progress',
                height,
                width,
              }}
            />
          </div>
        </div>
        <div className="row table-result">
          <Table>
            <TableHeader
              displaySelectAll={false}
              enableSelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn title={t1('user_name')}>
                  {t1('user_name')}
                </TableHeaderColumn>
                {itemsKey &&
                  itemsKey.map(
                    (item) =>
                      item.ntype !== 'skill' && (
                        <TableHeaderColumn key={item.id} title={item.name}>
                          <Icon icon={nodeIcon(item)} />
                          {wordBreadcrumb(item.name, 3)}
                        </TableHeaderColumn>
                      ),
                  )}
                <TableHeaderColumn title="">{t1('action')}</TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody displayRowCheckbox={false} showRowHover stripedRows>
              {userProgress &&
                userProgress.map((item) => (
                  <TableRow key={item.id}>
                    <TableRowColumn>
                      {item.name} - {item.iid}
                    </TableRowColumn>
                    {item.progress &&
                      item.progress.map(
                        (progress, index) =>
                          progress.ntype !== 'skill' && (
                            <TableRowColumn key={index}>
                              {['syllabus', 'sco'].indexOf(progress.ntype) !==
                              -1 ? (
                                progress.p
                              ) : (
                                <RIEInput
                                  change={(p = {}) => {
                                    this.props.saveProgress(
                                      item.iid,
                                      progress.iid,
                                      p.message,
                                    );
                                  }}
                                  validate={(text) => {
                                    const n = Math.floor(Number(text));
                                    return (
                                      String(n) === text && n >= 0 && n <= 100
                                    );
                                  }}
                                  classEditing="editing"
                                  value={progress.p || '0'}
                                  propName="message"
                                  editProps={this.rIEInputEditProps}
                                  defaultProps={this.rIEInputEditProps}
                                />
                              )}
                              {progress.time_learn_last &&
                                `- ${progress.time_learn_last}`}
                              {['exercise', 'sco'].indexOf(progress.ntype) !==
                                -1 && (
                                <Link
                                  to={Links.previewTake(
                                    null, // TODO: put take id
                                    node,
                                    {
                                      ...progress,
                                      exam_order: item.order || 1,
                                      exam_type: progress.ntype,
                                    },
                                    item.iid,
                                  )}
                                  className="btn btn-sm"
                                  target="_blank"
                                >
                                  <Icon icon="preview" />
                                  {t1('preview')}
                                </Link>
                              )}
                            </TableRowColumn>
                          ),
                      )}
                    <TableRowColumn>
                      <FlatButton
                        primary
                        icon={<IconMail />}
                        onClick={() =>
                          this.sendMessage([
                            { iid: item.iid, type: 'user', name: item.name },
                          ])
                        }
                      />
                    </TableRowColumn>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default connect()(GroupReport);
