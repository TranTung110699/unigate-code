import React from 'react';
import Query from 'components/admin/group/schema/elements/filterset/filter/query/Query';
import PositionsPreview from 'components/admin/group/schema/elements/filterset/filter/preview/PositionsAndUserOrganizations';
import SkillPreview from 'components/admin/group/schema/elements/filterset/filter/skill/SkillPreview';
import SexPreview from 'components/admin/group/schema/elements/filterset/filter/sex/SexPreview';
import AgePreview from 'components/admin/group/schema/elements/filterset/filter/age/AgePreview';
import ExperiencePreview from 'components/admin/group/schema/elements/filterset/filter/experience/ExperiencePreview';

class FilterPreview extends React.Component {
  render() {
    const mapping = {
      text: Query,
      positions: PositionsPreview,
      skill: SkillPreview,
      user_organizations: PositionsPreview,
      sex: SexPreview,
      age: AgePreview,
      experience: ExperiencePreview,
    };

    const Comp = mapping[this.props.type] ? mapping[this.props.type] : null;

    if (Comp)
      return (
        <Comp
          {...this.props.filterset}
          formid={this.props.formid}
          fieldName={this.props.type}
        />
      );

    return null;
  }
}

export default FilterPreview;
