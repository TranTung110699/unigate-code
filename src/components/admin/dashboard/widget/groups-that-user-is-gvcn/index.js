import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiUrls from 'api-endpoints';
import lodashGet from 'lodash.get';
import routes from 'routes';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

const searchFormSchema = {};

const renderResults = (groups) => (
  <ul>
    {(groups || []).map((g) => {
      return (
        <li key={lodashGet(g, 'id')}>
          <Link
            to={routes.url('node_edit', {
              iid: lodashGet(g, 'iid'),
              ntype: 'group',
            })}
          >
            {lodashGet(g, 'name')}
          </Link>
        </li>
      );
    })}
  </ul>
);

const GroupThatUserIsGvcn = () => (
  <SearchWrapper
    formid={`groups_that_user_is_gvcn`}
    schema={searchFormSchema}
    renderResultsComponent={renderResults}
    alternativeApi={apiUrls.search_groups_that_user_is_gvcn}
    autoSearchWhenStart
    showSearchButton={false}
  />
);

export default GroupThatUserIsGvcn;
