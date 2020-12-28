import React from 'react';
import { change } from 'redux-form';
import Paper from 'material-ui/Paper';
import Title from 'schema-form/field-set/Title';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import DetailOnDialog from 'components/common/detail-on-dialog';
import FindLearners from '../new/find-targets/Learners';
import FindLearningItems from '../new/find-targets/LearningItems';
import get from 'lodash.get';
import './stylesheet.scss';

const findTargets = {
  learners: FindLearners,
  learning_items: FindLearningItems,
};

const stylePaper = {
  marginTop: 20,
  padding: 10,
};

const dialogOptionsProperties = {
  handleClose: true,
  width: '80%',
};

class LayoutFreestyle extends React.PureComponent {
  className = 'admin-enrolment-session';

  renderPreview = ({ showFull, label }) => (
    <>
      <div>
        <label>{t1('add_user_or_group')}</label>
      </div>
      <RaisedButton
        className="button-show-box-search"
        label={label}
        onClick={showFull}
        icon="search"
      />
    </>
  );

  elementFindTargetsByFieldName = ({
    closeDialog,
    filedName,
    currentValues,
    canUserInviteInAllOrganizations,
  }) => {
    const ElementRender = findTargets[filedName];
    if (ElementRender) {
      return (
        <ElementRender
          currentValues={currentValues}
          addToTheListOfTarget={(newItems) => {
            this.addToTheListOfTarget(filedName, newItems);
          }}
          canUserInviteInAllOrganizations={canUserInviteInAllOrganizations}
        />
      );
    }
  };

  addToTheListOfTarget = (filedName, newItems) => {
    if (!newItems || !Array.isArray(newItems) || !newItems.length) {
      return;
    }
    let values =
      (this.props.formValues && this.props.formValues[filedName]) || [];
    newItems.forEach((item) => {
      const isExists = values.find((map) => map.iid === item.iid);
      if (!isExists) {
        values = [...values, item];
      }
    });
    this.upSetValue(filedName, values);
  };

  upSetValue = (field, values) => {
    const { formid, dispatch } = this.props;
    dispatch(change(formid, field, values));
  };

  render() {
    const {
      formValues,
      groups,
      fields,
      submitButton,
      layoutOptionsProperties,
      hiddenFields,
      readOnly,
      simpleMode,
    } = this.props;
    const fieldNames = groups && groups.default && groups.default.fieldNames;
    if (!fieldNames) {
      return null;
    }

    const hiddenFieldNames =
      layoutOptionsProperties && layoutOptionsProperties.hiddenFields;

    const learningItems = formValues && formValues.learning_items;
    const learners = formValues && formValues.learners;
    const packageIid = get(groups, 'default.fieldNames.package_iid');
    const startDate = get(groups, 'default.fieldNames.start_date');
    const orderStatus = get(groups, 'default.fieldNames.status');

    return (
      <div className="row">
        <div className={`col-md-12 ${this.className}`}>
          {fieldNames.learning_items && simpleMode !== true && (
            <div className="col-md-12">
              <Paper style={stylePaper}>
                <Title title={t1('learning_items')} />
                <div className={`${this.className}__box-content`}>
                  <div className="box-action clearfix">
                    {!readOnly &&
                      (!hiddenFieldNames ||
                        !hiddenFieldNames.includes('learning_items')) && (
                        <DetailOnDialog
                          renderPreview={({ showFull }) =>
                            this.renderPreview({
                              showFull,
                              label: t1('search_course_or_path'),
                            })
                          }
                          timeRender={
                            (learningItems && learningItems.length) || 0
                          }
                          renderFull={({ closeDialog }) =>
                            this.elementFindTargetsByFieldName({
                              closeDialog,
                              filedName: 'learning_items',
                              currentValues: learningItems,
                              canUserInviteInAllOrganizations:
                                hiddenFields &&
                                hiddenFields.canUserInviteInAllOrganizations,
                            })
                          }
                          dialogOptionsProperties={dialogOptionsProperties}
                        />
                      )}
                  </div>
                  <div className="box-container">
                    {fieldNames.learning_items}
                  </div>
                </div>
              </Paper>
            </div>
          )}
          <div className={simpleMode ? 'col-ma-12' : 'col-md-6'}>
            <Paper style={stylePaper}>
              <div className={`${this.className}__box-content`}>
                <div className="box-action clearfix">
                  <div className="row">
                    <div className="col-md-4">
                      {!!(
                        !readOnly &&
                        (!hiddenFieldNames ||
                          !hiddenFieldNames.includes('package_iid'))
                      ) && packageIid}
                    </div>
                    <div className="col-md-4">
                      {!!(
                        !readOnly &&
                        (!hiddenFieldNames ||
                          !hiddenFieldNames.includes('start_date'))
                      ) && (
                        <>
                          {startDate}
                          <p className="text-muted">
                            <i>{t1('end_date_will_take_from_package')}</i>
                          </p>
                        </>
                      )}
                    </div>
                    <div className="col-md-4">
                      {!!(
                        !readOnly &&
                        (!hiddenFieldNames ||
                          !hiddenFieldNames.includes('status'))
                      ) && orderStatus}
                    </div>
                  </div>
                  {!readOnly &&
                    (!hiddenFieldNames ||
                      !hiddenFieldNames.includes('learners')) && (
                      <DetailOnDialog
                        renderPreview={({ showFull }) =>
                          this.renderPreview({
                            showFull,
                            label: t1('search_group_or_user'),
                          })
                        }
                        timeRender={(learners && learners.length) || 0}
                        renderFull={({ closeDialog }) =>
                          this.elementFindTargetsByFieldName({
                            closeDialog,
                            filedName: 'learners',
                            currentValues: learners,
                            canUserInviteInAllOrganizations:
                              hiddenFields &&
                              hiddenFields.canUserInviteInAllOrganizations,
                          })
                        }
                        dialogOptionsProperties={dialogOptionsProperties}
                      />
                    )}
                </div>
                {learners &&
                  learners.length > 1 &&
                  learningItems &&
                  learningItems.length > 0 && (
                    <div className="pull-right wapper-reset-progress">
                      {fieldNames.reset_progress}
                    </div>
                  )}
              </div>
              <div className="box-container p-10">{fieldNames.learners}</div>
            </Paper>
          </div>

          {simpleMode !== true && (
            <div className="col-md-6">
              <Paper style={stylePaper}>
                <Title title={t1('planning')} />
                <div className={`${this.className}__box-content`}>
                  <div>{fieldNames.compulsory}</div>
                  <div>{fieldNames.valid_duration}</div>
                  <div>{fieldNames.learning_now}</div>
                  <div>{fieldNames.start_date}</div>
                  <div>{fieldNames.deadline}</div>
                </div>
              </Paper>
            </div>
          )}
          <div className="text-center col-md-12">
            {!readOnly && submitButton}
          </div>
        </div>
      </div>
    );
  }
}

export default LayoutFreestyle;
