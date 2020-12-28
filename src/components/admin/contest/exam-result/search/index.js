import React from 'react';
import { connect } from 'react-redux';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import Results from './Results';
import schema from './schema-form-advance';
import contestApiUrls from 'components/admin/contest/endpoints';
import { isContestSharedFromAncestorOrganizations } from '../../common';
import { withRouter } from 'react-router-dom';

import ViewTake from './take/View';
import actions from 'actions/node/creators';
import { getFormValues } from 'redux-form';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import commonSagaActions from 'actions/saga-creators';
import { getThemeConfig } from 'utils/selectors';
import { layouts } from 'configs/constants';

class ExamResultSearch extends React.Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  viewTakeInDialog = (takeId) => {
    const { node } = this.props;

    const optionsProperties = {
      width: '90%',
      handleClose: true,

      modal: true,
      callbacks: {
        onCloseDialog: () => {
          this.props.history.goBack();
        },
      },
    };

    const contentDialog = (
      <ViewTake
        id={takeId}
        readOnly={isContestSharedFromAncestorOrganizations(node)}
      />
    );
    this.props.dispatch(
      actions.handleOpenDialog({ contentDialog, optionsProperties }),
    );
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.takeId && nextProps.takeId != this.props.takeId) {
      this.viewTakeInDialog(nextProps.takeId);
    }
  }

  componentDidMount() {
    if (this.props.takeId) {
      this.viewTakeInDialog(this.props.takeId);
    }
  }

  renderResultComponent(items, props) {
    const { node } = this.props;
    return (
      <div>
        <RaisedButton
          name="export"
          id="export"
          label={t1('export')}
          primary
          icon={<Icon icon="export" />}
          onClick={() => {
            this.exportExamResults();
          }}
          className="m-b-10"
        />
        <Results items={items} node={node} {...props} />
      </div>
    );
  }

  exportExamResults() {
    const { dispatch, examResultSearchValues } = this.props;

    dispatch(
      commonSagaActions.exportDataRequest(
        contestApiUrls.export_exam_results,
        examResultSearchValues,
      ),
    );
  }

  render() {
    const { contestIid, formId, themeConfig } = this.props;

    let hiddenFields = {};

    if (contestIid) {
      hiddenFields = { contest_iid: contestIid, ...hiddenFields };
    }

    return (
      <SearchWrapper
        formid={formId}
        renderResultsComponent={this.renderResultComponent}
        showQueryField={false}
        showSearchButton
        schema={schema}
        hiddenFields={hiddenFields}
        contestIid={contestIid}
        alternativeApi={contestApiUrls.search_exam_results}
        showJobPosition={!(themeConfig.layout === layouts.EVN)}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match, action } = props;
  const formId =
    action && action === 'report'
      ? 'report_exam_result_search'
      : 'exam_result_search';

  return {
    formId,
    action: match && match.params && match.params.action,
    examResultSearchValues: getFormValues(formId)(state),
    themeConfig: getThemeConfig(state),
  };
};

export default connect(mapStateToProps)(withRouter(ExamResultSearch));
