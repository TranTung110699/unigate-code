/**
 * Created by Peter Hoang Nguyen on 4/8/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import FlatButton from 'components/common/mui/FlatButton';
import { change, reduxForm } from 'redux-form';
import { viewMediaDetail } from '../../actions';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 08/04/2017
 **/
class Image extends React.Component {
  textFieldStyle = { width: '100px' };

  constructor(props) {
    super(props);
    this.state = {};
    this.closeMediaPopup = this.closeMediaPopup.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
    this.onImgLoad = this.onImgLoad.bind(this);
    this.imgDetail = 'imgDetail';
  }

  onImgLoad({ target: img }) {
    const { dispatch } = this.props;
    dispatch(change('imageDetail', 'width', img.offsetWidth));
    dispatch(change('imageDetail', 'height', img.offsetHeight));
  }

  closeMediaPopup() {
    const { dispatch } = this.props;
    dispatch(
      viewMediaDetail({
        viewing: false,
      }),
    );
  }

  chooseImage() {
    const { dispatch, currentRichText, media } = this.props;
    const range = currentRichText.selection;
    const value = media.path;
    if (value) {
      currentRichText.insertEmbed(range.index, 'image', value, 'user');
    }
    dispatch(
      viewMediaDetail({
        viewing: false,
      }),
    );
  }

  render() {
    const { media, initialValues } = this.props;
    console.log('initialValues', initialValues);
    return (
      <div className="img-detail clearfix">
        {media && (
          <div>
            <div className="clearfix">
              <div className="image-panel  pull-left">
                <div className="center-block-panel">
                  <img
                    ref={(imgDetail) => {
                      this.imgDetail = imgDetail;
                    }}
                    onLoad={this.onImgLoad}
                    alt="detail"
                    src={media.path}
                  />
                </div>
              </div>
              <div className="ui-img-info">
                <TextField
                  fullWidth
                  name="title"
                  floatingLabelText={t1('title')}
                  hintText={t1('title')}
                />
                <TextField
                  fullWidth
                  name="alt"
                  floatingLabelText={t1('Alt')}
                  hintText={t1('alt')}
                />

                <TextField
                  className="margin-right15px"
                  floatingLabelText={t1('width')}
                  hintText={t1('width')}
                  style={this.textFieldStyle}
                  value={43324324}
                />

                <TextField
                  name="height"
                  style={this.textFieldStyle}
                  floatingLabelText={t1('height')}
                  hintText={t1('height')}
                />
              </div>
            </div>
            <div>
              <FlatButton
                className="margin-right15px"
                label={t1('cancel')}
                primary
                onTouchTap={this.closeMediaPopup}
              />
              <FlatButton
                label={t1('submit')}
                primary
                keyboardFocused
                onTouchTap={this.chooseImage}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

Image.childContextTypes = {
  muiTheme: PropTypes.shape().isRequired,
};

const exportedImage = reduxForm({
  form: 'imageDetail',
})(Image);

const mapStateToProp = (state) => {
  const { viewDetailMedia } = state.mm;
  const data =
    viewDetailMedia && viewDetailMedia.data ? viewDetailMedia.data : {};
  return {
    initialValues: {
      title: data.name,
      alt: data.name,
      width: 0,
      height: 0,
    },
    imageDetailForm: state.form.imageDetail,
    media: viewDetailMedia.data,
    currentRichText: state.mm.currentRichText,
  };
};

const connectedImage = connect(mapStateToProp)(exportedImage);

export default connectedImage;
