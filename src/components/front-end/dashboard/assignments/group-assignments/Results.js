import React, { Component } from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import { timestampToDateTimeString } from 'common/utils/Date';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import Links from 'routes/links';
import IconButton from 'material-ui/IconButton';
import './Results.scss';

class Results extends Component {
  isDoable = (item) => {
    const startTime = this.getStartTimestampFromItem(item);
    const endTime = this.getEndTimestampFromItem(item);
    const now = new Date().getTime();
    return startTime <= now && now <= endTime;
  };

  hasPassedDeadline = (item) => {
    const endTime = this.getEndTimestampFromItem(item);
    const now = new Date().getTime();
    return now > endTime;
  };

  getStartTimestampFromItem = (item) => {
    const time = item && item.sco && item.sco.start_time;
    if (typeof time === 'undefined') {
      return 0;
    }
    return time * 1000;
  };

  getEndTimestampFromItem = (item) => {
    const time = item && item.sco && item.sco.end_time;
    if (typeof time === 'undefined') {
      return Infinity;
    }
    return time * 1000;
  };

  compareItemToSort = (item, anotherItem) => {
    const itemStartTime = this.getStartTimestampFromItem(item);
    const anotherItemStartTime = this.getStartTimestampFromItem(anotherItem);
    const itemEndTime = this.getEndTimestampFromItem(item);
    const anotherItemEndTime = this.getEndTimestampFromItem(anotherItem);
    const now = new Date().getTime();

    const basicCondition =
      itemEndTime - anotherItemEndTime || itemStartTime - anotherItemStartTime;

    if (itemEndTime < now) {
      if (anotherItemEndTime < now) {
        return basicCondition;
      }
      return 1;
    }

    if (anotherItemEndTime < now) {
      if (itemEndTime < now) {
        return basicCondition;
      }
      return -1;
    }

    return basicCondition;
  };

  cssClass = 'dashboard-assignments-result';

  render() {
    const { items, className } = this.props;
    let sortedItems = Object.assign([], items);
    sortedItems = sortedItems.filter((item) => item);
    sortedItems.sort(this.compareItemToSort);

    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <div className={`${this.cssClass}__table`}>
          <Table selectable={false}>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow displayBorder={false}>
                <TableHeaderColumn title={t1('start_time')}>
                  {t1('start_time')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('end_time')}>
                  {t1('end_time')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('course')}>
                  {t1('course')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('assignment')}>
                  {t1('assignment')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('project')}>
                  {t1('project')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('actions')}>
                  {t1('actions')}
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {sortedItems.map((item, index) => (
                <TableRow
                  key={`${item.iid}-${item.ts}-${item.u && item.u.iid}`}
                  displayBorder={false}
                  className={`${this.cssClass}__item
                        ${
                          this.hasPassedDeadline(item)
                            ? `${this.cssClass}__item--passed-deadline`
                            : ''
                        }
                        ${
                          this.isDoable(item)
                            ? `${this.cssClass}__item--doable`
                            : ''
                        }`}
                >
                  <TableRowColumn
                    title={
                      item.sco &&
                      item.sco.start_time &&
                      timestampToDateTimeString(item.sco.start_time)
                    }
                  >
                    {item.sco &&
                      item.sco.start_time &&
                      timestampToDateTimeString(item.sco.start_time)}
                  </TableRowColumn>
                  <TableRowColumn
                    title={
                      item.sco &&
                      item.sco.end_time &&
                      timestampToDateTimeString(item.sco.end_time)
                    }
                  >
                    {item.sco &&
                      item.sco.end_time &&
                      timestampToDateTimeString(item.sco.end_time)}
                  </TableRowColumn>
                  <TableRowColumn title={item.course && item.course.name}>
                    {item.course && item.course.name}
                  </TableRowColumn>
                  <TableRowColumn title={item.sco && item.sco.name}>
                    {item.sco && item.sco.name}
                  </TableRowColumn>
                  <TableRowColumn title={item.exercise && item.exercise.name}>
                    {item.exercise && item.exercise.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    {this.isDoable(item) && (
                      <IconButton
                        iconClassName="ti-pencil"
                        containerElement={
                          <Link
                            to={Links.learnCourse(
                              item.course,
                              `${item.sco && item.sco.iid}-${item.exercise &&
                                item.exercise.iid}`,
                            )}
                          />
                        }
                        title={t1('go_to_assignment')}
                      />
                    )}
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className={`${this.cssClass}__legends`}>
          <div className={`${this.cssClass}__legends-box`}>
            <h2 className={`${this.cssClass}__legends-title`}>
              {t1('legends')}
            </h2>
            <div className={`${this.cssClass}__legend`}>
              <div
                className={`${this.cssClass}__legend-icon
                  ${this.cssClass}__legend-icon-box
                  ${this.cssClass}__legend-icon-box--doable`}
              />
              <span className={`${this.cssClass}__legend-text`}>
                {t1('you_can_do_these_assignments_now')}
              </span>
            </div>
            <div className={`${this.cssClass}__legend`}>
              <div
                className={`${this.cssClass}__legend-icon
                  ${this.cssClass}__legend-icon-box
                  ${this.cssClass}__legend-icon-box--not-yet`}
              />
              <span className={`${this.cssClass}__legend-text`}>
                {t1('you_cannot_do_these_assignments_yet')}
              </span>
            </div>
            <div className={`${this.cssClass}__legend`}>
              <div
                className={`${this.cssClass}__legend-icon
                  ${this.cssClass}__legend-icon-box
                  ${this.cssClass}__legend-icon-box--passed-deadline`}
              />
              <span className={`${this.cssClass}__legend-text`}>
                {t1('these_assignments_has_already_passed_their_deadline')}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default Results;
