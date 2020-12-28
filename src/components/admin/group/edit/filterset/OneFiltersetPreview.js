import React from 'react';
import FilterPreview from './filter/FilterPreview';

class OneFiltersetPreview extends React.Component {
  render() {
    const { filterset, formid } = this.props;

    const availableFilters = filterset && filterset.availableFilters;

    if (availableFilters && availableFilters.length) {
      return (
        <div>
          <ol>
            {availableFilters.map((i) => {
              if (filterset[i])
                return (
                  <li key={i}>
                    rule: {i}{' '}
                    <FilterPreview
                      type={i}
                      filterset={filterset}
                      formid={formid}
                    />
                  </li>
                );
            })}
          </ol>
        </div>
      );
    }

    return null;
  }
}

export default OneFiltersetPreview;
