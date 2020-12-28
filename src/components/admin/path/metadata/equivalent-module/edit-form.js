import React from 'react';
import { t1 } from 'translate';
import getLodash from 'lodash.get';
import { ntype as allNtype } from 'configs/constants/index';
import apiUrls from 'api-endpoints';
import fetchData from 'components/common/fetchData';
import NodeNew from 'components/admin/node/new';
import Loading from 'components/common/loading';
import Icon from 'components/common/Icon';
import RaisedButton from 'components/common/mui/RaisedButton';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import TreeCheckbox from 'schema-form/elements/tree-check-box/new';

const alternativeApi = '/path/api/applied-equivalent-module';

const schema = ({ treeData, expandedNodes, defaultValue }) => ({
  schema: {
    equivalent_module_iid: {
      type: TreeCheckbox,
      expandedNodes,
      defaultValue:
        Array.isArray(defaultValue) && defaultValue.map((val) => String(val)),
      checkParentEqualCheckAllChildren: false,
      doNotSelectChildrenWhenParentSelected: true,
      multiSelectable: true,
      treeData,
    },
  },
  ui: () => [
    {
      id: 'default',
      fields: ['equivalent_module_iid'],
    },
  ],
});

const getTreeDataToRenderElementTreeWiew = (tree, iidDisabled = []) => {
  const result = [];
  let expanded = [];
  if (!tree || !Array.isArray(tree.children)) {
    return result;
  }
  tree.children.forEach((chil) => {
    const newNode = {
      ...chil,
      value: chil.iid,
      disabled: iidDisabled.includes(chil.iid),
      key: chil.iid,
      title: (
        <div>
          <Icon icon={chil.ntype} />
          {chil.name}{' '}
          <span className="text-muted">
            (#
            {chil.code})
          </span>
        </div>
      ),
    };
    if (Array.isArray(chil.children) && chil.children.length) {
      const { treeData, expandedNodes } = getTreeDataToRenderElementTreeWiew(
        chil,
        iidDisabled,
      );
      if (treeData.length) {
        expanded = expanded.concat(expandedNodes, [String(chil.iid)]);
        newNode.children = treeData;
      }
    }
    result.push(newNode);
  });
  return { treeData: result, expandedNodes: expanded };
};

class Form extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      equivalentModuleIid: [],
    };
  }

  handleOnChange = ({ equivalent_module_iid }) => {
    this.setState((state) => ({
      ...state,
      equivalentModuleIid: equivalent_module_iid || [],
    }));

    if (
      !Array.isArray(equivalent_module_iid) ||
      equivalent_module_iid.length !== 1
    ) {
      return;
    }
    const iid = equivalent_module_iid[0];
    const {
      handleRefetch,
      data: { applied_equivalent_module },
    } = this.props;

    if (
      !Array.isArray(applied_equivalent_module) ||
      applied_equivalent_module.map((val) => String(val)).includes(iid)
    ) {
      return;
    }

    const params = {
      program_iid: getLodash(this.props, 'program.iid'),
      item_iid: iid,
    };

    handleRefetch(params);
  };

  renderSubmitButton = (equivalentModuleIid = []) => {
    const submitButton = (
      <RaisedButton
        className="m-l-5 m-r-5"
        icon={<Icon icon="plus" />}
        label={t1('applied')}
        primary
        disabled={equivalentModuleIid.length <= 1}
        type="submit"
      />
    );
    const removeApplied = Array.isArray(equivalentModuleIid) &&
      equivalentModuleIid.includes(String(getLodash(this.props, 'node.iid'))) &&
      getLodash(this.props, 'data.applied_equivalent_module', []).length >
        1 && (
        <DeleteItem
          renderComponent={({ onClick }) => (
            <RaisedButton
              secondary
              onClick={onClick}
              className="m-l-5 m-r-5"
              icon={<Icon icon="delete" />}
              label={t1('remove_applied')}
            />
          )}
          params={{
            program: getLodash(this.props, 'program.iid'),
            equivalent_module_iid: [getLodash(this.props, 'node.iid')],
          }}
          onRequestSuccessful={() => {
            if (typeof this.props.closeDialog === 'function') {
              this.props.closeDialog();
            }
          }}
          alternativeApi={alternativeApi}
        />
      );

    return (
      <div className="text-center">
        {removeApplied}
        {submitButton}
      </div>
    );
  };

  render() {
    const { program, data } = this.props;
    if (!data) {
      return <Loading />;
    }
    const {
      tree,
      applied_equivalent_module,
      other_applied_equivalent_module,
    } = data;

    if (!tree) {
      return <h3>{t1('not_applicable_to_this_node')}</h3>;
    }

    const { treeData, expandedNodes } = getTreeDataToRenderElementTreeWiew(
      tree,
      Array.isArray(other_applied_equivalent_module)
        ? other_applied_equivalent_module.map((val) => String(val))
        : [],
    );

    const hiddenFields = {
      program: getLodash(program, 'iid'),
    };

    return (
      <NodeNew
        resetForm
        alternativeApi={alternativeApi}
        ntype={'path'}
        schema={schema({
          treeData,
          expandedNodes,
          defaultValue: applied_equivalent_module,
        })}
        mode="new"
        onChange={this.handleOnChange}
        formid="edit_equivalent_module"
        hiddenFields={hiddenFields}
        submitButton={this.renderSubmitButton(this.state.equivalentModuleIid)}
      />
    );
  }
}

const getDetailInformationFormsOfTraing = (props) => ({
  baseUrl: apiUrls.get_data_to_edit_equivalent_module,
  fetchCondition:
    getLodash(props, 'program.ntype') === allNtype.PATH &&
    getLodash(props, 'program.type') === allNtype.PROGRAM &&
    getLodash(props, 'node.iid'),
  params: {
    program_iid: getLodash(props, 'program.iid'),
    item_iid: getLodash(props, 'node.iid'),
    item_ntype: getLodash(props, 'node.ntype'),
  },
  propKey: 'data',
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
});

export default fetchData(getDetailInformationFormsOfTraing)(Form);
