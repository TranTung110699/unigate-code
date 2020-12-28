/**
 * Created by Peter Hoang Nguyen on 4/4/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Node from '../common/Node';
import NewFolder from './NewFolder';
import { setMediaMenuContextState } from '../actions';
import MediaContextMenu from '../controls/ContextMenu';

class GridItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openMediaContextMenu = this.openMediaContextMenu.bind(this);
  }

  openMediaContextMenu(event, row) {
    // This prevents ghost click.
    const { dispatch } = this.props;
    event.preventDefault();
    this.setState({
      mediaNode: row,
      anchorEl: event.currentTarget,
    });
    dispatch(setMediaMenuContextState(true));
  }

  render() {
    const {
      mediaDB,
      isAddingFolder,
      onCreateFolderAction,
      onOpenFolder,
      onGoToBackFolder,
    } = this.props;
    const items = mediaDB && mediaDB.data ? mediaDB.data : [];
    return (
      <div>
        <ul className="mm-file-view-grid">
          <li className={isAddingFolder ? '' : 'hidden'}>
            <div className="icon-grid icon-grid-input">
              <div className="outer-center-box ">
                <div className="middle-center-box">
                  <div className="inner-center-box text-center">
                    <i
                      className={Node.generateNodeIconClass({ type: 'dir' })}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="icon-grid icon-grid-input">
              <div className="outer-center-box ">
                <div className="middle-center-box">
                  <div className="inner-center-box text-center">
                    <NewFolder onCreateFolderAction={onCreateFolderAction} />
                  </div>
                </div>
              </div>
            </div>
          </li>

          {items &&
            items.map((item) => (
              <li
                key={item.id}
                onDoubleClick={() => {
                  onOpenFolder(item);
                }}
                onContextMenu={(event) => {
                  this.openMediaContextMenu(event, item);
                }}
              >
                <div className="icon-grid">
                  <div className="outer-center-box ">
                    <div className="middle-center-box">
                      <div className="inner-center-box text-center">
                        <i
                          className={Node.generateNodeIconClass(item)}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mm-file-name-grid center-block">
                  {item.name}
                </div>
              </li>
            ))}
        </ul>
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

GridItem.childContextTypes = {
  muiTheme: PropTypes.shape().isRequired,
};

const mapStateToProp = (state) => ({
  isAddingFolder: state.mm.isAddingFolder,
  mediaDB: state.mm.mediaDB,
});
export default connect(mapStateToProp)(GridItem);
