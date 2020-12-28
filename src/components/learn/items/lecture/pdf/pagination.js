import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import './pagination.scss';

class Control extends React.Component {
  spanStyle = { paddingRight: '1em' };

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
  }

  cssClass = 'lecture-pdf-pagination';

  handleNext = () => {
    const { onNext, page } = this.props;
    if (typeof onNext === 'function') {
      onNext(page);
    }
  };

  handlePrevious = () => {
    const { onPrevious, page } = this.props;
    if (typeof onPrevious === 'function') {
      onPrevious(page);
    }
  };

  handleInputPageInputChange = (event) => {
    const { onPageChange } = this.props;
    if (typeof onPageChange === 'function') {
      onPageChange(parseInt(event.target.value, 10));
    }
  };

  render() {
    const { className, pages, page } = this.props;

    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <button
          className={`${this.cssClass}__button\
             ${page === 1 ? `${this.cssClass}__button--disabled` : ''}`}
          onClick={page === 1 ? null : this.handlePrevious}
        >
          <Icon icon="navigate-before" />
        </button>
        <button
          className={`${this.cssClass}__button\
             ${page === pages ? `${this.cssClass}__button--disabled` : ''}`}
          onClick={page === pages ? null : this.handleNext}
        >
          <Icon icon="navigate-next" />
        </button>
        <span className={`${this.cssClass}__pages`}>
          <input
            type="number"
            min={1}
            max={pages}
            onChange={this.handleInputPageInputChange}
            value={page}
          />
          <span style={this.spanStyle}>/</span>
          <span>{pages}</span>
        </span>
      </div>
    );
  }
}

Control.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
  onPageChange: PropTypes.func,
  onPrevious: PropTypes.func,
  page: PropTypes.number,
  pages: PropTypes.number,
};

Control.defaultProps = {
  className: '',
  onNext: null,
  onPageChange: null,
  onPrevious: null,
  page: 0,
  pages: 0,
};

export default Control;
