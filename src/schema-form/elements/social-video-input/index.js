import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, Field, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import { normalizeVimeoUrl, normalizeYoutubeUrl } from 'common/normalizers';
import get from 'lodash.get';
import { t4 } from 'translate';
import Text from 'schema-form/elements/text';
import getDuration from './VideoInfo';
import DurationPreview from './DurationPreview';
import './stylesheet.scss';
import Tooltip from 'antd/lib/tooltip';
import Icon from 'antd/lib/icon';
import VimeoHelper from './vimeo.png';
import YouTubeHelper from './youtube.png';

class SocialVideoInput extends Component {
  handleDurationVideo = (duration) => {
    const { dispatch, videoType, formid } = this.props;
    const { et, st } = get(this.props, `${videoType}`);

    dispatch(change(formid, `${videoType}.max`, duration));

    if (!et) {
      dispatch(change(formid, `${videoType}.et`, duration));
    }
    if (!st) dispatch(change(formid, `${videoType}.st`, '00:00'));
  };

  fetchDurationByVideoId = (videoId) => {
    const { videoType } = this.props;
    const normalizer =
      videoType === 'youtube' ? normalizeYoutubeUrl : normalizeVimeoUrl;
    getDuration(normalizer(videoId), videoType, this.handleDurationVideo);
  };

  componentDidMount() {
    this.fetchDurationByVideoId(get(this.props, 'defaultValue.id'));
  }

  componentWillReceiveProps(nextProps) {
    const { id, max } =
      get(nextProps, `${nextProps.videoType || 'youtube'}`) || {};
    if (id && !max) {
      this.fetchDurationByVideoId(id);
    }
  }

  onChange(ev) {
    const videoId = get(ev, 'target.value');
    if (!videoId) {
      const { dispatch, videoType, formid } = this.props;
      dispatch(change(formid, `${videoType}.max`, null));
      dispatch(change(formid, `${videoType}.et`, null));
      dispatch(change(formid, `${videoType}.st`, null));
    } else {
      this.fetchDurationByVideoId(videoId);
    }
  }

  render() {
    const { formid, videoType, hintText, defaultValue } = this.props;
    const type = videoType || 'youtube';
    const { id, et, st, max } = get(this.props, `${type}`, {}) || {};
    const enableEdit = !!id; //&& et && timeStringToSeconds(et) > 0;

    const normalizer =
      videoType === 'youtube' ? normalizeYoutubeUrl : normalizeVimeoUrl;

    // const displayMaxValue = max == -1 ? '10:00' : max;
    return (
      <div>
        <span>
          {hintText}{' '}
          <Tooltip
            title={
              <img
                src={type === 'youtube' ? YouTubeHelper : VimeoHelper}
                alt=""
                width={500}
              />
            }
            overlayStyle={{ maxWidth: 'unset' }}
            placement="right"
            arrowPointAtCenter={true}
          >
            <Icon type="question-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        </span>
        <div className="row">
          <div className="col-md-3">
            <Field
              name="id"
              component={Text}
              format={normalizer}
              hintText={t4('video_id')}
              floatingLabelText={t4('video_id')}
              onChange={(ev) => this.onChange(ev, 'id')}
              fullWidth
            />
          </div>
          <div
            className="col-md-9"
            style={{ visibility: enableEdit ? 'visible' : 'hidden' }}
          >
            <DurationPreview
              key={`${id}-${type}`}
              type={type}
              id={id}
              et={et}
              st={st}
              max={max}
              formid={formid}
              defaultValue={defaultValue}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const selector = formValueSelector(props.formid);

  return {
    youtube: selector(state, 'youtube'), // object like { st: '00:00', et: '10:20', max: '23:11'}
    vimeo: selector(state, 'vimeo'),
  };
}

SocialVideoInput.propTypes = {
  defaultValue: PropTypes.instanceOf(Object),
  dispatch: PropTypes.instanceOf(Object),
  et: PropTypes.string,
  formid: PropTypes.string,
  hintText: PropTypes.string,
  st: PropTypes.string,
  max: PropTypes.string,
  videoType: PropTypes.string,
  youtube: PropTypes.instanceOf(Object),
  vimeo: PropTypes.instanceOf(Object),
};
SocialVideoInput.defaultProps = {
  dispatch: {},
  formid: '',
  st: '',
  et: '',
  max: '',
  videoType: '',
  hintText: '',
  defaultValue: {},
  youtube: {},
  vimeo: {},
};

export default connect(mapStateToProps)(SocialVideoInput);
