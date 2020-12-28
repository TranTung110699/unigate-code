import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import Tabs from 'components/common/tabs';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import AntdTable from 'antd/lib/table';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiEndpoints from 'api-endpoints';
import DetailOnDialog from 'components/common/detail-on-dialog';
import appliedFeeTemplate from 'components/admin/financial/mainstage/applied-fee-templates/schema/form';
import Icon from 'components/common/Icon';
import { formatMoney } from 'common';
import { convertValueToLabel } from 'components/admin/financial/mainstage/common/index';
import NewForm from './Form';

const formid = 'applied_fee_template_plan_search';

class FeeBySemester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paramsSearch: {},
      newUrl: null,
      hiddenButtonCreate: true,
      openDialog: false,
    };
  }

  getColumnsRenderBySingleDegree = (showActions = true) => {
    const { hiddenFields } = this.props;
    return [
      {
        title: t1('stt'),
        key: 'id',
        className: 'text-center',
        render: (text, row, index) => ({
          children: index + 1,
          props: {
            className: 'text-center',
          },
        }),
      },
      {
        title: t1('form_of_training'),
        render: (text, row, index) => (
          <div>
            <p>{`${t1('training_level')}: ${t1(
              get(row, 'training_level'),
            )} | ${t1('training_mode')}: ${t1(get(row, 'training_mode'))}`}</p>
            <p>{`${t1('major')}: ${get(row, 'majorObject.name')}(#${get(
              row,
              'majorObject.code',
            )}) | ${t1('ico')}: ${get(row, 'icoObject.name')}(#${get(
              row,
              'icoObject.code',
            )})`}</p>
            <p>{`${t1('status')}: ${t1(get(row, 'status'))}`}</p>
          </div>
        ),
      },
      {
        title: t1('semester_applied'),
        render: (text, row, index) => (
          <p>{`${get(row, 'semesterObject.name')} (${get(
            row,
            'semesterObject.start_month',
          )}/${get(row, 'semesterObject.start_year')}-
        ${get(row, 'semesterObject.end_month')}/${get(
            row,
            'semesterObject.end_year',
          )})`}</p>
        ),
      },
      hiddenFields && {
        title: t1('applied_fee_template'),
        children: [
          {
            title: t1('fee_template'),
            key: 'id',
            render: (text, row, index) => ({
              children: get(row, 'appliedFeeTemplate.fee_template.name'),
              props: {
                className: 'text-center',
              },
            }),
          },
          {
            title: t1('amount'),
            key: 'id',
            render: (text, row, index) => `${formatMoney(
              get(row, 'appliedFeeTemplate.fee_template.amount'),
            )}
             ${convertValueToLabel(
               'feeCurrencies',
               get(row, 'appliedFeeTemplate.fee_template.currency'),
             )}`,
          },
          {
            title: t1('applicable_benefits'),
            key: 'id',
            render: (text, row, index) => {
              const benefits = get(
                row,
                'appliedFeeTemplate.applicable_benefits',
              );
              if (!Array.isArray(benefits) || !benefits.length) {
                return null;
              }

              return (
                <div style={{ maxWidth: 350 }}>
                  {benefits
                    .map((benefit) => {
                      return get(benefit, 'name');
                    })
                    .join(' | ')}
                </div>
              );
            },
          },
        ],
      },
      showActions && {
        title: t1('actions'),
        render: (text, row) => (
          <div>
            {!get(row, 'appliedFeeTemplate.fee_template') && (
              <DetailOnDialog
                renderPreview={({ showFull }) => (
                  <RaisedButton
                    icon={<Icon icon="plus" />}
                    label={t1('new_applied_fee_template')}
                    onClick={showFull}
                  />
                )}
                renderFull={({ closeDialog }) =>
                  this.handleAppliedFeeTempalte(
                    [
                      {
                        id: get(row, 'id'),
                        iid: get(row, 'iid'),
                        name: get(row, 'name'),
                        semester: get(row, 'semester'),
                        ico: get(row, 'ico'),
                        ntype: 'plan',
                      },
                    ],
                    closeDialog,
                  )
                }
                dialogKey="new_applied_fee_template"
              />
            )}
          </div>
        ),
      },
    ].filter(Boolean);
  };

  getColumnsRenderByMultiDegree = (showActions = true) => {
    const { hiddenFields } = this.props;
    return [
      {
        title: t1('stt'),
        className: 'text-center',
        key: 'id',
        render: (text, row, index) => ({
          children: index + 1,
          props: {
            className: 'text-center',
          },
        }),
      },
      {
        title: t1('name'),
        key: 'id',
        render: (text, row, index) => {
          return `${get(row, 'name')} (#${get(row, 'code')})`;
        },
      },
      {
        title: t1('forms_of_training'),
        key: 'id',
        render: (text, row, index) => {
          const formsOfTraining = get(row, 'forms_of_training') || [];
          return (
            <ol>
              {formsOfTraining.map((formOfTraining) => {
                return (
                  <li>
                    <p>{`${t1('faculty')}: ${get(
                      formOfTraining,
                      'facultyObject.name',
                    )}(#${get(formOfTraining, 'facultyObject.code')}) | ${t1(
                      'major',
                    )}: ${get(formOfTraining, 'majorObject.name')}(#${get(
                      formOfTraining,
                      'majorObject.code',
                    )})`}</p>
                    <p>{`${t1('training_level')}: ${t1(
                      get(formOfTraining, 'training_level'),
                    )} | ${t1('training_mode')}: ${t1(
                      get(formOfTraining, 'training_mode'),
                    )}`}</p>
                  </li>
                );
              })}
            </ol>
          );
        },
      },
      {
        title: t1('target_applied'),
        render: (text, row, index) => (
          <div>
            <p>{`${t1('semester')}: ${get(row, 'semesterObject.name')} (${get(
              row,
              'semesterObject.start_month',
            )}/${get(row, 'semesterObject.start_year')}-
        ${get(row, 'semesterObject.end_month')}/${get(
              row,
              'semesterObject.end_year',
            )})`}</p>
            <p>{`${t1('ico')}: ${get(row, 'icoObject.name')} (#${get(
              row,
              'icoObject.code',
            )})`}</p>
          </div>
        ),
      },
      hiddenFields && {
        title: t1('applied_fee_template'),
        children: [
          {
            title: t1('fee_template'),
            key: 'id',
            render: (text, row, index) => ({
              children: get(row, 'appliedFeeTemplate.fee_template.name'),
              props: {
                className: 'text-center',
              },
            }),
          },
          {
            title: t1('amount'),
            key: 'id',
            render: (text, row, index) => `${formatMoney(
              get(row, 'appliedFeeTemplate.fee_template.amount'),
            )}
             ${convertValueToLabel(
               'feeCurrencies',
               get(row, 'appliedFeeTemplate.fee_template.currency'),
             )}`,
          },
          {
            title: t1('applicable_benefits'),
            key: 'id',
            render: (text, row, index) => {
              const benefits = get(
                row,
                'appliedFeeTemplate.applicable_benefits',
              );
              if (!Array.isArray(benefits) || !benefits.length) {
                return null;
              }

              return (
                <div style={{ maxWidth: 350 }}>
                  {benefits
                    .map((benefit) => {
                      return get(benefit, 'name');
                    })
                    .join(' | ')}
                </div>
              );
            },
          },
        ],
      },
      showActions && {
        title: t1('actions'),
        render: (text, row) => (
          <div>
            {!get(row, 'appliedFeeTemplate.fee_template') && (
              <DetailOnDialog
                renderPreview={({ showFull }) => (
                  <RaisedButton
                    icon={<Icon icon="plus" />}
                    label={t1('new_applied_fee_template')}
                    onClick={showFull}
                  />
                )}
                renderFull={({ closeDialog }) =>
                  this.handleAppliedFeeTempalte(
                    [
                      {
                        id: get(row, 'degree_id'),
                        iid: get(row, 'iid'),
                        name: get(row, 'name'),
                        semester: get(row, 'semester'),
                        ico: get(row, 'ico'),
                        ntype: 'multi-degree',
                        forms_of_training: get(
                          row,
                          'forms_of_training',
                          [],
                        ).map((form_of_training) => {
                          return {
                            major: get(form_of_training, 'major'),
                            training_level: get(
                              form_of_training,
                              'training_level',
                            ),
                            training_mode: get(
                              form_of_training,
                              'training_mode',
                            ),
                          };
                        }),
                      },
                    ],
                    closeDialog,
                  )
                }
                dialogKey="new_applied_fee_template"
              />
            )}
          </div>
        ),
      },
    ].filter(Boolean);
  };

  handleAppliedFeeTempalte = (target_items = {}, closeDialog) => {
    const hiddenFields = {
      type: 'fee_by_ico_semester',
      target_items,
    };

    if (this.props.hiddenFields) {
      hiddenFields.status = 'approved';
    }

    return (
      <NewForm
        mode="new"
        hiddenFields={hiddenFields}
        searchFormId={formid}
        requestSuccessful={closeDialog}
      />
    );
  };

  checkShowButtonApply = (items) => {
    if (!Array.isArray(items) || !items.length) {
      return false;
    }
    const check = items.find((item) => {
      return !get(item, 'appliedFeeTemplate.fee_template');
    });

    return !check;
  };

  renderResultComponent = (type = 'single_degree', items) => {
    const { submitButton } = this.props;

    let showButton = false;
    if (submitButton) {
      showButton = this.checkShowButtonApply(items);
    }

    return [
      <AntdTable
        columns={
          type === 'multi_degree'
            ? this.getColumnsRenderByMultiDegree(!showButton)
            : this.getColumnsRenderBySingleDegree(!showButton)
        }
        dataSource={Array.isArray(items) ? items : []}
        pagination={false}
        bordered
        size="middle"
      />,
      showButton && <div className="text-center">{submitButton}</div>,
    ];
  };

  renderSearchForm = (type = 'single_degree') => {
    const { hiddenFields } = this.props;
    if (hiddenFields) {
      hiddenFields.items_per_page = -1;
    }
    return (
      <SearchWrapper
        formid={formid}
        alternativeApi={
          type === 'multi_degree'
            ? '/degree/api/search-multi-degree-to-apply-fee'
            : apiEndpoints.plan_search
        }
        renderResultsComponent={(items) => {
          return this.renderResultComponent(type, items);
        }}
        hiddenFields={
          hiddenFields || {
            ...this.state.paramsSearch,
            _sand_step: 'new_applied_fee_template',
          }
        }
        mode="search"
        schema={hiddenFields ? {} : appliedFeeTemplate}
        showQueryField={false}
        showResult
        // resetForm
        autoSearchWhenStart={!!hiddenFields}
        autoSearchWhenValuesChange={!!hiddenFields}
        showSearchButton={!hiddenFields}
      />
    );
  };

  render() {
    const { hiddenFields } = this.props;
    return (
      <Tabs
        tabs={[
          {
            label: t1('single_degree'),
            content: this.renderSearchForm('single_degree'),
          },
          {
            label: t1('multi_degree'),
            content: this.renderSearchForm('multi_degree'),
          },
        ]}
      />
    );
  }
}

export default connect()(FeeBySemester);
