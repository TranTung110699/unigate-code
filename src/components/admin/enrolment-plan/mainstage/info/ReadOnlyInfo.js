import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'antd/lib/alert';
import { t1 } from 'translate';
import NodeNew from 'components/admin/node/new';
import schema from '../../schema/form';

class ReadOnlyInfo extends Component {
  render() {
    const { node } = this.props;

    const formid = `view_read_only_info_${node.iid}`;

    return (
      <div>
        <Alert
          message={t1(
            'enrolment_plan_already_approved_therefore_following_fields_are_not_editable',
          )}
          type="error"
          showIcon
          className="sticky-card z-index-1000"
          style={{
            top: 80,
          }}
        />

        <NodeNew
          ntype={'enrolment_plan'}
          schema={schema}
          mode={'edit'}
          step={'view_read_only_info'}
          node={node}
          hideSubmitButton
          formid={formid}
          readOnly
        />
      </div>
    );
  }
}

export default ReadOnlyInfo;
