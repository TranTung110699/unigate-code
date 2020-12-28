import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'components/common/mui/Table';
import WorkNote from './WorkNote';
import './stylesheet.scss';

class WorkNotes extends Component {
  cssClass = 'table-work-note';

  getStripedStyle(index) {
    return {
      backgroundColor: index % 2 ? 'rgba(127, 221, 233, 0.4)' : 'white',
    };
  }

  render() {
    const { items } = this.props;
    const tableRow = {
      display: 'table',
      width: '100%',
    };
    const width = {
      iid: '10%',
      name: '15%',
      action: '30%',
      create_at: '20%',
      link: '10%',
    };
    return (
      <div className={`table-result ${this.cssClass}`}>
        {(!items || items.length === 0) && (
          <div>{t1('you_have_no_work_note')}</div>
        )}
        {items && (
          <Table>
            <TableHeader
              displaySelectAll={false}
              enableSelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow style={tableRow}>
                <TableHeaderColumn width={width.iid} title={t1('iid')}>
                  {t1('code')} (<span className="text-muted">{t1('iid')}</span>)
                </TableHeaderColumn>
                <TableHeaderColumn width={width.name} title={t1('requester')}>
                  {t1('requester')}
                </TableHeaderColumn>
                <TableHeaderColumn width={width.action} title={t1('message')}>
                  {t1('message')}
                </TableHeaderColumn>
                <TableHeaderColumn width={width.name} title={t1('receiver')}>
                  {t1('receiver')}
                </TableHeaderColumn>
                <TableHeaderColumn
                  width={width.create_at}
                  title={t1('create_at')}
                >
                  {t1('create_at')}
                </TableHeaderColumn>
                <TableHeaderColumn width={width.link} title={t1('link_detail')}>
                  {t1('link_detail')}
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover>
              {items.map((workNote, index) => (
                <WorkNote
                  style={{
                    padding: '5px 20px',
                    height: 25,
                    ...this.getStripedStyle(index),
                  }}
                  key={`work-note-${index}`}
                  workNote={workNote}
                  index={index}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const keyState = 'work-note';
  return {
    keyState,
    workNotes: state.dataApiResults[keyState],
  };
};

WorkNotes.propTypes = {
  items: PropTypes.shape,
  showRowHover: PropTypes.bool,
};

WorkNotes.defaultProps = {
  items: [],
  showRowHover: true,
};
export default connect(mapStateToProps)(WorkNotes);
