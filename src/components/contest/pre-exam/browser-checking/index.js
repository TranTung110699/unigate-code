import React from 'react';
import { t1 } from 'translate';
import { Status } from '../detail/Status';
import Audio from 'components/common/media-player/audio';
import Video from 'components/common/media-player/video';
import { detect } from 'detect-browser';
import axios from 'axios';
import withDetectSupportedBrowser from 'components/common/supported-browsers/withDetectSupportedBrowser';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

const detectedBrowser = detect();

const TestConnect = ({ url }) => {
  const [display, setDisplay] = React.useState('Loading...');

  React.useEffect(
    () => {
      if (!url) return;

      axios
        .get(url)
        .then((response) => {
          if (response.status === 200) {
            setDisplay(<Status type="success" text={t1('OK')} />);
          } else
            setDisplay(
              <Status
                type="danger"
                text={`${t1('error')} ${response.status}`}
              />,
            );
        })
        .catch(function(error) {
          setDisplay(<Status type="danger" text={t1('error')} />);
        });
    },
    [url],
  );

  return display || null;
};

const Testing = (props) => {
  const { isBrowserSupported } = props;
  return (
    <div>
      <h4 className="contest-information-block-title">
        {t1('browser_compatibility_checking')}
      </h4>
      <div>
        <table>
          {typeof isBrowserSupported !== 'undefined' ? (
            <tr>
              <td>{t1('browser')}</td>
              <td>{`${detectedBrowser.name} v${detectedBrowser.version}`}</td>
              <td>
                <Status
                  type={isBrowserSupported ? 'success' : 'danger'}
                  text={t1(isBrowserSupported ? 'OK' : 'fail')}
                />
              </td>
            </tr>
          ) : null}
          <tr>
            <td rowSpan="2">{t1('test_internet')}</td>
            <td>{t1('to_main_server')}</td>
            <td>
              <TestConnect url={window.APP_SERVER_API_URL} />
            </td>
          </tr>
          <tr>
            <td className="p-l-6">{t1('to_CDN_server')}</td>
            <td>
              <TestConnect url={window.APP_ASSETS_CDN} />
            </td>
          </tr>
          <tr>
            <td>{t1('test_audio')}</td>
            <td colSpan="2">
              <Audio src="/media/audio/victory.ogg" isPlaying={true} />
            </td>
          </tr>
          <tr>
            <td>{t1('test_video')}</td>
            <td colSpan="2">
              <Video
                width="100%"
                height="100%"
                controls
                autoPlay={false}
                youTubeId="YE7VzlLtp-4"
                className="video-for-test"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => state.domainInfo && state.domainInfo.conf,
  (conf) => ({
    conf,
  }),
);

export default connect(mapStateToProps)(withDetectSupportedBrowser()(Testing));
