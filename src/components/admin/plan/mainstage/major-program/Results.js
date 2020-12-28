/**
 * Created by hungvo on 19/04/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';
import { t1 } from 'translate/index';
import get from 'lodash.get';
import AntdTable from 'antd/lib/table';
import Icon from 'components/common/Icon';
import NodeNew from 'components/admin/node/new/index';
import DetailOnDialog from 'components/common/detail-on-dialog';
import RaisedButton from 'components/common/mui/RaisedButton';
import FlatButton from 'components/common/mui/FlatButton';
import {
  getSchemaApplyMajorProgram,
  getSchemaApplyScoreScaleByIco,
  getSchemaApplySpecializationProgram,
} from 'components/admin/plan/schema/form';
import { Link } from 'react-router-dom';
import apiUrls from 'api-endpoints';
import { getUrl } from 'routes/links/common';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import DetaiProgramSpecializationAppliedInFormOfTraining from './DetaiProgramSpecializationAppliedInFormOfTraining';

class Results extends Component {
  formatDataForRenderMajorProgramsApplied = (items) => {
    if (!Array.isArray(items) || !items.length) {
      return [];
    }

    const results = [];
    let rowIndex = 0;
    items.forEach((row) => {
      const majorIndex = results.length;
      const major = row.major;
      rowIndex += 1;
      row.formsOfTraining.forEach((formOfTraining) => {
        const formOfTrainingIndex = results.length;

        formOfTraining.appliedIcoToProgramFormOfTraining.forEach(
          (appliedIcoToProgram) => {
            const appliedIcoToProgramFormOfTrainingIndex = results.length;

            const specializations = [];
            let specializationIids =
              Array.isArray(major.degrees) && major.degrees.length
                ? major.degrees
                    .map(
                      (degree) =>
                        degree.training_level ===
                          formOfTraining.training_level &&
                        degree.training_mode === formOfTraining.training_mode &&
                        degree.specialization,
                    )
                    .filter(Boolean)
                : [];

            if (
              specializationIids.length &&
              Array.isArray(appliedIcoToProgram.specializations)
            ) {
              appliedIcoToProgram.specializations.forEach(
                (appliedProgramSpecialization) => {
                  if (
                    appliedProgramSpecialization.specialization &&
                    appliedProgramSpecialization.program_module
                  ) {
                    specializationIids = specializationIids.filter(
                      (iid) =>
                        iid !==
                        get(appliedProgramSpecialization, 'specialization.iid'),
                    );
                    specializations.push({ ...appliedProgramSpecialization });
                  }
                },
              );
            }

            if (
              Array.isArray(appliedIcoToProgram.icos) &&
              appliedIcoToProgram.icos.length
            ) {
              appliedIcoToProgram.icos.forEach((ico) => {
                const ico_score_scale =
                  Array.isArray(appliedIcoToProgram.ico_score_scales) &&
                  appliedIcoToProgram.ico_score_scales.find((icoScoreScale) => {
                    return (icoScoreScale.ico = ico.iid);
                  });
                results.push({
                  major,
                  training_mode: formOfTraining.training_mode,
                  training_level: formOfTraining.training_level,
                  ico,
                  score_scale:
                    get(ico_score_scale, 'score_scale') ||
                    get(appliedIcoToProgram, 'default_score_scale.score_scale'),
                  exchange_pmd: ico_score_scale,
                });
              });
            }

            if (results[appliedIcoToProgramFormOfTrainingIndex]) {
              results[appliedIcoToProgramFormOfTrainingIndex] = Object.assign(
                results[appliedIcoToProgramFormOfTrainingIndex],
                {
                  specializations,
                  specializationIids,
                  program: appliedIcoToProgram.program,
                  icos: appliedIcoToProgram.icos,
                  appliedIcoToProgramFormOfTrainingRowSpan:
                    results.length - appliedIcoToProgramFormOfTrainingIndex,
                },
              );
            } else {
              results.push({
                specializations,
                specializationIids,
                program: appliedIcoToProgram.program,
                appliedIcoToProgramFormOfTrainingRowSpan: 1,
              });
            }
          },
        );

        if (results[formOfTrainingIndex]) {
          results[formOfTrainingIndex] = Object.assign(
            results[formOfTrainingIndex],
            {
              formOfTrainingRowSpan: results.length - formOfTrainingIndex,
            },
          );
        }
      });

      if (results[majorIndex]) {
        results[majorIndex] = Object.assign(results[majorIndex], {
          majorRowSpan: results.length - majorIndex,
          rowIndex,
        });
      }
    });

    return results;
  };

  getColumns = (props) => {
    const { hiddenFieldResults, exchangePmds } = props;

    return [
      {
        title: t1('stt'),
        key: 'id',
        render: (text, row, index) => ({
          children: get(row, 'rowIndex'),
          props: {
            rowSpan: get(row, 'majorRowSpan') || 0,
            className: 'text-center',
          },
        }),
      },
    ].concat(
      [
        !(
          Array.isArray(hiddenFieldResults) &&
          hiddenFieldResults.includes('major')
        ) && {
          title: t1('major'),
          key: 'id',
          render: (text, row, index) => ({
            children: (
              <Link
                to={getUrl('node_edit', {
                  ...(get(row, 'major') || {}),
                  ntype: 'major',
                })}
                target="_blank"
              >
                {`${get(row, 'major.name')} (#${get(row, 'major.code')})`}
              </Link>
            ),
            props: {
              rowSpan: get(row, 'majorRowSpan') || 0,
            },
          }),
        },
        {
          title: t1('traning_mode/training_level'),
          key: 'id',
          render: (text, row, index) => ({
            children: `${t1(get(row, 'training_mode'))} / ${t1(
              get(row, 'training_level'),
            )}`,
            props: {
              rowSpan: get(row, 'formOfTrainingRowSpan') || 0,
              className: 'text-center',
            },
          }),
        },
        {
          title: t1('icos_and_programs_applied'),
          children: [
            {
              title: t1('program'),
              key: 'id',
              render: (text, row, index) => ({
                children: (
                  <DetaiProgramSpecializationAppliedInFormOfTraining
                    {...row}
                    searchFormId={props.formid}
                    elementEditProgramSpecializationAppliedInFormOfTraining={
                      this
                        .elementEditProgramSpecializationAppliedInFormOfTraining
                    }
                  />
                ),
                props: {
                  rowSpan:
                    get(row, 'appliedIcoToProgramFormOfTrainingRowSpan') || 0,
                },
              }),
            },
            {
              title: t1('ico_applied'),
              key: 'id',
              render: (text, row, index) => (
                <div>
                  {`${get(row, 'ico.name')} (#${get(row, 'ico.code')}) `}
                  <DeleteItem
                    iconButton
                    icon="delete"
                    className="m-l-10 m-r-10"
                    label={t1('remove')}
                    labelPosition="after"
                    alternativeApi={apiUrls.update_major_program}
                    params={{
                      type: 'remove_apply_ico',
                      major: get(row, 'major.iid'),
                      training_level: get(row, 'training_level'),
                      training_mode: get(row, 'training_mode'),
                      program: get(row, 'program.iid'),
                      ico: get(row, 'ico.iid'),
                    }}
                    closeDialogAfterActionSuccessFull
                    title={t1('remove_apply')}
                    formid={this.props.formid}
                  />
                </div>
              ),
            },
            {
              title: t1('score_scale'),
              key: 'id',
              render: (text, row, index) => {
                return (
                  <div>
                    {get(row, 'score_scale')
                      ? t1(`score_scale_${get(row, 'score_scale')} `)
                      : ''}
                    <DetailOnDialog
                      renderPreview={({ showFull }) => (
                        <Icon
                          icon="edit"
                          className="action"
                          onClick={showFull}
                        />
                      )}
                      renderFull={() => {
                        const exchangePmd = get(row, 'exchange_pmd.exchange')
                          ? get(row, 'exchange_pmd')
                          : Array.isArray(exchangePmds) &&
                            exchangePmds.find(
                              (map) =>
                                map.training_mode ===
                                  get(row, 'training_mode') &&
                                map.training_level ===
                                  get(row, 'training_level'),
                            );

                        return this.renderFormEditScoreScale(
                          {
                            major: get(row, 'major.iid'),
                            training_mode: get(row, 'training_mode'),
                            training_level: get(row, 'training_level'),
                            program: get(row, 'program.iid'),
                            ico: get(row, 'ico.iid'),
                          },
                          {
                            ico: get(row, 'ico.iid'),
                            score_scale: get(row, 'score_scale'),
                          },
                          {
                            specializations: get(row, 'specializations'),
                            defaultValues: exchangePmd,
                          },
                        );
                      }}
                    />
                  </div>
                );
              },
            },
          ],
        },
        {
          title: t1('actions'),
          className: 'text-center',
          key: 'id',
          render: (text, row, index) => ({
            children: (
              <div>
                <DetailOnDialog
                  renderPreview={({ showFull }) => (
                    <FlatButton
                      title={t1('apply_ico_to_tearching_plan_major_program')}
                      label={t1('apply_ico')}
                      icon={<Icon icon="plus" />}
                      onClick={showFull}
                    />
                  )}
                  renderFull={({ closeDialog }) =>
                    this.formCreateTheAppliedTeachingPlanMajorProgram(
                      {
                        major: get(row, 'major.iid'),
                        training_mode: row.training_mode,
                        training_level: row.training_level,
                        program: get(row, 'program.iid'),
                      },
                      closeDialog,
                    )
                  }
                />
                {Array.isArray(row.specializationIids) &&
                  row.specializationIids.length > 0 && (
                    <DetailOnDialog
                      renderPreview={({ showFull }) => (
                        <FlatButton
                          title={t1(
                            'apply_specialization_program_to_tearching_plan_major_program',
                          )}
                          label={t1('apply_specialization_program')}
                          icon={<Icon icon="plus" />}
                          onClick={showFull}
                        />
                      )}
                      renderFull={({ closeDialog }) =>
                        this.renderFormApplySpecializationProgram(
                          {
                            major: get(row, 'major.iid'),
                            training_mode: row.training_mode,
                            training_level: row.training_level,
                            program: get(row, 'program.iid'),
                            specializationIids: get(row, 'specializationIids'),
                          },
                          {},
                          closeDialog,
                        )
                      }
                    />
                  )}
              </div>
            ),
            props: {
              rowSpan:
                get(row, 'appliedIcoToProgramFormOfTrainingRowSpan') || 0,
              className: 'text-center',
            },
          }),
        },
      ].filter(Boolean),
    );
  };

  formCreateTheAppliedTeachingPlanMajorProgram = (
    hiddenFields,
    closeDialog,
    defaultValues = {},
  ) => (
    <NodeNew
      resetForm
      ntype={'plan'}
      schema={getSchemaApplyMajorProgram(hiddenFields)}
      hiddenFields={hiddenFields}
      mode="new"
      node={defaultValues}
      step="major-program"
      formid={'major_program'}
      searchFormId={this.props.formid}
      requestSuccessful={closeDialog}
      submitButton={
        hiddenFields && Object.keys(hiddenFields).length ? (
          <div className="text-center">
            <RaisedButton
              icon={<Icon icon="update" />}
              label={t1('apply')}
              primary
              type="submit"
            />
          </div>
        ) : null
      }
    />
  );

  renderFormApplySpecializationProgram = (
    hiddenFields,
    node = {},
    closeDialog = () => {},
  ) => {
    const tmp = { ...hiddenFields, type: 'apply-specialization-program' };

    return (
      <NodeNew
        resetForm={false}
        alternativeApi={apiUrls.update_major_program}
        schema={getSchemaApplySpecializationProgram(tmp)}
        hiddenFields={tmp}
        mode="new"
        node={node}
        formid={'major_program'}
        searchFormId={this.props.formid}
        requestSuccessful={() => {
          closeDialog();
        }}
        submitButton={
          <div className="text-center">
            <RaisedButton
              icon={<Icon icon="update" />}
              label={t1('update')}
              primary
              type="submit"
            />
          </div>
        }
      />
    );
  };

  renderFormEditScoreScale = (hiddenFields, node = {}, option) => {
    const tmp = { ...hiddenFields, type: 'edit_score_scale' };

    return (
      <NodeNew
        resetForm
        searchFormId={this.props.formid}
        alternativeApi={apiUrls.update_major_program}
        schema={getSchemaApplyScoreScaleByIco(option)}
        hiddenFields={tmp}
        node={node}
        mode="new"
        step="major-program"
        submitButton={
          <div className="text-center">
            <RaisedButton
              icon={<Icon icon="update" />}
              label={t1('update')}
              primary
              type="submit"
            />
          </div>
        }
      />
    );
  };

  elementEditProgramSpecializationAppliedInFormOfTraining = (
    hiddenFields,
    node = {},
    { renderPreview, ...dialogOptionsProperties } = {},
  ) => (
    <DetailOnDialog
      renderPreview={
        renderPreview ||
        (({ showFull }) => (
          <FlatButton icon={<Icon icon="edit" />} onClick={showFull} />
        ))
      }
      renderFull={({ closeDialog }) =>
        this.renderFormApplySpecializationProgram(
          hiddenFields,
          node,
          closeDialog,
        )
      }
      dialogKey={get(hiddenFields, 'specialization')}
      dialogOptionsProperties={dialogOptionsProperties}
    />
  );

  render() {
    const { majorPrograms, paramsSearch, searchFormValues } = this.props;

    const items = this.formatDataForRenderMajorProgramsApplied(majorPrograms);

    return [
      <div className="m-t-30 m-b-30">
        <DetailOnDialog
          renderPreview={({ showFull }) => (
            <RaisedButton
              label={t1('apply_ico_to_teaching_plan_major_program')}
              icon={<Icon icon="plus" />}
              onClick={showFull}
            />
          )}
          renderFull={({ closeDialog }) =>
            this.formCreateTheAppliedTeachingPlanMajorProgram(
              paramsSearch || {},
              closeDialog,
              searchFormValues,
            )
          }
        />
      </div>,
      <div>
        <AntdTable
          columns={this.getColumns(this.props)}
          dataSource={Array.isArray(items) ? items : []}
          pagination={false}
          bordered
          size="middle"
        />
      </div>,
    ];
  }
}

const mapStateToProps = createSelector(
  (state, props) => get(state, 'domainInfo.conf.exchange_pmd_score_scale', []),
  (exchangePmds) => ({
    exchangePmds,
  }),
);
export default connect(mapStateToProps)(Results);
