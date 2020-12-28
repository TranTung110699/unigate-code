import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LayoutHelper from 'layouts/LayoutHelper';
import ImageBackGround from 'components/common/views/image-background';
import FlyPanel from 'components/common/views/fly-panel';
import Menu from 'components/common/views/menu';
import { DefinedUrlParams, getFrontendUrl } from 'routes/links/common';
import { t1, t3 } from 'translate';
import Icon from 'components/common/Icon';
import { layouts } from 'configs/constants';
import sagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import { getConf, getThemeConfig } from 'utils/selectors';
import lGet from 'lodash.get';
import HomepageSlider from 'components/front-end/homepage/evn/header/index';
import BlogMainContent from './main-content';
import BlogRightSideBar from './right-side-bar';
import BlogTopSideBar from './top-side-bar';
import './stylesheet.scss';

class BlogLayout extends Component {
  style = { marginTop: '10px' };

  componentDidMount() {
    LayoutHelper.setLayout(this);
    window.scrollTo(0, 0);
    this.fetchPageByCategory();
  }

  fetchPageByCategory() {
    const { dispatch, themeConfig } = this.props;
    const url = apiUrls.children_category;
    const layout = lGet(themeConfig, 'layout');
    if ([layouts.EVN, layouts.SEABANK, layouts.BLUE].includes(layout)) {
      dispatch(
        sagaActions.getDataRequest(
          { url, keyState: 'key_blogs' },
          { pid: 0, status: 'approved' },
        ),
      );
    } else {
      dispatch(
        sagaActions.getDataRequest(
          { url, keyState: 'key_daily_topic_tips' },
          { parent_code: 'etec', status: 'approved' },
        ),
      );
    }
  }

  getCategoryId = (categoryBlogs, categorySlug) => {
    let i;
    for (i = 0; i < categoryBlogs.length; ++i) {
      const category = categoryBlogs[i];
      if (category && category.slug == categorySlug) {
        return category.id;
      }
    }
    return -1;
  };
  renderEtecBlogs = (screenSize, slug, query, categoryBlogs, categorySlug) => (
    <div className="blogs-panel min-height-container" style={this.style}>
      {!slug && (
        <div className="container">
          <BlogTopSideBar
            categoryBlogs={categoryBlogs}
            categorySlug={categorySlug}
          />
        </div>
      )}
      <div className="container blogs-container">
        {slug && (
          <div className="back-to-blogs">
            <Link to={getFrontendUrl('blog', { categorySlug })}>
              <Icon icon="back" />
              {t1('back_to_blogs')}
            </Link>
          </div>
        )}
        {slug && (
          <div className="row">
            <div className="col-md-8">
              {categoryBlogs && categorySlug && (
                <BlogMainContent
                  categorySlug={categorySlug}
                  slug={slug}
                  query={this.getCategoryId(categoryBlogs, categorySlug)}
                />
              )}
            </div>
            <div className="col-md-4">
              <BlogRightSideBar />
            </div>
          </div>
        )}
        {!slug && (
          <div className="row">
            <div className="col-md-12">
              {categoryBlogs && categorySlug && (
                <BlogMainContent
                  categorySlug={categorySlug}
                  categoryBlogs={categoryBlogs}
                  slug={slug}
                  query={this.getCategoryId(categoryBlogs, categorySlug)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  render() {
    const {
      screenSize,
      slug,
      categorySlug,
      query,
      categoryBlogs,
      themeConfig,
      numberOfArticles,
      blogRouterId,
    } = this.props;
    const layout = lGet(themeConfig, 'layout');
    const classCssBlog = [layouts.EVN, layouts.SEABANK, layouts.BLUE].includes(
      layout,
    )
      ? 'layout-evn-blogs-container'
      : 'blogs-container';
    if (layout === layouts.ETEC) {
      return this.renderEtecBlogs(
        screenSize,
        slug,
        query,
        categoryBlogs,
        categorySlug,
      );
    }

    if (layout === layouts.UMS) {
      return (
        <BlogMainContent
          slug={slug}
          categorySlug={categorySlug}
          categoryBlogs={categoryBlogs}
          query={query}
          blogRouterId={blogRouterId}
        />
      );
    }

    return (
      <div className="blogs-panel">
        {![layouts.EVN, layouts.SEABANK, layouts.LOTUS, layouts.UMS].includes(
          layout,
        ) && (
          <div>
            <FlyPanel breakPoint={250}>
              <Menu type="fly" />
            </FlyPanel>
            <ImageBackGround
              width={screenSize.width}
              height={250}
              src="/media/images/blog.png"
            >
              <Menu />
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <h3>{t3('blog')}</h3>
                  </div>
                </div>
              </div>
            </ImageBackGround>
          </div>
        )}
        {[layouts.EVN, layouts.SEABANK, layouts.BLUE].includes(layout) && [
          <HomepageSlider />,
          <div className="blog-top-bar-wrapper">
            <div className="container blog-top-bar">
              <BlogTopSideBar
                categoryBlogs={categoryBlogs}
                categorySlug={categorySlug}
              />
            </div>
          </div>,
        ]}
        <div className={`container ${classCssBlog}`}>
          {slug && (
            <div className="back-to-blogs">
              <Link to="/blog">
                <Icon icon="back" />
                {t1('back_to_blogs')}
              </Link>
            </div>
          )}
          <div className="row">
            <div className="col-md-8">
              <BlogMainContent
                slug={slug}
                categorySlug={categorySlug}
                categoryBlogs={categoryBlogs}
                query={query}
              />
            </div>
            <div className="col-md-4">
              <BlogRightSideBar
                layout={layout}
                numberOfArticles={numberOfArticles}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const slug =
    props.slug || lGet(props, `match.params[${DefinedUrlParams.SLUG}]`);
  const categoryBlogs =
    ([layouts.EVN, layouts.SEABANK, layouts.BLUE].includes(
      getThemeConfig(state).layout,
    )
      ? state.dataApiResults.key_blogs
      : state.dataApiResults.key_daily_topic_tips) || [];
  let query;
  let { match } = props;
  match = match || {};
  const params = match.params || {};
  let categorySlug = params[DefinedUrlParams.CATEGORY_SLUG];
  if (!categorySlug && categoryBlogs && categoryBlogs.length > 1) {
    categorySlug = categoryBlogs[0].slug;
  }
  try {
    // get the query param ?query=....
    query = decodeURI(
      props.location.search
        .slice(1)
        .split('&')
        .find((x) => x.indexOf('query') === 0)
        .split('=')[1],
    );
  } catch (ex) {
    query = '';
  }

  return {
    screenSize: state.common.screenSize,
    query,
    slug,
    categorySlug,
    categoryBlogs,
    themeConfig: getThemeConfig(state),
    numberOfArticles: getConf(state).number_of_featured_blog_articles,
  };
};

export default connect(mapStateToProps)(BlogLayout);
