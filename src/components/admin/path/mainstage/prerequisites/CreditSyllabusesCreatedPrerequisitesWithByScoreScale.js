import React from 'react';
import { t1 } from 'translate';
import getLodash from 'lodash.get';
import Icon from 'components/common/Icon';
import apiUrls from 'api-endpoints';
import fetchData from 'components/common/fetchData';
import DetailOnDialog from 'components/common/detail-on-dialog';
import RaisedButton from 'components/common/mui/RaisedButton';
import NodeNew from 'components/admin/node/new';
import ButtonAction from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import schemaApplyCreditSyllabusPrerequisitesInProgram, {
  schemaEditPrerequisitesOfCreditSyllabus,
} from 'components/admin/syllabus/schema/prerequisites-form';

class CreditSyllabusesCreatedPrerequisites extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      subjectEditing: null,
    };
  }

  setItemEditing = (iid = null) => {
    this.setState({ subjectEditing: iid });
  };

  handleSuccessFull = () => {
    this.setItemEditing(null);
    const { dataOnChange } = this.props;
    if (dataOnChange) {
      dataOnChange();
    }
  };

  renderFormEdit = (subject) => (
    <NodeNew
      resetForm
      hiddenFields={{ score_scale: subject.score_scale }}
      node={subject}
      mode="edit"
      requestSuccessful={() => this.setItemEditing(null)}
      step="prerequisites"
      alternativeApi="/syllabus/api/update-credit-syllabus-prerequisites"
      schema={schemaEditPrerequisitesOfCreditSyllabus}
      submitButton={
        <div className="text-center">
          <RaisedButton
            style={{ margin: 10 }}
            icon={<Icon icon="close" />}
            label={t1('cancel')}
            onClick={() => this.setItemEditing(null)}
          />
          <RaisedButton
            style={{ margin: 10 }}
            icon={<Icon icon="push" />}
            label={t1('update')}
            primary
            type="submit"
          />
          <ButtonAction
            alternativeApi="/syllabus/api/delete-applied-credit-syllabus-prerequisites"
            title={t1('delete-applied')}
            icon="delete"
            onRequestSuccessful={this.handleSuccessFull}
            itemId={subject && subject.id}
            raisedButton
            label={t1('delete')}
          />
        </div>
      }
    />
  );

  elementApplyCreditSyllabusPrerequisitesInProgram = (scoreScale, node) => {
    const hiddenFields = {
      score_scale: scoreScale,
      program: node && node.iid,
    };

    return (
      <DetailOnDialog
        renderPreview={({ showFull }) => (
          <div className="text-center">
            <RaisedButton
              label={t1('add_credit_syllabus')}
              icon={<Icon icon="plus" />}
              onClick={showFull}
            />
          </div>
        )}
        renderFull={({ closeDialog }) => (
          <NodeNew
            resetForm
            ntype={'syllabus'}
            step="prerequisites"
            alternativeApi="/syllabus/api/apply-credit-syllabus-prerequisites"
            schema={schemaApplyCreditSyllabusPrerequisitesInProgram(
              hiddenFields,
            )}
            node={hiddenFields}
            hiddenFields={hiddenFields}
            requestSuccessful={() => {
              closeDialog();
              this.handleSuccessFull();
            }}
            submitButton={
              <div className="text-center">
                <RaisedButton
                  icon={<Icon icon="push" />}
                  label={t1('add')}
                  primary
                  type="submit"
                />
              </div>
            }
          />
        )}
        dialogOptionsProperties={{
          width: '80%',
        }}
        dialogKey="edit_core_scale"
      />
    );
  };

  render() {
    const { creditSyllabuses, node, scoreScaleKey } = this.props;

    const { subjectEditing } = this.state;

    return (
      <div>
        {Array.isArray(creditSyllabuses) && creditSyllabuses.length && (
          <ol>
            {creditSyllabuses.map((subject) => (
              <li
                key={`${node && node.iid}-${scoreScaleKey}-${subject &&
                  subject.iid}`}
              >
                {getLodash(subject, 'syllabus.name')} &nbsp;&nbsp;
                {subjectEditing === getLodash(subject, 'syllabus.iid') ? (
                  this.renderFormEdit(subject)
                ) : (
                  <Icon
                    icon="edit"
                    onClick={() =>
                      this.setItemEditing(getLodash(subject, 'syllabus.iid'))
                    }
                  />
                )}
              </li>
            ))}
          </ol>
        )}

        {!subjectEditing &&
          this.elementApplyCreditSyllabusPrerequisitesInProgram(
            scoreScaleKey,
            node,
          )}
      </div>
    );
  }
}

export default fetchData((props) => ({
  baseUrl:
    apiUrls.get_credit_syllabuses_created_prerequisites_with_score_scale_in_program,
  params: {
    program: getLodash(props, 'node.iid'),
    score_scale: getLodash(props, 'scoreScaleKey'),
  },
  propKey: 'creditSyllabuses',
  fetchCondition:
    getLodash(props, 'node.iid') && getLodash(props, 'scoreScaleKey'),
  refetchCondition: (prevProps) =>
    getLodash(props, 'node.iid') &&
    getLodash(props, 'scoreScaleKey') &&
    getLodash(props, 'updateInfo') !== getLodash(prevProps, 'updateInfo'),
}))(CreditSyllabusesCreatedPrerequisites);
