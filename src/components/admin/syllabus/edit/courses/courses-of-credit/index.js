import React from 'react';
import PropTypes from 'prop-types';
import Search from 'components/admin/course/search/SearchForm';
import Result from './Results';

class CoursesOfCreditSearch extends React.Component {
  cssClass = 'courses-of-credit';

  renderResultComponent = (items) => <Result items={items} />;

  render() {
    const { node } = this.props;

    return (
      <Search
        hiddenFields={{
          credit_syllabus: node.iid,
        }}
        renderResultsComponent={this.renderResultComponent}
        formid="credit_courses_search"
      />
    );
  }
}

CoursesOfCreditSearch.propTypes = {
  className: PropTypes.string,
};

CoursesOfCreditSearch.defaultProps = {
  className: '',
};

export default CoursesOfCreditSearch;
