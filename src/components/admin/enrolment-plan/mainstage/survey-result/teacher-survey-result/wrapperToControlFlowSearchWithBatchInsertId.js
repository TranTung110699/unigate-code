import React from 'react';
import { formValueSelector, change, submit } from 'redux-form';
import { connect } from 'react-redux';
import { getSearchFormId } from './common';
import lodashGet from 'lodash.get';

const wrapperToControlFlowSearchWithBatchInsertId = (Component) => {
  class Wrapped extends React.Component {
    changeBatchInsertIdRequested = false;

    componentDidUpdate(prevProps, prevState, snapshot) {
      const {
        dispatch,
        searchFormId,
        batchInsertIdInSearchForm,
        newestBatchInsertIdFromServer,
      } = this.props;

      if (
        lodashGet(prevProps, 'newestBatchInsertIdFromServer') !==
        newestBatchInsertIdFromServer
      ) {
        dispatch(
          change(
            searchFormId,
            'batch_insert_id',
            newestBatchInsertIdFromServer,
          ),
        );
        this.changeBatchInsertIdRequested = true;
      }

      if (
        this.changeBatchInsertIdRequested &&
        newestBatchInsertIdFromServer === batchInsertIdInSearchForm
      ) {
        dispatch(submit(searchFormId));
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = (state, props) => {
    const { node } = props;
    const searchFormId = getSearchFormId(node);

    return {
      newestBatchInsertIdFromServer: lodashGet(
        state,
        `clientDataBase.${searchFormId}.batch_insert_info.id`,
      ),
      searchFormId,
      batchInsertIdInSearchForm: formValueSelector(searchFormId)(
        state,
        'batch_insert_id',
      ),
    };
  };

  return connect(mapStateToProps)(Wrapped);
};

export default wrapperToControlFlowSearchWithBatchInsertId;
