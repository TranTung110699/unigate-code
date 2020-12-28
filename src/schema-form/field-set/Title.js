import React from 'react';
import './stylesheet.scss';
import Link from 'components/common/router/Link';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import { connect } from 'react-redux';

class Title extends React.PureComponent {
  render() {
    const {
      title,
      subTitle,
      url,
      isFeatureEnabled,
      textWhite,
      titleStyle,
    } = this.props;
    if (!title && !subTitle) return null;

    let style = {
      marginTop: '20px',
      marginBottom: '5px',
    };
    if (!isFeatureEnabled(features.NEW_UI_JULY_2019)) {
      style = {
        ...style,
        borderBottom: '1px solid #eee',
      };
    }
    if (titleStyle && typeof titleStyle === 'object') {
      style = {
        ...style,
        ...titleStyle,
      };
    }

    // const styles = { }; // /marginBottom: '30px'
    // if (title && !isBlock) {
    //   styles.borderTop = '1px solid #eee';
    //   styles.paddingTop = '10px';
    // }
    const theTitle = url ? <Link to={url}>{title}</Link> : title;

    const spanStyle = { fontSize: 19, fontWeight: 'bold' };
    return (
      <div style={style}>
        {theTitle && (
          <span
            className={`elementGroup__title ${
              isFeatureEnabled(features.NEW_UI_JULY_2019) && textWhite
                ? 'text-white'
                : ''
            }`}
            style={spanStyle}
          >
            {theTitle}
          </span>
        )}
        {subTitle && (
          <div>
            <span className="text-muted">{subTitle}</span>
          </div>
        )}
      </div>
    );
  }
}

export default connect()(withFeatureFlags()(Title));
