/* eslint-disable react/prop-types,jsx-a11y/anchor-is-valid */
import React from 'react';
import get from 'lodash.get';
import './mappingSkills.scss';

class SkillsMappingLayoutFreestyle extends React.PureComponent {
  render() {
    const { groups, formValues, xpath } = this.props;
    const currentValue = formValues && get(formValues, xpath);

    return (
      <div className="row mappingSkills">
        <div className="col-md-6 colLeft">
          {currentValue.skill}({currentValue.level})
        </div>
        <div className="col-md-6">{groups.id.fieldNames.SkillResult}</div>
      </div>
    );
  }
}

export default SkillsMappingLayoutFreestyle;
