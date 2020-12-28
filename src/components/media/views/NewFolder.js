/**
 * Created by Peter Hoang Nguyen on 4/5/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { reduxForm } from 'redux-form';
import Request from 'common/network/http/Request';
import { connect } from 'react-redux';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';

import { onMMDataLoaded, onMMShowAddFolderBox } from '../actions';
import { mediaCreateFolderURL } from '../DefinedUrl';
import Node from '../common/Node';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 05/04/2017
 **/
class NewFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onCreateFolderAction = this.onCreateFolderAction.bind(this);
  }

  onCreateFolderAction(event) {
    const { dispatch, mediaDB, mmFolderForm } = this.props;
    const { currentRoot, currentNode, data } = mediaDB;
    const keyCode = event.which || event.keyCode;
    if (keyCode === 27) {
      dispatch(onMMShowAddFolderBox(false));
      return;
    }
    if (keyCode !== 13) {
      return;
    }

    const relativePathFromRoot = currentNode.relative_path_from_root
      ? currentNode.relative_path_from_root
      : '/';
    const folderName = mmFolderForm.values.folderName;
    const params = {
      newDirName: folderName,
      root: currentRoot.id,
      dir: relativePathFromRoot,
    };
    const newNode = Node.newFolderNode(currentNode, folderName);
    dispatch(onMMShowAddFolderBox(false));
    Request.get(mediaCreateFolderURL, params).then((response) => {
      if (response.success) {
        let presentData = data || [];
        presentData = [newNode].concat(presentData);
        const newCurrentNode = Object.assign({}, currentNode, {
          children: presentData,
        });
        dispatch(
          onMMDataLoaded(
            Object.assign({}, mediaDB, {
              data: presentData,
              currentNode: newCurrentNode,
            }),
          ),
        );
      }
    });
  }

  render() {
    return (
      <TextField
        fullWidth
        onKeyUp={this.onCreateFolderAction}
        hintText={t1('new_folder')}
        floatingLabelText={t1('new_folder')}
        name="folderName"
      />
    );
  }
}

NewFolder.childContextTypes = {
  muiTheme: PropTypes.shape().isRequired,
};
const mapStateToProp = (state) => ({
  listView: state.mm.listView,
  mediaDB: state.mm.mediaDB,
  mmFolderForm: state.form.mmFolderForm,
});

export default connect(mapStateToProp)(
  reduxForm({
    form: 'mmFolderForm',
  })(NewFolder),
);
