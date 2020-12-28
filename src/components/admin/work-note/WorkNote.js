import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { TableRow, TableRowColumn } from 'components/common/mui/Table';
import { getUrl } from 'routes/links/common';
import Icon from 'components/common/Icon';

class WorkNote extends Component {
  render() {
    const { workNote, style } = this.props;
    const tableRow = {
      display: 'table',
      width: '100%',
      ...style,
    };
    const width = {
      iid: '10%',
      name: '15%',
      action: '30%',
      create_at: '20%',
      link: '10%',
    };
    return (
      <div>
        {workNote && (
          <TableRow key={workNote.id} showRowHover style={tableRow}>
            <TableRowColumn width={width.iid}>{workNote.iid}</TableRowColumn>
            <TableRowColumn
              width={width.name}
              title={
                workNote.from &&
                workNote.from.user &&
                t1(workNote.from.user.name)
              }
            >
              {workNote.from &&
                workNote.from.user &&
                t1(workNote.from.user.name)}
            </TableRowColumn>
            <TableRowColumn
              width={width.action}
              title={workNote.msg && t1(workNote.msg)}
            >
              {workNote.msg && t1(workNote.msg)}
            </TableRowColumn>
            <TableRowColumn
              width={width.name}
              title={
                workNote.to && workNote.to.user && t1(workNote.to.user.name)
              }
            >
              {workNote.to && workNote.to.user && t1(workNote.to.user.name)}
            </TableRowColumn>
            <TableRowColumn
              width={width.create_at}
              title={t1(workNote.create_at)}
            >
              {workNote.create_at}
            </TableRowColumn>
            <TableRowColumn width={width.link}>
              <Link to={getUrl(workNote.url_detail, workNote)}>
                <Icon icon="exit-to-app" />
              </Link>
            </TableRowColumn>
          </TableRow>
        )}
      </div>
    );
  }
}

WorkNote.propTypes = {
  workNote: PropTypes.shape({}),
  style: PropTypes.shape({}),
};

WorkNote.defaultProps = {
  workNote: null,
  style: null,
};

export default WorkNote;
