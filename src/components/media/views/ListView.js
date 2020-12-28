/**
 * Created by Peter Hoang Nguyen on 4/4/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import {
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import Table from 'components/common/table';
import Node from '../common/Node';
import { setMediaMenuContextState } from '../actions';
import NewFolder from './NewFolder';
import MediaContextMenu from '../controls/ContextMenu';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 04/04/2017
 **/
class ListItem extends React.Component {
  tableHeaderColumnStyle = { textAlign: 'center' };

  constructor(props) {
    super(props);
    this.state = {};
    this.openMediaContextMenu = this.openMediaContextMenu.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  openMediaContextMenu(event, row) {
    // This prevents ghost click.
    const { dispatch } = this.props;

    this.setState({
      mediaNode: row,
      anchorEl: event.currentTarget,
    });
    dispatch(setMediaMenuContextState(true));
  }

  onPageChange(pageNumber, itemsPerPage) {
    // console.log('pageNumber: ', pageNumber, 'itemsPerPage', itemsPerPage);
  }

  render() {
    const {
      mediaDB,
      isAddingFolder,
      onCreateFolderAction,
      onOpenFolder,
      onGoToBackFolder,
      onViewDetailFile,
    } = this.props;
    const name = t1('name');
    const size = t1('size');
    const type = t1('type');
    const items = mediaDB && mediaDB.data ? mediaDB.data : [];

    return (
      <div>
        <Table
          height="380px"
          selectable
          multiSelectable
          total={100}
          onPageChange={this.onPageChange}
        >
          <TableHeader displaySelectAll={false} enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn
                className="mm-list-row-file-name"
                tooltip="The ID"
              >
                {name}
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">{size}</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">{type}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox showRowHover stripedRows>
            <TableRow
              selectable={false}
              className={isAddingFolder ? '' : 'hidden'}
            >
              <TableHeaderColumn
                colSpan="3"
                tooltip="Super Header"
                style={this.tableHeaderColumnStyle}
              >
                <NewFolder onCreateFolderAction={onCreateFolderAction} />
              </TableHeaderColumn>
            </TableRow>
            {items.map((row) => (
              <TableRow key={row.id} selected={row.selected}>
                <TableRowColumn
                  className="mm-list-row-file-name"
                  onDoubleClick={() => {
                    onOpenFolder(row);
                    onViewDetailFile(row);
                  }}
                >
                  <div
                    className="menu-context"
                    onContextMenu={(event) => {
                      this.openMediaContextMenu(event, row);
                    }}
                  >
                    <span className="mm-file-icon">
                      <i
                        className={Node.generateNodeIconClass(row)}
                        aria-hidden="true"
                      />
                    </span>

                    <span className="mm-file-name">{row.name}</span>
                  </div>
                </TableRowColumn>
                <TableRowColumn
                  onContextMenu={(event) => {
                    this.openMediaContextMenu(event, row);
                  }}
                >
                  {row.size}
                </TableRowColumn>
                <TableRowColumn
                  onContextMenu={(event) => {
                    this.openMediaContextMenu(event, row);
                  }}
                >
                  {row.type}
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <MediaContextMenu
          mediaNode={this.state.mediaNode}
          onOpenFolder={onOpenFolder}
          onGoToBackFolder={onGoToBackFolder}
          anchorEl={this.state.anchorEl}
        />
      </div>
    );
  }
}

ListItem.childContextTypes = {
  muiTheme: PropTypes.shape().isRequired,
};

const mapStateToProp = (state) => ({
  isAddingFolder: state.mm.isAddingFolder,
  mediaDB: state.mm.mediaDB,
});
export default connect(mapStateToProp)(ListItem);
