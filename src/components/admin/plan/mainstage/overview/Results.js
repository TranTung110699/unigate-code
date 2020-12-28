/**
 * Created by hungvo on 19/04/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HorizontalScrolling from 'components/common/html/horizontal-scrolling';
import { t1 } from 'translate';
import { timestampToDateString } from 'common/utils/Date';
import { formatDataDrawTableRender } from 'common/utils/Data';
import getLodash from 'lodash.get';

class Results extends Component {
  getItemsRender = () => {
    const { items } = this.props;
    if (!items || !items.length) {
      return [];
    }
    return formatDataDrawTableRender(items);
  };

  render() {
    const items = this.getItemsRender();

    return (
      <div>
        <h3>{t1('teaching_plan')}</h3>
        {Array.isArray(items) && items.length > 0 && (
          <HorizontalScrolling>
            <table
              style={{ width: '100%' }}
              className="table table-border whitebox"
            >
              <thead>
                <tr>
                  <th rowSpan="2">{t1('ico')}</th>
                  <th rowSpan="2">{t1('major')}</th>
                  {/*
              <th width={width.mode} rowSpan="2">{t1('training_mode')}</th>
              <th width={width.level} rowSpan="2">{t1('training_level')}</th>
                */}
                  <th rowSpan="2">{t1('semester')}</th>
                  <th rowSpan="2">{t1('credit')}</th>
                  <th colSpan="4">{t1('classes')}</th>
                </tr>
                <tr>
                  <th>{t1('name')}</th>
                  <th>{t1('start_date')}</th>
                  <th>{t1('end_date')}</th>
                  <th>{t1('max_students')}</th>
                </tr>
              </thead>
              <tbody displayRowCheckbox={false} showRowHover>
                {items.map((item) => (
                  <tr key={item.id || item.iid}>
                    {item.colData && item.colData[0] && (
                      <td rowSpan={(item.rowSpan && item.rowSpan[0]) || 1}>
                        {getLodash(item, 'colData[0].name')}
                        {getLodash(item, 'colData[0].code') && (
                          <span className="text-muted">
                            {getLodash(item, 'colData[0].code')}
                          </span>
                        )}
                      </td>
                    )}
                    {item.colData && item.colData[1] && (
                      <td rowSpan={(item.rowSpan && item.rowSpan[1]) || 1}>
                        {getLodash(item, 'colData[1].name')}
                        {getLodash(item, 'colData[1].code') && (
                          <span className="text-muted">
                            ( #{getLodash(item, 'colData[1].code')})
                          </span>
                        )}
                        <br />
                        {getLodash(item, 'colData[2]')} -{' '}
                        {getLodash(item, 'colData[3]')}
                      </td>
                    )}
                    {/*
                  {
                    item.colData && item.colData[2] &&
                    <td rowSpan={(item.rowSpan && item.rowSpan[2]) || 1} width={width.mode}>
                      {item.colData && item.colData[2] && (item.colData[2].name)}
                    </td>
                  }
                  {
                    item.colData && item.colData[3] &&
                    <td rowSpan={(item.rowSpan && item.rowSpan[3]) || 1} width={width.level}>
                      {item.colData && item.colData[3] && (item.colData[3].name)}
                    </td>
                  }
                    */}

                    {item.colData && item.colData[4] && (
                      <td rowSpan={(item.rowSpan && item.rowSpan[4]) || 1}>
                        {getLodash(item, 'colData[4].name')}
                        <br />
                        {getLodash(item, 'colData[4]') &&
                          `${getLodash(
                            item,
                            'colData[4].start_month',
                            '_',
                          )}/${getLodash(
                            item,
                            'colData[4].start_year',
                            '_',
                          )} - ${getLodash(
                            item,
                            'colData[4].end_month',
                            '_',
                          )}/${getLodash(item, 'colData[4].end_year', '_')}`}
                      </td>
                    )}
                    {item.colData && item.colData[5] && (
                      <td rowSpan={(item.rowSpan && item.rowSpan[5]) || 1}>
                        {item.colData && item.colData[5] && (
                          <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href={`/admin/credit/${item.colData[5].iid}`}
                            title={`${item.colData[5].code}-${
                              item.colData[5].name
                            }`}
                          >
                            {item.colData[5].code}
                          </a>
                        )}
                      </td>
                    )}
                    <td>
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={`/admin/course/${item.iid}`}
                        title={`${item.iid}-${item.name}`}
                      >
                        {item && item.name}
                      </a>
                    </td>
                    <td>
                      <p>
                        {item &&
                          item.start_date &&
                          timestampToDateString(item.start_date)}
                      </p>
                    </td>
                    <td>
                      <p>
                        {item &&
                          item.end_date &&
                          timestampToDateString(item.end_date)}
                      </p>
                    </td>
                    <td className="text-center">
                      {(item && item.max_student) || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </HorizontalScrolling>
        )}
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
