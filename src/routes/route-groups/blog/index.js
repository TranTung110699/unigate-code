import React from 'react';
import { renderRoutes } from 'react-router-config';
import BlogLayout from 'components/front-end/blog/Layout';
import { DefinedUrlParams } from 'routes/links/common';

const routes = (blogRootUrl) => [
  {
    componentId: 'Blogs',
    path: blogRootUrl,
    component: BlogLayout,
    exact: true,
  },
  {
    componentId: 'Blog',
    path: `${blogRootUrl}/:${DefinedUrlParams.SLUG}.html`,
    component: BlogLayout,
    exact: true,
  },
  {
    componentId: 'BlogsCagegory',
    path: `${blogRootUrl}/:${DefinedUrlParams.CATEGORY_SLUG}`,
    component: BlogLayout,
    exact: true,
  },
  {
    componentId: 'CategoryBlog',
    path: `${blogRootUrl}/:${DefinedUrlParams.CATEGORY_SLUG}/:${
      DefinedUrlParams.SLUG
    }.html`,
    component: BlogLayout,
    exact: true,
  },
];

const Blog = (props) => {
  const {
    route: { path },
  } = props;
  return renderRoutes(routes(path));
};

export default Blog;
