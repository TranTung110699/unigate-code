import React, { Component } from 'react';
import { Element } from 'schema-form/elements';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { constants } from 'configs/constants';
import { t, t1 } from 'translate';
import RaisedButton from 'components/common/mui/RaisedButton';

class FormFilters extends Component {
  raisedButtonStyle = { marginTop: '20px' };

  renderElementFilter = () => {
    const { hiddenFields, ntype } = this.props;

    const statuses = this.props.statuses || {
      name: 'status',
      options: constants.StatusOptions(),
    };

    if (hiddenFields && hiddenFields.status) {
      return (
        <div className="col-md-7">
          <TextField
            fullWidth
            name="name"
            floatingLabelText={
              ntype
                ? t1('search_by_name_or_iid_of_%s', [t(ntype)])
                : t1('search_by_name_or_iid')
            }
          />
        </div>
      );
    }

    const fields =
      hiddenFields && hiddenFields.status
        ? [
            <div className="col-md-7">
              <TextField
                fullWidth
                name="name"
                floatingLabelText={
                  ntype
                    ? t1('search_by_name_or_iid_of_%s', [t(ntype)])
                    : t1('search_by_name_or_iid')
                }
              />
            </div>,
          ]
        : [
            <div className="col-md-4">
              <TextField
                fullWidth
                name="name"
                floatingLabelText={
                  ntype
                    ? t1('search_by_name_or_iid_of_%s', [t(ntype)])
                    : t1('search_by_name_or_iid')
                }
              />
            </div>,
            <div className="col-md-3">
              <Element
                schema={{
                  name: 'status',
                  type: 'multiCheckbox',
                  inline: true,
                  floatingLabelText: t1('status'),
                  options: statuses.options,
                  defaultValue: ['queued', 'approved'],
                }}
              />
            </div>,
          ];

    if (hiddenFields && hiddenFields.type === 'subjectgroup') {
      fields.push(
        <div className="col-md-3">
          <Element
            schema={{
              name: 'is_credit_transfert_group',
              type: 'multiCheckbox',
              inline: true,
              floatingLabelText: t1('group_type'),
              options: [
                {
                  value: 0,
                  label: t1('subject_group'),
                  primaryText: t1('subject_group'),
                },
                {
                  value: 1,
                  label: t1('credit_transfert_group'),
                  primaryText: t1('credit_transfert_group'),
                },
              ],
              defaultValue: [0, 1],
            }}
          />
        </div>,
      );
    }

    return fields;
  };

  render() {
    const { searchButton } = this.props;

    return (
      <div>
        {this.renderElementFilter()}
        {searchButton && (
          <div className="col-md-2 text-center">
            <RaisedButton
              style={this.raisedButtonStyle}
              name="submit"
              type="submit"
              id="submit"
              label={t1('search_courses')}
              primary
            />
          </div>
        )}
      </div>
    );
  }
}

export default FormFilters;
