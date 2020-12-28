import React from 'react';
import { connect } from 'react-redux';
import { t1, t3 } from 'translate';
import './stylesheet.scss';
import Measure from 'react-measure';
import lodashGet from 'lodash.get';
import { confSelector } from 'common/selectors';
import { createSelector } from 'reselect';

const DownloadMobileApp = ({
  title = t1('download_mobile_app'),
  linkIos,
  linkAndroid,
}) => {
  const cssClass = 'download-mobile-app';
  const [measuredWidth, setMeasuredWidth] = React.useState();

  return (
    <Measure
      bounds
      onResize={(contentRect) => {
        const bounds = lodashGet(contentRect, 'bounds');
        const width = lodashGet(bounds, 'width');
        setMeasuredWidth(width);
      }}
    >
      {({ measureRef }) => (
        <div
          ref={measureRef}
          className={`${cssClass} ${
            measuredWidth <= 480 ? `${cssClass}--small-width` : ''
          }`}
        >
          {title ? <h3 className={`${cssClass}__title`}>{title}</h3> : null}
          <div className={`${cssClass}__content`}>
            {linkIos ? (
              <a
                href={linkIos}
                className={`${cssClass}__download-link ${cssClass}__download-link--ios ${
                  !linkAndroid ? `${cssClass}__download-link--last` : ''
                }`}
              >
                <p>{t1('download_from')}</p>
                <p>{t3('app_store')}</p>
              </a>
            ) : null}
            {linkAndroid ? (
              <a
                href={linkAndroid}
                className={`${cssClass}__download-link ${cssClass}__download-link--android ${cssClass}__download-link--last`}
              >
                <p>{t1('download_from')}</p>
                <p>{t3('google_play')}</p>
              </a>
            ) : null}
          </div>
        </div>
      )}
    </Measure>
  );
};

export default connect(
  createSelector(
    confSelector,
    (conf) => ({
      linkIos: lodashGet(conf, 'link:app_ios'),
      linkAndroid: lodashGet(conf, 'link:app_android'),
    }),
  ),
)(DownloadMobileApp);
