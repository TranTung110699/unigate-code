import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1 } from 'translate';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

class Results extends Component {
  render() {
    const { items } = this.props;

    const grades = items[0].number_of_user_by_grade.map(
      (countByGrade) => countByGrade.grade,
    );
    const hasProvince = items[0].province_name;
    const hasDistrict = items[0].district_name;
    const hasSchool = items[0].school_name;

    return (
      <div>
        <Table name="result">
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn title={t1('index')} width="5%">
                {t1('index')}
              </TableHeaderColumn>
              {hasSchool && (
                <TableHeaderColumn title={t1('school_name')}>
                  {t1('school_name')}
                </TableHeaderColumn>
              )}
              {hasDistrict && (
                <TableHeaderColumn title={t1('district')}>
                  {t1('district')}
                </TableHeaderColumn>
              )}
              {hasProvince && (
                <TableHeaderColumn title={t1('city_province')}>
                  {t1('city_province')}
                </TableHeaderColumn>
              )}
              {grades.map((grade) => (
                <TableHeaderColumn
                  key={grade}
                  title={`${t1('grade')} ${grade}`}
                >
                  {`${t1('grade')} ${grade}`}
                </TableHeaderColumn>
              ))}
              <TableHeaderColumn title={t1('total')}>
                {t1('total')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn title={item.index} width="5%">
                    {item.index}
                  </TableRowColumn>
                  {hasSchool && (
                    <TableRowColumn title={item.school_name}>
                      {item.school_name}
                    </TableRowColumn>
                  )}
                  {hasDistrict && (
                    <TableRowColumn title={item.district_name}>
                      {item.district_name}
                    </TableRowColumn>
                  )}
                  {hasProvince && (
                    <TableRowColumn title={item.province_name}>
                      {item.province_name}
                    </TableRowColumn>
                  )}
                  {grades.map((grade) => {
                    const countByGrade = item.number_of_user_by_grade.find(
                      (tmp) => tmp.grade === grade,
                    );
                    return (
                      <TableRowColumn
                        key={countByGrade.grade}
                        title={countByGrade.count}
                      >
                        {countByGrade.count}
                      </TableRowColumn>
                    );
                  })}
                  <TableRowColumn title={item.total}>
                    {item.total}
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
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default connect()(Results);
