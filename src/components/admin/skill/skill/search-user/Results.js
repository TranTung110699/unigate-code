import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import SkillReport from 'components/admin/skill/skill/report';
import { timestampToDateTimeString } from 'common/utils/Date';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import actions from 'actions/node/creators';

class Results extends Component {
  skillReport = (item) => {
    const { node, dispatch } = this.props;
    const contentDialog = (
      <SkillReport userIid={item && item.iid} skillIid={node && node.iid} />
    );
    const optionsProperties = {
      handleClose: true,

      title: t1('user_%s:_report_skill_%s', [
        item && item.name,
        node && node.name,
      ]),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { items } = this.props;
    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn title={t1('iid')}>
                {t1('iid')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('name')}>
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('email')}>
                {t1('email')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('progress')}>
                {t1('progress')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('total_time_spent')}>
                {t1('total_time_spent(seconds)')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('time_learn_last')}>
                {t1('time_learn_last')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('action')}>
                {t1('action')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id} selected={item.selected}>
                  <TableRowColumn>{item.iid}</TableRowColumn>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>{item.mail}</TableRowColumn>
                  <TableRowColumn>
                    {(item.progress && item.progress.p) || 0}
                  </TableRowColumn>
                  <TableRowColumn>
                    {(item.progress && item.progress.total_time_spent) || 0}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.progress &&
                      item.progress.time_learn_last &&
                      timestampToDateTimeString(
                        item.progress.time_learn_last * 1000,
                      )}
                  </TableRowColumn>
                  <TableRowColumn>
                    <IconButton
                      title={t1('report')}
                      iconClassName="mi mi-remove-red-eye"
                      onClick={() => this.skillReport(item)}
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Results.propTypes = {
  form: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};

Results.defaultProps = {
  form: '',
};

export default connect()(Results);
