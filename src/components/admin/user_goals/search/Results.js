import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t, t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { timestampToDateString } from 'common/utils/Date';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import UserGoal from 'components/admin/user_goal';
import { Card, CardHeader, CardText } from 'material-ui/Card';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedProgress: {},
    };
  }

  userGoalProgressChartWrapperStyle = {
    textAlign: 'center',
    padding: 20,
  };

  widths = {
    goal: '10%',
    zm: '10%',
    deadline: '10%',
    progress: '60%',
    action: '10%',
  };

  setProgressCardExpanded = (iid, value) => {
    this.setState({
      expandedProgress: {
        ...this.state.expandedProgress,
        [iid]: value,
      },
    });
  };

  isProgressCardExpanded = (iid) => {
    const { expandedProgress } = this.state;
    return !!expandedProgress[iid];
  };

  expandAllProgress = () => {
    let newExpandedProgress = {};
    this.getAllItemIid().forEach((iid) => {
      newExpandedProgress = {
        ...newExpandedProgress,
        [iid]: true,
      };
    });
    this.setState({
      expandedProgress: newExpandedProgress,
    });
  };

  collapseAllProgress = () => {
    this.setState({
      expandedProgress: {},
    });
  };

  getAllItemIid = () => {
    const { items } = this.props;
    return (
      (items && items.map((item) => item && item.iid).filter(Boolean)) || []
    );
  };

  isAllProgressChartExpanded = () =>
    this.getAllItemIid().every((iid) => this.isProgressCardExpanded(iid));

  render() {
    const { items, searchFormId /*, node*/ } = this.props;

    return (
      <div className="table-result">
        <Table selectable={false}>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn width={this.widths.goal} title={t1('goal')}>
                {t1('goal')}
              </TableHeaderColumn>
              <TableHeaderColumn width={this.widths.zm} title={t1('zm')}>
                {t1('zm')}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={this.widths.deadline}
                title={t1('deadline')}
              >
                {t1('deadline')}
              </TableHeaderColumn>
              <TableHeaderColumn
                width={this.widths.progress}
                title={t1('progress')}
              >
                {t1('progress')}
                <a
                  style={{
                    padding: '0 10px',
                    cursor: 'pointer',
                  }}
                  onClick={
                    this.isAllProgressChartExpanded()
                      ? this.collapseAllProgress
                      : this.expandAllProgress
                  }
                >
                  (
                  {this.isAllProgressChartExpanded()
                    ? t('hide_all')
                    : t('show_all')}
                  )
                </a>
              </TableHeaderColumn>
              <TableHeaderColumn
                width={this.widths.action}
                title={t1('action')}
              >
                {t1('action')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false}>
            {items &&
              items.map(
                (item) =>
                  item && [
                    <TableRow key={item.id}>
                      <TableRowColumn width={this.widths.goal}>
                        {item.goal && item.goal.name}
                      </TableRowColumn>
                      <TableRowColumn width={this.widths.zm}>
                        {item.zm && item.zm.name}
                      </TableRowColumn>
                      <TableRowColumn width={this.widths.deadline}>
                        {item.deadline && timestampToDateString(item.deadline)}
                      </TableRowColumn>
                      <TableRowColumn
                        width={this.widths.progress}
                        style={{ padding: '0 8px' }}
                      >
                        <Card
                          style={{ boxShadow: 'none' }}
                          expanded={this.isProgressCardExpanded(item.iid)}
                          onExpandChange={(newExpandedState) =>
                            this.setProgressCardExpanded(
                              item.iid,
                              newExpandedState,
                            )
                          }
                        >
                          <CardHeader
                            subtitle={
                              <a>
                                {this.isProgressCardExpanded(item.iid)
                                  ? t1('hide')
                                  : t1('show')}
                              </a>
                            }
                            actAsExpander
                          />
                          <CardText expandable>
                            <div style={this.userGoalProgressChartWrapperStyle}>
                              <UserGoal node={item} />
                            </div>
                          </CardText>
                        </Card>
                      </TableRowColumn>
                      <TableRowColumn width={this.widths.action}>
                        <DeleteItem
                          title={t1('delete')}
                          formid={searchFormId}
                          ntype={'user_goal'}
                          itemId={item.id}
                        />
                      </TableRowColumn>
                    </TableRow>,
                  ],
              )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  searchFormId: PropTypes.string,
};

Results.defaultProps = {
  items: [],
  searchFormId: '',
};

export default connect()(Results);
