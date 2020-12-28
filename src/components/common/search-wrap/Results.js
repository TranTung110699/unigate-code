import React from 'react';
import PropTypes from 'prop-types';
import NoResult from './NoResult';
import lodashGet from 'lodash.get';

class Results extends React.Component {
  cssClass = '';

  shouldComponentUpdate(nextProps) {
    const props = nextProps || this.props;
    const { resultId, resultsRerenderTrigger } = this.props;
    if (props.ignoreOptimize) {
      return true;
    }
    if (resultId !== nextProps.resultId) {
      return true;
    }
    if (Array.isArray(resultsRerenderTrigger)) {
      for (let index = 0; index < resultsRerenderTrigger.length; index += 1) {
        if (
          lodashGet(resultsRerenderTrigger, index) !==
          lodashGet(nextProps.resultsRerenderTrigger, index)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  componentDidUpdate(prevProps) {
    const { onResultChange, resultId, items } = this.props;
    if (prevProps.resultId !== resultId) {
      if (typeof onResultChange === 'function') {
        onResultChange(items);
      }
    }
  }

  render() {
    const { className } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;
    const {
      items,
      total,
      showResult,
      renderResultsComponent,
      objects,
      renderNoResultComponent,
      searchValues,
      noResultText,
      noResultImage,
      resultId,
      formValues,
      fromParamsToSortData,
      onSortDataChange,
      noResultTextMultiLine,
    } = this.props;

    return (
      <div className={componentClassName}>
        {(() => {
          if ((showResult || (items && total)) > 0) {
            return (
              renderResultsComponent &&
              renderResultsComponent(
                items,
                {
                  ...this.props,
                },
                objects,
                searchValues,
                resultId,
                typeof fromParamsToSortData === 'function'
                  ? fromParamsToSortData(formValues)
                  : {},
                onSortDataChange,
                total,
              )
            );
          }

          if (renderNoResultComponent) {
            return renderNoResultComponent();
          }

          return (
            <NoResult
              text={noResultText}
              image={noResultImage}
              noResultTextMultiLine={noResultTextMultiLine}
            />
          );
        })()}
      </div>
    );
  }
}

Results.propTypes = {
  className: PropTypes.string,
};

Results.defaultProps = {
  className: '',
};

export default Results;
