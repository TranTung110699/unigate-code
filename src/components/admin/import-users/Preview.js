/* eslint-disable no-undef */
import React from 'react';
import get from 'lodash.get';
import { t, t1 } from 'translate';
import Steps from 'antd/lib/steps';
import Paper from 'material-ui/Paper';
import Widget from 'components/common/Widget';
import NodeNew from 'components/admin/node/new';
import Loading from 'components/common/loading';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import fetchData from 'components/common/fetchData';

import LoginableFieldsHelp from './compare-data/LoginableFieldsHelp';

import previewSchema from './compare-data/schema-form';
import CompareData from './compare-data';
import resolveWarningAttributeSchema from './resolveWarningAttributeSchema';
import RaisedButton from '../../common/mui/RaisedButton';
import Card from 'antd/lib/card';
import apiUrls from './endpoints';

const { Step } = Steps;

class PreviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  searchFormId = 'import_students_form_preview';

  renderPreviewComponent = (data, props) => {
    return (
      <CompareData
        valuesToCompare={get(props, 'formValues')}
        dataCompare={data}
        searchFormId={this.searchFormId}
        importInformation={this.props.info}
        node={this.props.node}
        resetCompare={Date.now()}
        importFields={this.props.importFields}
        allowInserting={this.props.allowInserting}
        importUsersInNode={this.props.importUsersInNode}
      />
    );
  };

  elementFixWarningAttribute = () => {
    const { warningFields, importId, handleRefetch } = this.props;
    return (
      <div>
        <div className="text-center m-b-10">
          <RaisedButton
            className="m-l-10 m-r-10"
            label={t1('skip')}
            onClick={() => {
              this.setState(() => ({ current: 1 }));
            }}
          />
        </div>
        {Object.keys(warningFields).map((field) => {
          const valuesToResolve = warningFields[field];

          return (
            <Widget title={t1('resolve_field:_%s', [t1(field)])}>
              <div>
                {valuesToResolve.map((node) => (
                  <Paper>
                    <NodeNew
                      schema={resolveWarningAttributeSchema}
                      formid={`warning_attribute_${field}_${node.name}`}
                      node={{ value_to_resolve: node.name }}
                      hiddenFields={{
                        import_id: importId,
                        resolve_field: field,
                      }}
                      requestSuccessful={() => {
                        handleRefetch();
                      }}
                      alternativeApi={apiUrls.resolve_warning_attributes}
                      submitLabel={t1('resolve_field')}
                    />
                  </Paper>
                ))}
              </div>
            </Widget>
          );
        })}
      </div>
    );

    return (
      <NodeNew
        schema={resolveWarningAttributeSchema(warningFields, importId)}
        formid="warning_attribute"
        node={{ warning_fields: warningFields }}
        hiddenFields={{
          import_id: importId,
        }}
        requestSuccessful={() => {
          handleRefetch();
        }}
        alternativeApi={apiUrls.resolve_warning_attributes}
        submitButton={() => [
          <RaisedButton
            name="submit"
            type="submit"
            className="m-l-10 m-r-10"
            label={t1('resolve')}
            primary
          />,
        ]}
      />
    );
  };

  elementPreview = () => {
    const {
      importId,
      importFields,
      uniqueFields,
      importUsersInNode,
      importForItem,
    } = this.props;
    return (
      <div>
        <div className="whitebox">
          {' '}
          <LoginableFieldsHelp />
        </div>
        <SearchWrapper
          className="white-box"
          formid={this.searchFormId}
          hiddenFields={{
            import_id: importId,
            import_for_item: importUsersInNode && importForItem,
            import_in_node: importUsersInNode,
          }}
          schema={previewSchema}
          uniqueFields={uniqueFields}
          importFields={importFields || []}
          renderResultsComponent={this.renderPreviewComponent}
          alternativeApi={apiUrls.compare_data_imported}
          submitLabel={t1('compare_data_imported')}
          noResultText={t1('nothing_to_preview')}
          noNeedBackground
          classFormFilter="white-background p-l-20 p-r-20"
        />
      </div>
    );
  };

  render() {
    const { info, warningFields } = this.props;

    if (!info || !info.id) {
      return <Loading />;
    }

    if (
      !warningFields ||
      !Array.isArray(Object.keys(warningFields)) ||
      !Object.keys(warningFields).length
    ) {
      return this.elementPreview();
    }

    return [
      <Card style={{ maxWidth: '50%', margin: '0 auto' }} size="small">
        <Steps
          initial={0}
          current={this.state.current}
          onChange={(current) => {
            this.setState(() => ({ current }));
          }}
        >
          <Step key={0} title={t1('warning_attribute')} />
          <Step key={1} title={t1('preview_import_users')} />
        </Steps>
      </Card>,
      <div className="m-t-30">
        {this.state.current
          ? this.elementPreview()
          : this.elementFixWarningAttribute()}
      </div>,
    ];
  }
}

export default fetchData((props) => ({
  baseUrl: '/import/index/get-detail',
  params: {
    id: props && props.importId,
  },
  refetchCondition: () => false,
  propKey: 'info',
  formatDataResult: (info = {}) => {
    let warningFields = get(info, 'warning_fields');
    let importFields = get(info, 'extra_info.fields');
    const importForItem = get(info, 'import_for_item');
    let importUsersInNode = !!get(info, 'import_for_item.iid');
    let requiredFields = get(info, 'required_fields');
    let uniqueFields = get(info, 'unique_fields');

    const ntypesAllow = get(info, 'ntypes_allow_inserting_users');
    const ntype = get(props, 'node.ntype') || 'in_system';
    const allowInserting =
      Array.isArray(ntypesAllow) && ntypesAllow.includes(ntype);

    if (!Array.isArray(importFields) || !importFields.length) {
      importFields = [];
    } else {
      importFields = importFields.filter((field) => field && field !== 'stt');
    }

    return {
      info,
      warningFields,
      uniqueFields:
        Array.isArray(uniqueFields) && uniqueFields.length
          ? uniqueFields
          : requiredFields,
      allowInserting,
      importFields,
      importForItem,
      importUsersInNode,
    };
  },
}))(PreviewForm);
