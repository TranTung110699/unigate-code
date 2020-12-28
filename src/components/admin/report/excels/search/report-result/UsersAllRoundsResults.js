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

    const rounds = items[0].rounds.map((round) => ({
      code: round.code,
      name: round.name,
    }));

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
              <TableHeaderColumn title={t1('city_province')}>
                {t1('city_province')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('registered')}>
                {t1('registered')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('activated')}>
                {t1('activated')}
              </TableHeaderColumn>
              {rounds.map((round) =>
                ['in', 'take'].map((verb) => (
                  <TableHeaderColumn title={`${t1(verb)} ${round.name}`}>
                    {`${t1(verb)} ${round.name}`}
                  </TableHeaderColumn>
                )),
              )}
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn title={item.index} width="5%">
                    {item.index}
                  </TableRowColumn>
                  <TableRowColumn title={item.province_name}>
                    {item.province_name}
                  </TableRowColumn>
                  <TableRowColumn title={item.registered}>
                    {item.registered}
                  </TableRowColumn>
                  <TableRowColumn title={item.activated}>
                    {item.activated}
                  </TableRowColumn>
                  {rounds.map((round) => {
                    const tmp = item.rounds.find(
                      (itemRound) => itemRound.code === round.code,
                    );
                    return ['in', 'take'].map((verb) => (
                      <TableRowColumn title={tmp[verb]}>
                        {tmp[verb]}
                      </TableRowColumn>
                    ));
                  })}
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
