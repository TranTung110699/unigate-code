import React from 'react';
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

import './Results.scss';

class SupporterPerformanceReportResults extends React.Component {
  cssClass = 'admin-transaction-search-results';

  renderOverviewItem = (label, value) => (
    <div className={`${this.cssClass}__overview-item`}>
      <div className={`${this.cssClass}__overview-item-label`}>{label}:</div>
      <div className={`${this.cssClass}__overview-item-value`}>{value}</div>
    </div>
  );

  renderOverviewItems = () => {
    const { objects } = this.props;
    return (
      <div className={`${this.cssClass}__overview-area`}>
        {this.renderOverviewItem(t1('money'), objects.sum.money)}
        {this.renderOverviewItem(t1('vmoney'), objects.sum.vmoney)}
        {this.renderOverviewItem(t1('actual_money'), objects.sum.actual_money)}
        {this.renderOverviewItem(
          t1('actual_vmoney'),
          objects.sum.actual_vmoney,
        )}
      </div>
    );
  };

  render() {
    const { items } = this.props;

    return (
      <div className={this.cssClass}>
        <div className={`${this.cssClass}__title`}>{t1('overview')}</div>

        {this.renderOverviewItems()}

        <div className={`${this.cssClass}__title`}>{t1('detail')}</div>
        <div className="table-result">
          <Table>
            <TableHeader
              displaySelectAll={false}
              enableSelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn title={t1('time')}>
                  {t1('time')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('actor')}>
                  {t1('actor')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('act')}>
                  {t1('act')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('object')}>
                  {t1('object')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('supporter')}>
                  {t1('supporter')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('money')}>
                  {t1('money')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('actual_money')}>
                  {t1('actual_money')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('vmoney')}>
                  {t1('vmoney')}
                </TableHeaderColumn>
                <TableHeaderColumn title={t1('actual_vmoney')}>
                  {t1('actual_vmoney')}
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody displayRowCheckbox={false} showRowHover stripedRows>
              {items &&
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableRowColumn title={item.time}>
                      {item.time}
                    </TableRowColumn>
                    {item.actor ? (
                      <TableRowColumn
                        title={`${item.actor.name} ${
                          item.actor.iid ? `(#${item.actor.iid})` : ''
                        } ${item.actor.mail ? `(${item.actor.mail})` : ''}`}
                      >
                        {item.actor.name}
                      </TableRowColumn>
                    ) : (
                      <TableRowColumn />
                    )}
                    {item.act ? (
                      <TableRowColumn
                        title={`${item.act} ${
                          item.is_topup ? `(${item.context.method})` : ''
                        }`}
                      >
                        {item.act}
                      </TableRowColumn>
                    ) : (
                      <TableRowColumn />
                    )}
                    {item.object && item.object.name ? (
                      <TableRowColumn
                        title={`${item.object.name} ${
                          item.object.iid ? `(#${item.object.iid})` : ''
                        } ${item.object.mail ? `(${item.object.mail})` : ''}`}
                      >
                        {item.object.name}
                      </TableRowColumn>
                    ) : (
                      <TableRowColumn />
                    )}
                    {item.context && item.context.supporter ? (
                      <TableRowColumn
                        title={`${item.context.supporter.name} ${
                          item.context.supporter.iid
                            ? `(#${item.context.supporter.iid})`
                            : ''
                        } ${
                          item.context.supporter.mail
                            ? `(${item.context.supporter.mail})`
                            : ''
                        }`}
                      >
                        {item.context.supporter.name}
                      </TableRowColumn>
                    ) : (
                      <TableRowColumn />
                    )}
                    {[item.am, item.actual_am].map((key) =>
                      key && typeof key.money !== 'undefined' ? (
                        <TableRowColumn title={key.money}>
                          {key.money}
                        </TableRowColumn>
                      ) : (
                        <TableRowColumn />
                      ),
                    )}
                    {[item.am, item.actual_am].map((key) =>
                      key && typeof key.vmoney !== 'undefined' ? (
                        <TableRowColumn title={key.vmoney}>
                          {key.vmoney}
                        </TableRowColumn>
                      ) : (
                        <TableRowColumn />
                      ),
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

SupporterPerformanceReportResults.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()),
  objects: PropTypes.shape(),
};

SupporterPerformanceReportResults.defaultProps = {
  items: [],
  objects: {},
};

export default SupporterPerformanceReportResults;
