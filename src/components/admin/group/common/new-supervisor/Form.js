import React from 'react';
import PropTypes from 'prop-types';
import NodeNew from 'components/admin/node/new';
import schema from 'components/admin/relation/schema/form';
import api from '../../endpoints';

/**
 * form new supervisor
 * @param {object} node
 * @param {string} searchFormId
 * @returns {JSX.Element}
 * @constructor
 */
function New({ node, searchFormId }) {
  return (
    <NodeNew
      mode={'new'}
      closeModal
      formid={`new_${node && node.type}_supervisor`}
      searchFormId={searchFormId}
      schema={schema}
      hiddenFields={{
        group_iid: node.iid,
      }}
      alternativeApi={api.add_supervisor}
    />
  );
}

New.propTypes = {
  className: PropTypes.string,
};

New.defaultProps = {
  className: '',
};

export default New;
