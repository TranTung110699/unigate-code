import React from 'react';
import { connect } from 'react-redux';
import OneFiltersetPreview from './OneFiltersetPreview';
import { getFormValues } from 'redux-form';

class FiltersetsPreview extends React.Component {
  render() {
    const { filtersets, formid } = this.props;

    if (filtersets && filtersets.length) {
      return (
        <div>
          {filtersets.map((filterset, i) => (
            <div key={`filter-${i}`}>
              <div className="elementGroup">
                <OneFiltersetPreview filterset={filterset} formid={formid} />
              </div>
              <hr />
            </div>
          ))}
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state, props) => {
  const { formid } = props;
  const values = getFormValues(formid)(state);
  return {
    filtersets: values && values.filtersets,
  };
};

export default connect(mapStateToProps)(FiltersetsPreview);
