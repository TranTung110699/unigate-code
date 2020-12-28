/**
 * Created by hungvo on 21/11/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NodeNew from 'components/admin/node/new/index';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'components/common/mui/FlatButton';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import { getUrl } from 'routes/links/common';
import { t1, t2 } from 'translate';
import { Redirect } from 'react-router-dom';
import PlanEditer from './PlanEditer';
import planSchema from '../../schema/form';

class PlanEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paramsSearch: {},
      newUrl: null,
      hiddenButtonCreate: null,
      openDialog: false,
    };
  }

  handleOnChangeFormNew = (value) => {
    this.setState({
      paramsSearch: value,
    });
  };

  handleGoToCreate = () => {
    this.setState({
      openDialog: false,
    });
  };

  handleCloseDialog = () => {
    this.setState({
      openDialog: false,
      newUrl: null,
    });
  };

  renderResultComponent = (items) => {
    const { paramsSearch, hiddenButtonCreate } = this.state;
    let create = false;
    if (hiddenButtonCreate === null) {
    } else if (
      !items ||
      !items.length ||
      (items &&
        items.length &&
        paramsSearch &&
        paramsSearch.semester &&
        paramsSearch.semester.length &&
        items.length < paramsSearch.semester.length)
    ) {
      create = true;
    }

    if (hiddenButtonCreate === create || hiddenButtonCreate === null) {
      paramsSearch.create = create;
      this.setState({
        hiddenButtonCreate: !create,
        paramsSearch,
      });
    }

    if (!items || !items.length) {
      return <div />;
    }
    return (
      <div style={create ? {} : { marginTop: 80 }}>
        {items.map((item) => (
          <PlanEditer key={item && item.id} plan={item} />
        ))}
      </div>
    );
  };

  render() {
    if (this.state.newUrl && !this.state.openDialog) {
      return <Redirect to={this.state.newUrl} />;
    }

    const actions = [
      <FlatButton
        label={t1('cancel')}
        primary
        onClick={this.handleCloseDialog}
      />,
      <FlatButton
        label={t1('go_to')}
        primary
        onClick={this.handleGoToCreate}
      />,
    ];

    return (
      <div>
        <NodeNew
          resetForm={false}
          ntype={'plan'}
          schema={planSchema}
          mode="new"
          formid="new_plan"
          searchFormId="plan_search"
          onChange={(value) => {
            this.handleOnChangeFormNew(value);
          }}
          requestFailedCallback={(res) => {
            if (res && !res.success && res.err_code === 23) {
              const newUrl = getUrl('plan', { action: 'major-program' });
              this.setState({
                newUrl,
                openDialog: true,
              });
            }
          }}
          hideSubmitButton={this.state.hiddenButtonCreate}
        />
        <SearchWrapper
          formid="plan_search"
          renderResultsComponent={this.renderResultComponent}
          hiddenFields={this.state.paramsSearch}
          showQueryField={false}
          showResult
          classWapperSearchButton="text-center"
          autoSearchWhenStart={false}
          autoSearchWhenValuesChange={!this.state.hiddenButtonCreate}
          showSearchButton={this.state.hiddenButtonCreate}
        />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleCloseDialog}
        >
          {t2('major_program_missing._create_new')}
        </Dialog>
      </div>
    );
  }
}

PlanEditor.propTypes = {
  formid: PropTypes.string,
};
// Specifies the default values for props:
PlanEditor.defaultProps = {
  formid: 'new_plan',
};

export default PlanEditor;
