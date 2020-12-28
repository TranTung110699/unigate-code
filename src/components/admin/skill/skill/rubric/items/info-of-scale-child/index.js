import React from 'react';
import PropTypes from 'prop-types';
import DisplayHtml from 'components/common/html';
import { t1 } from 'translate';

class InfoOfScaleChild extends React.Component {
  cssClass = 'rubric-scale-child-info';

  render() {
    const { className, scaleChild } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={`${className || ''} ${componentClassName}`}>
        {scaleChild.description && (
          <div className={`${componentClassName}__section`}>
            <h3 className={`${componentClassName}__title`}>
              {t1('description')}
            </h3>
            <div className={`${componentClassName}__content`}>
              <DisplayHtml content={scaleChild.description} />
            </div>
          </div>
        )}
        {scaleChild.detailed_description && (
          <div className={`${componentClassName}__section`}>
            <h3 className={`${componentClassName}__title`}>{t1('details')}</h3>
            <div className={`${componentClassName}__content`}>
              <DisplayHtml content={scaleChild.detailed_description} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

InfoOfScaleChild.propTypes = {
  className: PropTypes.string,
};

InfoOfScaleChild.defaultProps = {
  className: '',
};

export default InfoOfScaleChild;
