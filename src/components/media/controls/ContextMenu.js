/**
 * Created by Peter Hoang Nguyen on 4/7/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import { setMediaMenuContextState } from '../actions';
import '../stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 07/04/2017
 **/
class ContextMenu extends React.Component {
  anchorOrigin = { horizontal: 'left', vertical: 'bottom' };
  targetOrigin = { horizontal: 'left', vertical: 'top' };

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    const { currentNode, openFolder, dispatch } = this.props;
    let relativePathFromRoot = currentNode.relative_path_from_root;
    if (!relativePathFromRoot) {
      return;
    }

    while (relativePathFromRoot[relativePathFromRoot.length - 1] === '/') {
      relativePathFromRoot = relativePathFromRoot.substring(
        0,
        relativePathFromRoot.length - 2,
      );
    }
    relativePathFromRoot = relativePathFromRoot.substring(
      0,
      relativePathFromRoot.lastIndexOf('/'),
    );

    openFolder({ relative_path_from_root: relativePathFromRoot });
    dispatch(setMediaMenuContextState(false));
  }

  render() {
    const {
      anchorEl,
      mediaMenuContextState,
      mediaNode,
      onOpenFolder,
      dispatch,
      currentNode,
      onGoToBackFolder,
    } = this.props;

    const isFolder =
      mediaNode && mediaNode.type && mediaNode.type.toLowerCase() === 'dir';
    const showBackControl =
      currentNode &&
      currentNode.relative_path_from_root &&
      currentNode.relative_path_from_root !== '/';
    return (
      <Popover
        open={mediaMenuContextState}
        anchorEl={anchorEl}
        className="mm-context-menu"
        anchorOrigin={this.anchorOrigin}
        targetOrigin={this.targetOrigin}
        onRequestClose={() => {
          dispatch(setMediaMenuContextState(false));
        }}
      >
        <Menu>
          {isFolder && (
            <MenuItem
              primaryText={t1('open_this_folder')}
              onTouchTap={() => {
                onOpenFolder(mediaNode);
                dispatch(setMediaMenuContextState(false));
              }}
            />
          )}

          {showBackControl && (
            <MenuItem
              primaryText={t1('"back_to')}
              onTouchTap={onGoToBackFolder}
            />
          )}
          {mediaNode && <MenuItem primaryText={t1('delete_this_item')} />}
          {mediaNode && <MenuItem primaryText={t1('edit')} />}
        </Menu>
      </Popover>
    );
  }
}

ContextMenu.childContextTypes = {
  muiTheme: PropTypes.shape().isRequired,
};
const populateStateToProp = (state) => ({
  mediaMenuContextState: state.mm.mediaMenuContextState,
  currentNode: state.mm.mediaDB.currentNode,
});
export default connect(populateStateToProp)(ContextMenu);
