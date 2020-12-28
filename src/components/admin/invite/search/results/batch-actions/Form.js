import React from 'react';
import PropTypes from 'prop-types';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import NodeNew from 'components/admin/node/new';
import lodashGet from 'lodash.get';

class Form extends React.PureComponent {
  render() {
    const {
      items,
      requestSuccessful,
      searchFormId,
      formid,
      act,
      dialogKey,
      submitLabel,
      searchValues,
    } = this.props;

    let message = this.props.message;
    if (!message && lodashGet(items, 'length') > 0) {
      message = `${t1('this_action_will_affect_all_%s_selected_users', [
        lodashGet(items, 'length') || 0,
      ])}. ${t1('are_you_sure_you_want_to_continue?')}`;
    }
    if (!message && searchValues) {
      message = `${t1(
        'this_action_will_affect_all_users_that_matched_search_conditions',
      )}. ${t1('are_you_sure_you_want_to_continue?')}`;
    }

    return (
      <div>
        <div>{message}</div>
        <br />
        <NodeNew
          closeModal
          dialogKey={dialogKey}
          formid={formid}
          searchFormId={searchFormId}
          submitLabels={{ new: submitLabel || t1('submit') }}
          requestSuccessful={requestSuccessful}
          params={{
            search_values: searchValues,
            ids: items && items.map((item) => lodashGet(item, 'id')),
            act,
          }}
          schema={{}}
          alternativeApi={
            apiUrls.perform_action_on_relations_between_user_and_learning_item
          }
        />
      </div>
    );
  }
}

Form.propTypes = {
  className: PropTypes.string,
};

Form.defaultProps = {
  className: '',
};

export default Form;
