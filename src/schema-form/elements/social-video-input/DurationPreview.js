import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import Editable from 'components/common/forms/editable';
import { timeStringToSeconds } from 'common/utils/Date';
import Video from 'components/common/media-player/video';
import Icon from 'components/common/Icon';
import AntButton from 'antd/lib/button';

const REGEX = /^(\d+:*)([0-5]\d)(:[0-5]\d)?$/;

class DurationPreview extends Component {
  // iconButtonStyle = { marginTop: '30px' };
  // flatButtonStyle = { marginTop: '40px' };

  validateTime = (values, fields) => {
    const field = fields.name;
    const text = get(values, field);
    if (!text) {
      return false;
    }
    const isValidFormat = REGEX.test(text);
    if (!isValidFormat) {
      return { [field]: t1('wrong_format_(example_value_is_05:10)') };
    }

    let validateTime = false;
    if (field === 'et') {
      validateTime = this.getValidateEndTimeError(text);
    } else if (field === 'st') {
      validateTime = this.getValidateStartTimeError(text);
    }

    if (validateTime) {
      return { [field]: validateTime };
    }
    return null;
  };

  /**
   * return error string if not valid
   * @param val
   * @returns {boolean}
   */
  getValidateStartTimeError = (val) => {
    const { et, max } = this.props;
    const duration = timeStringToSeconds(val);

    if (duration < 0) t1('start_time_cannot_be_negative');

    // either max == -1 which means we couldn't fetch the video length from API
    // or both of them are null
    let maxDuration = Math.max(
      timeStringToSeconds(max || '00:00'),
      timeStringToSeconds(et || '00:00'),
    );
    if (maxDuration == 0) return false;

    if (duration >= 0 && duration <= maxDuration) return false;
    else return t1('invalid_start_time');
    // return t1('start_time_cannot_be_more_than_%s', [maxDuration]);
  };

  getValidateEndTimeError = (val) => {
    const { max, st } = this.props;

    const maxDuration = max ? timeStringToSeconds(max) : 0;
    if (maxDuration == 0) return false;

    const minDuration = st ? timeStringToSeconds(st) : 0;
    const duration = timeStringToSeconds(val);
    if (duration >= minDuration && duration <= maxDuration) return false;
    else return t1('invalid_end_time');
  };

  renderVideoByType = (props) => {
    let params = null;
    switch (props.type) {
      case 'youtube': {
        params = { youTubeId: props.id };
        break;
      }
      case 'vimeo': {
        params = { vimeoId: props.id };
        break;
      }
      case 'attachments': {
        params = {
          url: props.link,
        };
        break;
      }
      default: {
        break;
      }
    }
    if (!params) {
      return <div>{t1('no_video_available')}</div>;
    }
    return (
      <Video
        className="social-video-input-preview"
        controls
        {...params}
        startTime={props.st}
        endTime={props.et}
      />
    );
  };

  handlePreviewVideo = () => {
    const { dispatch } = this.props;
    const contentDialog = this.renderVideoByType(this.props);
    const optionsProperties = {
      modal: true,
      handleClose: true,
      title: t1('preview_video'),
    };
    dispatch(
      actions.handleOpenDialog(
        { contentDialog, optionsProperties },
        'preview_video',
      ),
    );
  };

  render() {
    const { dispatch, type, et, st, formid, id, max } = this.props;

    const vimeoErrorMsg = (
      <div>
        {t1(
          'if_this_is_your_own_private_video,_this_is_probably_you_have_not_set_up_vimeo_developer_api_keys',
        )}{' '}
        <a href="/admin/conf/vimeo" target="_blank">
          {t1('set_up')}
        </a>
        . {t1('also_make_sure_your_vimeo_account_is_at_least')}: "Vimeo PRO"
      </div>
    );
    const style = { clear: 'both' };

    return (
      <div key={`preview-${type}-${id}`} style={style}>
        {max == '00:00' ? (
          <div>
            {t1('error_fetching_the_video_duration')} .
            <a
              target="_blank"
              href={
                type == 'vimeo'
                  ? `https://vimeo.com/${id}`
                  : `https://www.youtube.com/watch?v=${id}`
              }
            >
              {t1('check_video')}
            </a>
            .{type === 'vimeo' ? vimeoErrorMsg : null}
          </div>
        ) : (
          <div>
            {t1('video_length')}: {max}
          </div>
        )}
        <Icon title={t1('duration')} icon="timer" />{' '}
        <label>
          {`${t1('start')}:`}
          &nbsp;
        </label>
        <Editable
          form={`${type}_st`}
          name="st"
          initialValue={st || '00:00'}
          type="text"
          validate={this.validateTime}
          onSubmit={(values) => {
            dispatch(
              change(
                formid,
                `${type}${type === 'attachments' ? '[0]' : ''}.st`,
                values.st,
              ),
            );
          }}
        />
        <label>
          &nbsp;&nbsp;&nbsp;
          {`${t1('end')}:`}
          &nbsp;
        </label>
        <Editable
          form={`${type}_et`}
          name="et"
          initialValue={et || '00:00'}
          type="text"
          validate={this.validateTime}
          onSubmit={(values) => {
            dispatch(
              change(
                formid,
                `${type}${type === 'attachments' ? '[0]' : ''}.et`,
                values.et,
              ),
            );
          }}
        />
        &nbsp;&nbsp;
        <AntButton
          onClick={this.handlePreviewVideo}
          icon="play-circle"
          type="primary"
        >
          {t1('preview')}
        </AntButton>
      </div>
    );
  }
}

DurationPreview.propTypes = {
  defaultValue: PropTypes.instanceOf(Object),
  dispatch: PropTypes.instanceOf(Object),
  et: PropTypes.string,
  formid: PropTypes.string,
  hintText: PropTypes.string,
  st: PropTypes.string,
  max: PropTypes.string,
  type: PropTypes.string, // youtube|vimeo
  id: PropTypes.string,
  videoType: PropTypes.string,
  youtube: PropTypes.instanceOf(Object),
  vimeo: PropTypes.instanceOf(Object),
};
DurationPreview.defaultProps = {
  dispatch: {},
  formid: '',
  st: '',
  et: '',
  max: '',
  type: '',
  id: '',
  videoType: '',
  hintText: '',
  defaultValue: {},
  youtube: {},
  vimeo: {},
};
export default connect()(DurationPreview);
