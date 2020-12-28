import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import apiUrls from 'api-endpoints';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import CategoryCourseItem from 'components/front-end/homepage/evn/courses/CategoryCourseItem';
import ComponentWithoutContent from 'components/common/utils/ComponentWithoutContent';

const paginationProps = {
  showExtraControl: false,
  position: 'center',
  itemPerPage: [12],
  theme: 'light',
};

class CategoriesCoursesList extends Component {
  renderResultComponent = (items) => (
    <div className="categories-courses">
      <div>
        {!items || items.length === 0 ? (
          <ComponentWithoutContent content="categories_courses" />
        ) : (
          items.map((item) => (
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 item">
              <CategoryCourseItem item={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );

  render() {
    const { categoryIid, slug } = this.props;
    const hiddenFields = {
      category_iid: categoryIid,
      is_academic_categories: parseInt(categoryIid) <= 0,
    };

    let { mode } = this.props;
    let formid = `categories_search_${categoryIid}`;

    if (slug === 'popular-courses') {
      mode = 'featuredCourses';
      formid = 'popular-courses';
    }

    return (
      <SearchWrapper
        formid={formid}
        hiddenFields={hiddenFields}
        renderResultsComponent={this.renderResultComponent}
        alternativeApi={apiUrls.dashboard_configs(mode, '12', categoryIid)}
        showResult
        paginationProps={paginationProps}
      />
    );
  }
}

CategoriesCoursesList.propTypes = {
  categoriesCourses: PropTypes.arrayOf(),
  display: PropTypes.string,
};

CategoriesCoursesList.defaultProps = {
  categoriesCourses: [],
  display: '',
};

function mapStateToProps() {
  const mode = 'categoriesCourses';

  return {
    mode,
  };
}

export default connect(mapStateToProps)(CategoriesCoursesList);
