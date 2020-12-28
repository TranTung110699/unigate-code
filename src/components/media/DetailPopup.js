/**
 * Created by Peter Hoang Nguyen on 4/1/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import DialogNoHeader from 'schema-form/elements/custom-popup/DialogNoHeader';

import './stylesheet.scss';
import { viewMediaDetail } from './actions';
import MediaDetail from './views/details/MediaDetail';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 01/04/2017
 **/
const customContentStyle = {
  width: '700px',
  height: '450px',
};

class DetailPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openDetail: false };
    this.closeMediaPopup = this.closeMediaPopup.bind(this);
  }

  closeMediaPopup() {
    const { dispatch } = this.props;
    dispatch(
      viewMediaDetail({
        viewing: false,
      }),
    );
  }

  render() {
    let { viewDetailMedia } = this.props;
    viewDetailMedia = viewDetailMedia || {};
    const { viewing, data } = viewDetailMedia;

    return (
      <div>
        <DialogNoHeader
          closeOn={this.closeMediaPopup}
          contentStyle={customContentStyle}
          onRequestClose={this.closeMediaPopup}
          autoScrollBodyContent={false}
          open={viewing}
        >
          <div className="ui-media-panel clearfix">
            {<MediaDetail media={data} />}
          </div>
        </DialogNoHeader>
      </div>
    );
  }
}

const populateStateToProps = (state) => ({
  viewDetailMedia: state.mm.viewDetailMedia,
});

export default connect(populateStateToProps)(DetailPopup);
