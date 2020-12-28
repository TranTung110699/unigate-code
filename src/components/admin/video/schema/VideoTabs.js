import React from 'react';
import Tabs from 'antd/lib/tabs';
import { connect } from 'react-redux';
import Icon from 'components/common/Icon';
import AntIcon from 'antd/lib/icon';
import { t1 } from 'translate';
import AntButton from 'antd/lib/button';
import actions from 'actions/node/creators';
import Video from 'components/common/media-player/video';
import get from 'lodash.get';
import styled from 'styled-components';
import { change } from 'redux-form';
import { secondsToTimeString } from 'common/utils/Date';

const VideoViewer = styled(Video)`
  width: 100%;
  height: auto;
`;

const VideoPreview = styled.div`
  .text-input-wrapper {
    width: 90px;
  }
  input {
    margin-bottom: 0 !important;
  }
`;

class VideoTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      et: '',
    };
  }

  componentDidMount() {
    this.getVideoDuration();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { formValues, formid, dispatch } = this.props;
    const { et } = this.state;
    const hlsUrl = get(formValues, 'drm_vid');
    const prevHlsUrl = get(prevProps.formValues, 'drm_vid');

    if (hlsUrl && hlsUrl !== prevHlsUrl) {
      this.getVideoDuration();
    }
    if (et !== prevState.et) {
      dispatch(change(formid, 'et', et));
    }
  }

  getVideoDuration = () => {
    const hlsUrl = get(this.props, 'formValues.drm_vid');

    try {
      window.hls.loadSource(hlsUrl, {
        method: 'sigma',
      });
      window.hls.on(window.SigmaManager.Events.LEVEL_LOADED, (event) => {
        this.setState({
          et: secondsToTimeString(get(event, '[1].details.totalduration', '')),
        });
      });
      window.hls.on(window.SigmaManager.Events.ERROR, (event) => {
        this.setState({
          et: '',
        });
      });
    } catch (e) {
      throw e;
    }
  };

  handlePreviewVideo = (hlsUrl) => {
    const { dispatch } = this.props;

    const contentDialog = <VideoViewer controls hlsUrl={hlsUrl} />;
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
    const { groups, formValues } = this.props;
    const hlsUrl = get(formValues, 'drm_vid');

    return (
      <Tabs defaultActiveKey="drm_vid">
        <Tabs.TabPane
          tab={
            <React.Fragment>
              <Icon icon="api" antIcon />
              &nbsp; HLS &nbsp;
              {formValues && formValues.drm_vid ? (
                <AntIcon
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#52c41a"
                />
              ) : null}
            </React.Fragment>
          }
          key="drm_vid"
        >
          {groups.video.fieldNames.drm_vid}
          {!!hlsUrl && (
            <VideoPreview className="d-flex align-items-center">
              {groups.video.fieldNames.et}
              <AntButton
                onClick={() => this.handlePreviewVideo(hlsUrl)}
                icon="play-circle"
                type="primary"
                className="m-l-20"
              >
                {t1('preview')}
              </AntButton>
            </VideoPreview>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <React.Fragment>
              <AntIcon type="youtube" />
              YouTube &nbsp;
              {formValues &&
                formValues.youtube &&
                formValues.youtube.max &&
                formValues.youtube.max !== '00:00' && (
                  <AntIcon
                    type="check-circle"
                    theme="twoTone"
                    twoToneColor="#52c41a"
                  />
                )}
            </React.Fragment>
          }
          key="youtube"
        >
          {groups.video.fieldNames.youtube}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <React.Fragment>
              <Icon icon="vimeo" />
              &nbsp; Vimeo &nbsp;
              {formValues &&
              formValues.vimeo &&
              formValues.vimeo.et &&
              formValues.vimeo.et !== '00:00' ? (
                <AntIcon
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#52c41a"
                />
              ) : formValues &&
                formValues.vimeo &&
                formValues.vimeo.max &&
                formValues.vimeo.max !== '00:00' ? (
                <AntIcon
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#52c41a"
                />
              ) : null}
            </React.Fragment>
          }
          key="vimeo"
        >
          {groups.video.fieldNames.vimeo}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <React.Fragment>
              <AntIcon type="upload" />
              {groups.video.fieldNames.attachments.props.fieldSchema.label}
              &nbsp;
              {formValues &&
              formValues.attachments &&
              formValues.attachments.length ? (
                <AntIcon
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#52c41a"
                />
              ) : null}
            </React.Fragment>
          }
          key="cdn"
        >
          {groups.video.fieldNames.attachments}
        </Tabs.TabPane>
      </Tabs>
    );
  }
}

export default connect()(VideoTabs);
