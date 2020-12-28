import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import IconDelete from 'material-ui/svg-icons/navigation/close';
import { t1 } from 'translate';
import {
  skillsAttachingTypes,
  skillsAttachingOptions,
} from 'configs/constants';
import { Element } from 'schema-form/elements';
import './stylesheet.scss';

class SkillsEditor extends React.Component {
  cssClass = 'skills-input-auto-complete-result-editor';

  render() {
    const { value, index, onDelete } = this.props;
    const { name, iid } = value;

    return (
      <Paper className={`${this.cssClass}`}>
        <div style={{ width: '100%' }}>
          <div className="row-fluid">
            <div className="col-md-7">
              <div className={`${this.cssClass}__name`}>
                {name} (#
                {iid})
              </div>
            </div>
          </div>
          <div className="row-fluid">
            {Array.isArray(skillsAttachingOptions()) && (
              <div className={'col-md-4'} style={{ padding: '10px' }}>
                <Element
                  schema={{
                    name: 'attaching_option',
                    type: 'radio',
                    vertical: true,
                    fullWidth: true,
                    floatingLabelText: t1('attaching_options'),
                    options: skillsAttachingOptions(),
                    defaultValue: skillsAttachingTypes.DIRECT,
                  }}
                />
              </div>
            )}
          </div>
          <div className={`${this.cssClass}__delete`}>
            <IconDelete
              onClick={() => {
                if (onDelete) {
                  onDelete(value, index);
                }
              }}
            />
          </div>
        </div>
      </Paper>
    );
  }
}

SkillsEditor.propTypes = {
  index: PropTypes.number,
  onDelete: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.object),
};

SkillsEditor.defaultProps = {
  index: 0,
  value: {},
  onDelete: () => {},
};

export default SkillsEditor;
