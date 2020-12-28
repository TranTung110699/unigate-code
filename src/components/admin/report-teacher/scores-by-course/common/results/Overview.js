import React, { Component } from 'react';
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

class Results extends Component {
  render() {
    const { items, pointSpectrum } = this.props;
    const filteredPointSpectrum =
      Array.isArray(pointSpectrum) && pointSpectrum.filter((ps) => ps && ps.id);

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn rowSpan="2">{t1('course')}</TableHeaderColumn>
              <TableHeaderColumn rowSpan="2">{t1('passed')}</TableHeaderColumn>
              <TableHeaderColumn rowSpan="2">{t1('failed')}</TableHeaderColumn>
              {Array.isArray(filteredPointSpectrum) && (
                <TableHeaderColumn colSpan={filteredPointSpectrum.length}>
                  {t1('performance')}
                </TableHeaderColumn>
              )}
            </TableRow>
            <TableRow>
              {Array.isArray(filteredPointSpectrum) &&
                filteredPointSpectrum.map((ps) => (
                  <TableHeaderColumn key={ps.id}>
                    {t1(ps.name)}
                  </TableHeaderColumn>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover>
            {Array.isArray(items) &&
              items
                .filter((item) => item && item.course && item.course.iid)
                .map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableRowColumn>{item.course.name}</TableRowColumn>
                      <TableRowColumn>{item.passed}</TableRowColumn>
                      <TableRowColumn>{item.failed}</TableRowColumn>
                      {Array.isArray(pointSpectrum) &&
                        pointSpectrum
                          .filter((ps) => ps && ps.id)
                          .map((ps) => (
                            <TableRowColumn key={ps.id}>
                              {item[ps.id]}
                            </TableRowColumn>
                          ))}
                    </TableRow>
                  );
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

export default connect(mapStateToProps)(Results);
