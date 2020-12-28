import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openMediaManagerDialog, pushQuillJS } from 'components/media/actions';
import { onMMShowAddFolderBox, viewMediaDetail } from '../actions';
import ListItem from './ListView';
import GridItem from './GridView';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 04/04/2017
 **/
class ListMediaContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onCreateFolderAction = this.onCreateFolderAction.bind(this);
    this.onViewDetailFile = this.onViewDetailFile.bind(this);
  }

  onCreateFolderAction(event) {
    const { dispatch } = this.props;
    const keyCode = event.which || event.keyCode;
    if (keyCode === 27) {
      dispatch(onMMShowAddFolderBox(false));
    }
    if (keyCode === 13) {
      dispatch(onMMShowAddFolderBox(false));
    }
  }

  onViewDetailFile(items) {
    const type = items.type;
    if (!type || (type && type.toLowerCase() === 'dir')) {
      return;
    }
    const { dispatch, target, currentRichText } = this.props;
    if (
      type === 'image' &&
      currentRichText &&
      Object.keys(currentRichText).length
    ) {
      const range = currentRichText.selection;
      const value = items.path;
      if (value) {
        currentRichText.insertEmbed(range.index, 'image', value);
        dispatch(openMediaManagerDialog(false));
        dispatch(pushQuillJS(null));
        return;
      }
    }

    if (target.element && target.onSelectAction) {
      target.onSelectAction(items.path);
      return;
    }

    dispatch(
      viewMediaDetail({
        viewing: true,
        data: items,
      }),
    );
  }

  render() {
    const { listView, onOpenFolder, onGoToBackFolder } = this.props;
    const listViewClass = listView ? 'list-view' : 'grid-view';

    const actionList = {
      onCreateFolderAction: this.onCreateFolderAction,
      onGoToBackFolder,
      openMediaMenuContext: this.openMediaMenuContext,
      onOpenFolder,
      onViewDetailFile: this.onViewDetailFile,
    };

    return (
      <div className={listViewClass}>
        {listView ? <ListItem {...actionList} /> : <GridItem {...actionList} />}
      </div>
    );
  }
}

const mapStateToProp = (state) => ({
  listView: state.mm.listView,
  target: state.mm.target,
  currentRichText: state.mm.currentRichText,
});
ListMediaContainer.childContextTypes = {
  muiTheme: PropTypes.shape().isRequired,
};

export default connect(mapStateToProp)(ListMediaContainer);
