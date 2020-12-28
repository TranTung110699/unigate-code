import React from 'react';
import getLodash from 'lodash.get';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import { getSchemaApplyMajorProgram } from 'components/admin/plan/schema/form';
import { Link } from 'react-router-dom';
import { getUrl } from 'routes/links/common';
import DetailOnDialog from 'components/common/detail-on-dialog';
import FlatButton from 'components/common/mui/FlatButton';
import NodeNew from 'components/admin/node/new/index';

const type = 'edit_apply_program_specialization';
const DetaiProgramSpecializationAppliedInFormOfTraining = (props) => {
  const {
    training_mode,
    training_level,
    icos,
    program,
    specializations,
    iidsAllowToEdit,
    elementEditProgramSpecializationAppliedInFormOfTraining,
  } = props;

  return (
    <div>
      <p>
        {t1('program_applied')}:
        <Link to={getUrl('node_edit', { ...program, ntype: 'program' })}>
          {program && program.name}
        </Link>
        {Array.isArray(iidsAllowToEdit) &&
          iidsAllowToEdit.includes(program && program.iid) && (
            <DetailOnDialog
              renderPreview={({ showFull }) => (
                <FlatButton icon={<Icon icon="edit" />} onClick={showFull} />
              )}
              renderFull={({ closeDialog }) => {
                const hiddenFields = {
                  type: 'program_apply',
                  major: getLodash(props, 'major.iid'),
                  training_mode: getLodash(props, 'training_mode'),
                  training_level: getLodash(props, 'training_level'),
                  program: getLodash(props, 'program.iid'),
                  ico: Array.isArray(icos) && icos.map((ico) => ico.iid),
                };
                return (
                  <NodeNew
                    resetForm={true}
                    ntype={'plan'}
                    schema={getSchemaApplyMajorProgram(hiddenFields)}
                    hiddenFields={hiddenFields}
                    mode="new"
                    formid={'major_program'}
                    searchFormId={props.searchFormId}
                    requestSuccessful={closeDialog}
                    alternativeApi={apiUrls.update_major_program}
                  />
                );
              }}
            />
          )}
      </p>
      {Array.isArray(specializations) &&
        !!specializations.length && [
          <p>{t1('program_specialization_applied')}:</p>,
          <ul>
            {specializations.map((programSpecialization) => (
              <li>
                <div>
                  {`${getLodash(
                    programSpecialization,
                    'specialization.name',
                  )} (#${getLodash(
                    programSpecialization,
                    'specialization.code',
                  )}) `}
                  <span>
                    <Icon icon="horizontal" />
                  </span>
                  {` ${getLodash(
                    programSpecialization,
                    'program_module.name',
                  )} (#${getLodash(
                    programSpecialization,
                    'program_module.code',
                  )}) `}
                  {Array.isArray(iidsAllowToEdit) &&
                    iidsAllowToEdit.includes(
                      getLodash(programSpecialization, 'specialization.iid'),
                    ) &&
                    elementEditProgramSpecializationAppliedInFormOfTraining(
                      {
                        major: getLodash(props, 'major.iid'),
                        training_mode,
                        training_level,
                        program: getLodash(props, 'program.iid'),
                        specialization: getLodash(
                          programSpecialization,
                          'specialization.iid',
                        ),
                      },
                      {
                        program_module: getLodash(
                          programSpecialization,
                          'program_module.iid',
                        ),
                      },
                      {
                        renderPreview: ({ showFull }) => (
                          <Icon
                            icon="edit"
                            className="action"
                            onClick={showFull}
                          />
                        ),
                      },
                    )}
                </div>
              </li>
            ))}
          </ul>,
        ]}
    </div>
  );
};

export default fetchData((props) => ({
  baseUrl: apiUrls.check_allow_to_edit_of_teaching_plan_major_program,
  params: {
    type,
    major: getLodash(props, 'major.iid'),
    training_mode: getLodash(props, 'training_mode'),
    training_level: getLodash(props, 'training_level'),
    program: getLodash(props, 'program.iid'),
  },
  propKey: 'iidsAllowToEdit',
  fetchCondition:
    getLodash(props, 'major.iid') &&
    getLodash(props, 'training_mode') &&
    getLodash(props, 'training_level') &&
    getLodash(props, 'program.iid'),
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
}))(DetaiProgramSpecializationAppliedInFormOfTraining);
