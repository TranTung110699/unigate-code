import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, reduxForm } from 'redux-form';
import { Element } from 'schema-form/elements';
import { t1 } from 'translate';
import Tree from './Tree';
import './TreeWithFilter.scss';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

class TreeWithFilter extends React.PureComponent {
  cssClass = 'tree-with-filter-component';

  componentDidMount() {
    if (!this.props.noAutoFocus)
      setTimeout(() => {
        if (this.text) {
          this.text.focus();
        }
      });
  }

  FilterForm = reduxForm({})(() => (
    <div className={`${this.cssClass}__filter-form`}>
      <Element
        schema={{
          setRef: (el) => {
            this.text = el;
          },
          type: 'text',
          name: 'filter_text',
          floatingLabelText: t1('filter_tree_data'),
          floatingLabelFixed: false,
        }}
      />
    </div>
  ));

  render() {
    const {
      className,
      filterFormId,
      filterText,
      isFeatureEnabled,
      ...rest
    } = this.props;

    const componentClassName = `${className || ''} ${this.cssClass} ${
      isFeatureEnabled(features.NEW_UI_JULY_2019) ? 'border-round' : ''
    }`;
    return (
      <div className={componentClassName}>
        <this.FilterForm form={filterFormId} />
        <div className={`${this.cssClass}__tree-wrapper`}>
          <Tree {...rest} filterText={filterText} />
        </div>
      </div>
    );
  }
}

TreeWithFilter.propTypes = {
  className: PropTypes.string,
  filterFormId: PropTypes.string,
  filterText: PropTypes.string,
};

TreeWithFilter.defaultProps = {
  className: '',
  filterFormId: '',
  filterText: '',
};

const mapStateToProps = (state, props) => {
  let { filterFormId } = props;
  filterFormId = filterFormId || 'tree_filter';
  return {
    filterFormId,
    filterText: formValueSelector(filterFormId)(state, 'filter_text'),
  };
};

export default connect(mapStateToProps)(withFeatureFlags()(TreeWithFilter));
