import React from 'react';
import PropTypes from 'prop-types';
import './SelectionBlock.scss';

class SelectionBlock extends React.PureComponent {
  cssClass = 'reorder-question-type-word-selection-block';

  render() {
    const { className, onClick, content, selected } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass} ${
      selected ? `${this.cssClass}--selected` : ''
    }`;

    return (
      <div className={componentClassName} onClick={onClick} content={content}>
        <div className={`${this.cssClass}__text`}>{content}</div>
      </div>
    );
  }
}

SelectionBlock.propTypes = {
  className: PropTypes.string,
};

SelectionBlock.defaultProps = {
  className: '',
};

export default SelectionBlock;
