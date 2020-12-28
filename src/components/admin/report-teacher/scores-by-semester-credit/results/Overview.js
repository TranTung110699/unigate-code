import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { pointSpectrumConfigSelector } from 'components/admin/skill/skill/utils';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import './Overview.scss';

class Results extends Component {
  cssClass = 'admin-report-scores-by-semester-credit-result-overview';

  modifyItems = (items) => {
    if (!Array.isArray(items)) {
      return items;
    }

    let nRowSemester = 0;
    let modifiedItems = [];

    for (let i = items.length - 1; i >= 0; i -= 1) {
      const item = items[i];
      if (item) {
        const nextItem = items[i - 1];

        nRowSemester += 1;

        let newItem = item;

        if (
          String(item.semester && item.semester.iid) !==
          String(nextItem && nextItem.semester && nextItem.semester.iid)
        ) {
          newItem = {
            ...newItem,
            isStartRowOfSemester: true,
            nRowSemester,
          };
          nRowSemester = 0;
        }

        modifiedItems = [newItem].concat(modifiedItems);
      }
    }

    return modifiedItems;
  };

  render() {
    const { items, className } = this.props;
    const modifiedItems = this.modifyItems(items);
    const componentClassName = `${className || ''} ${
      this.cssClass
    } table-result`;

    return (
      <div className={componentClassName}>
        <Table className={`${this.cssClass}__table`} selectable={false}>
          <TableHeader
            className={`${this.cssClass}__table-header`}
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>{t1('semester')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('student')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('score')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('performance')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            className={`${this.cssClass}__table-body`}
            displayRowCheckbox={false}
          >
            {Array.isArray(modifiedItems) &&
              modifiedItems.filter(Boolean).map((item) => {
                if (Array.isArray(item.progresses)) {
                  return (
                    <TableRow key={`${item.id}`}>
                      {item.isStartRowOfSemester && (
                        <TableRowColumn rowSpan={item.nRowSemester}>
                          {item.semester && item.semester.name}
                        </TableRowColumn>
                      )}
                      <TableRowColumn key="user_name" rowSpan={item.nRowUser}>
                        {item.user && item.user.name}
                      </TableRowColumn>
                      ,
                      <TableRowColumn
                        key="user_progress"
                        rowSpan={item.nRowUser}
                      >
                        {item.progress}
                      </TableRowColumn>
                      ,
                      <TableRowColumn
                        key="user_point_spectrum"
                        rowSpan={item.nRowUser}
                      >
                        {item.point_spectrum_info &&
                          item.point_spectrum_info.name &&
                          t1(item.point_spectrum_info.name)}
                      </TableRowColumn>
                      ,
                    </TableRow>
                  );
                }
              })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pointSpectrum: pointSpectrumConfigSelector(state),
  };
};

Results.propTypes = {
  className: PropTypes.string,
};

Results.defaultProps = {
  className: '',
};

export default connect(mapStateToProps)(Results);
