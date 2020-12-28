import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DefinedUrlParams } from 'routes/links/common';
import { createSelector } from 'reselect';
import { withRouter } from 'react-router';
import CategoriesCourseWrapper from '../../courses/categoriesCourseWrapper';

class CategoriesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  style = {
    breadcrumbs: {
      padding: '0 20px',
      margin: '0 auto',
      maxWidth: '1300px',
      width: '100%',
    },
    categoriesCourseWrapper: {
      margin: '20px 0 50px',
    },
  };

  render() {
    const { iid, slug } = this.props;
    return (
      <div style={this.style.categoriesCourseWrapper}>
        <CategoriesCourseWrapper
          type={'academic-categories'}
          iid={iid}
          page={'catalogue'}
          slug={slug}
        />
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  (state, props) => props.match && props.match.params,
  (params) => ({
    iid: params && params[DefinedUrlParams.IID],
    slug: params && params[DefinedUrlParams.CATEGORY_SLUG],
  }),
);

CategoriesPage.defaultProps = {
  iid: '',
  slug: '',
};

CategoriesPage.propTypes = {
  iid: PropTypes.number,
  slug: PropTypes.string,
};

export default withRouter(connect(mapStateToProps)(CategoriesPage));
