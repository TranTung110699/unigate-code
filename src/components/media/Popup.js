import React from 'react';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import DialogHeader from 'schema-form/elements/custom-popup/DialogHeader';

import Media from './Media';
import { openMediaManagerDialog } from './actions';
import ImageDetail from './views/details/ImageDetail';

const customContentStyle = {
  width: '80%',
  maxWidth: 'none',
};

class MediaPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openDetail: false };
    this.closeMediaPopup = this.closeMediaPopup.bind(this);
  }

  closeMediaPopup() {
    const { dispatch } = this.props;
    dispatch(openMediaManagerDialog(false));
  }

  style = {
    zIndex: 2000,
  };

  render() {
    const { openMediaDialog, isViewing } = this.props;

    return (
      <div>
        <DialogHeader
          closeOn={this.closeMediaPopup}
          contentStyle={customContentStyle}
          className="ui-media-popup"
          style={this.style}
          bodyClassName="dialog-content-padding0"
          onRequestClose={this.closeMediaPopup}
          autoScrollBodyContent={false}
          title={t1('file_manager_(deprecated_version)')}
          open={openMediaDialog}
        >
          {!isViewing ? <Media /> : <ImageDetail />}
        </DialogHeader>
      </div>
    );
  }
}

const populateStateToProps = (state) => {
  const isLoginTabActivated = state.authDialog.isLoginTabActivated;
  return {
    isLoginTabActivated,
    openMediaDialog: state.mm.openMediaDialog,
    isViewing: state.mm.isViewing,
  };
};

export default connect(populateStateToProps)(MediaPopup);
