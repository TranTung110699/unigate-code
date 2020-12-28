/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import apiUrls from '../../../endpoints';
import { t1 } from 'translate';
import Results from './Results';

/**
 * @param {object} node
 * @param {string} formid
 * @returns {JSX.Element|null}
 * @constructor
 */
function GroupSupervisor({ node, formid }) {
  const renderResultComponent = (items, props, objects, searchValues) => {
    return (
      <Results
        {...props}
        items={items}
        searchFormId={formid}
        node={node}
        searchValues={searchValues}
      />
    );
  };

  return node ? (
    <SearchWrapper
      formid={formid}
      hiddenFields={{
        group_iid: node.iid,
      }}
      renderResultsComponent={renderResultComponent}
      alternativeApi={apiUrls.search_supervisor}
      noResultText={t1('no_supervisors')}
      noResultImage="/media/images/empty/person.png"
    />
  ) : null;
}

GroupSupervisor.propTypes = {
  className: PropTypes.string,
};

GroupSupervisor.defaultProps = {
  className: '',
};

export default GroupSupervisor;
