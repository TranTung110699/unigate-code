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
import { Link } from 'react-router-dom';
import Avatar from 'components/common/avatar';
import { getUrl } from 'routes/links/common';

class Results extends Component {
  render() {
    const { items } = this.props;
    const width = {
      stt: '8%',
      info: '20%',
      code: '20%',
      phone: '15%',
      birthday: '15%',
      class: '15%',
    };

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn width={width.stt} title={t1('stt')}>
                {t1('stt')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.info} title={t1('info')}>
                {t1('info')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.code} title={t1('code')}>
                {t1('code')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.phone} title={t1('phone')}>
                {t1('phone')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.birthday} title={t1('birthday')}>
                {t1('birthday')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.class} title={t1('class')}>
                {t1('class')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn width={width.stt} title={item.stt}>
                    {item.index}
                  </TableRowColumn>
                  <TableRowColumn width={width.info}>
                    <Link to={getUrl('admin_view_student', item)}>
                      <Avatar user={item} />
                      &nbsp; {item.name}
                    </Link>
                  </TableRowColumn>
                  <TableRowColumn width={width.code} title={item.code}>
                    {item.code}
                  </TableRowColumn>
                  <TableRowColumn width={width.phone} title={item.phone}>
                    {item.phone}
                  </TableRowColumn>
                  <TableRowColumn width={width.birthday}>
                    {item.birthday}
                  </TableRowColumn>
                  <TableRowColumn width={width.class}>
                    {item.class}
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
  items: PropTypes.arrayOf(PropTypes.object),
};

Results.defaultProps = {
  items: [],
};

const mapStateToProps = (state) => {
  const domainInfo = state.domainInfo;
  return {
    domain: domainInfo && domainInfo.domain,
  };
};

export default connect(mapStateToProps)(Results);
