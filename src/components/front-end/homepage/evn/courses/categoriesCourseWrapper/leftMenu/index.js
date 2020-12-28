import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import pageApiUrls from 'components/admin/cms/page/endpoints';

import getMenus from './configs';
import './stylesheet.scss';
import OneLevelItem from './OneLevelItem';
import TwoLevelItem from './TwoLevelItem';

const ACADEMIC_CATEGORIES = 'academicCategories';
const BLOG_CATEGORIES = 'blogCategories';
const cssClass = 'evn-home-page-left-menu';

class LeftMenu extends React.Component {
  componentWillMount() {
    this.fetchAcademicCategories();
    this.fetchBlogCategories();
  }

  style = {
    float: { float: 'left' },
    noFloat: { float: 'none', clear: 'both' },
  };
  getPid = () => {
    const { parent } = this.props;
    return (parent && parent.id) || '0';
  };

  fetchAcademicCategories() {
    const { dispatch } = this.props;
    const url = apiUrls.academic_category_search;

    dispatch(
      sagaActions.getDataRequest(
        { url, keyState: ACADEMIC_CATEGORIES },
        {
          view: 'tree',
          type: 'academic',
          pid: this.getPid(),
          depth: -1,
        },
      ),
    );
  }

  fetchBlogCategories() {
    const { dispatch } = this.props;
    const url = pageApiUrls.blog_search;

    dispatch(
      sagaActions.getDataRequest(
        { url, keyState: BLOG_CATEGORIES },
        {
          view: 'tree',
          type: 'blog',
          pid: this.getPid(),
          depth: -1,
        },
      ),
    );
  }

  render() {
    const { academicCategoriesMenu, blogCategoriesMenu, page } = this.props;
    const menus = getMenus(academicCategoriesMenu, page, blogCategoriesMenu);

    if (!Array.isArray(menus) || menus.length === 0) return null;

    return (
      <div className={`${cssClass}`}>
        <ul className="no-padding no-margin">
          {menus.map(
            (item, index) =>
              item &&
              !item.hidden && (
                <li key={item.id || index}>
                  <div key={`menu-left-${item.id || index}`}>
                    {Array.isArray(item.children) ? (
                      <TwoLevelItem item={item} index={index} {...this.props} />
                    ) : (
                      <OneLevelItem item={item} index={index} />
                    )}
                  </div>
                </li>
              ),
          )}
        </ul>
      </div>
    );
  }
}

LeftMenu.propTypes = {
  academicCategoriesMenu: PropTypes.arrayOf(),
  page: PropTypes.string,
};

LeftMenu.defaultProps = {
  academicCategoriesMenu: [],
  page: 'home',
};

const mapPropsToState = (state) => {
  const academicCategoriesMenu = state.dataApiResults[ACADEMIC_CATEGORIES];
  const blogCategoriesMenu = state.dataApiResults[BLOG_CATEGORIES];
  return {
    academicCategoriesMenu,
    blogCategoriesMenu,
  };
};
export default connect(mapPropsToState)(LeftMenu);
