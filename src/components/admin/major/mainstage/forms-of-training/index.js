/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import NodeNew from 'components/admin/node/new';
import getSchema from 'components/admin/major/schema/formEditFormsOfTraining';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import apiUrls from 'api-endpoints';
import RaisedButton from 'components/common/mui/RaisedButton';
import FlatButton from 'components/common/mui/FlatButton';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Detail from './detail';

class FormsOfTraining extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      updateInfo: 0,
    };
  }

  stylePaper = {
    marginTop: 20,
    padding: 10,
  };

  getButtonSubmit = (action) => {
    let icon = 'plus';
    let label = 'submit';
    switch (action) {
      case 'remove': {
        icon = 'delete';
        label = 'delete';
        break;
      }
      case 'edit': {
        icon = 'edit';
        label = 'update';
        break;
      }
      default: {
        break;
      }
    }
    return (
      <RaisedButton
        icon={<Icon icon={icon} />}
        label={t1(label)}
        primary
        type="submit"
      />
    );
  };

  elementEitFormOfTraining = (
    hiddenFields,
    defaultValues = {},
    closeDialog,
  ) => {
    const { node } = this.props;

    return (
      <NodeNew
        resetForm
        ntype={'major'}
        schema={getSchema(hiddenFields, node)}
        hiddenFields={hiddenFields}
        mode="edit"
        step="forms-of-training"
        node={{ ...defaultValues, id: node.id, iid: node.iid }}
        closeModal
        alternativeApi={apiUrls.update_node('category')}
        requestSuccessful={closeDialog}
        submitButton={this.getButtonSubmit(hiddenFields.update_type)}
      />
    );
  };

  getFormsOfTrainingByDegreesOfNode = (node) => {
    const degrees = node && node.degrees;
    if (!Array.isArray(degrees) || !degrees.length) {
      return [];
    }

    let results = [];
    // group degree by training_mode + training_level
    degrees.forEach((degree) => {
      let add = true;
      results = results.length
        ? results.map((map) => {
            if (
              map.training_level === degree.training_level &&
              map.training_mode === degree.training_mode
            ) {
              map.degrees.push({
                degree: degree.degree,
                specialization: degree.specialization,
              });
              add = false;
            }
            return map;
          })
        : [];
      if (add) {
        results.push({
          training_level: degree.training_level,
          training_mode: degree.training_mode,
          degrees: [
            {
              degree: degree.degree,
              specialization: degree.specialization,
            },
          ],
        });
      }
    });
    return results;
  };

  getTitleFormOfTraining = (formOfTraining) => {
    const title = `${t1('training_mode')}: ${
      formOfTraining.training_mode
    } | ${t1('training_level')}: ${formOfTraining.training_level}`;
    return formOfTraining.degrees.length > 1
      ? `${title} (${formOfTraining.degrees.length} ${t1('specialization')})`
      : title;
  };

  getButtonEitFormOfTraining = (action, showFull) => {
    let icon = 'plus';
    let label = 'add_new_form_of_training';
    switch (action) {
      case 'remove': {
        icon = 'delete';
        label = 'remove';
        break;
      }
      case 'add_specialization': {
        label = 'add_specialization';
        break;
      }
      case 'edit_specialization':
      case 'edit_degree': {
        return <FlatButton icon={<Icon icon="edit" />} onClick={showFull} />;
      }
      case 'add_degree': {
        label = t1('add_degree');
        break;
      }
      default: {
        break;
      }
    }
    return (
      <RaisedButton
        label={t1(label)}
        icon={<Icon icon={icon} />}
        onClick={showFull}
      />
    );
  };

  renderElementEitFormOfTraining = (
    action,
    formOfTraining,
    defaultValues,
    dialogOptionsProperties = {},
  ) => (
    <DetailOnDialog
      renderPreview={({ showFull }) =>
        this.getButtonEitFormOfTraining(action, showFull)
      }
      renderFull={({ closeDialog }) =>
        this.elementEitFormOfTraining(
          {
            ...formOfTraining,
            update_type: action,
          },
          defaultValues,
          closeDialog,
        )
      }
      dialogOptionsProperties={dialogOptionsProperties}
    />
  );

  renderElementEitSpecialization = (
    specialization,
    dialogOptionsProperties = {},
  ) => (
    <DetailOnDialog
      renderPreview={({ showFull }) =>
        this.getButtonEitFormOfTraining('edit_specialization', showFull)
      }
      renderFull={({ closeDialog }) => (
        <NodeNew
          ntype={'major'}
          schema={getSchema({}, specialization)}
          mode="edit"
          node={{
            ...specialization,
            id: specialization.id || specialization._id,
          }}
          closeModal
          alternativeApi={apiUrls.update_node('category')}
          requestSuccessful={() => {
            closeDialog();
            this.setState({ updateInfo: !this.state.updateInfo });
          }}
          submitButton={this.getButtonSubmit('edit')}
        />
      )}
      dialogOptionsProperties={dialogOptionsProperties}
    />
  );

  render() {
    const { node } = this.props;
    const formsOfTraining = this.getFormsOfTrainingByDegreesOfNode(node);

    return (
      <div>
        {Array.isArray(formsOfTraining) &&
          formsOfTraining.length > 0 &&
          formsOfTraining.map((map) => (
            <Paper
              style={this.stylePaper}
              key={`${formsOfTraining.training_level}-${
                formsOfTraining.training_mode
              }`}
            >
              <div className="row">
                <div className="col-md-12">
                  <div className="pull-left">
                    <h3>{this.getTitleFormOfTraining(map)}</h3>
                  </div>
                  <div className="pull-right">
                    {this.renderElementEitFormOfTraining('remove', {
                      training_mode: map.training_mode,
                      training_level: map.training_level,
                    })}
                  </div>
                </div>
                <div className="col-md-12">
                  <Divider />
                  <Detail
                    formOfTraining={map}
                    major={node}
                    updateInfo={this.state.updateInfo}
                    renderElementEitFormOfTraining={
                      this.renderElementEitFormOfTraining
                    }
                    renderElementEitSpecialization={
                      this.renderElementEitSpecialization
                    }
                  />
                </div>
              </div>
            </Paper>
          ))}
        <div className="m-t-30">
          {this.renderElementEitFormOfTraining('add_form_of_training')}
        </div>
      </div>
    );
  }
}

export default FormsOfTraining;
