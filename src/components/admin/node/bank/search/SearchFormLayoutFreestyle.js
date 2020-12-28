import React from 'react';

class SearchFormDetailFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  render() {
    const { groups, message, readOnly, formValues } = this.props;
    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid">
        {(() => {
          const hasMajorField = !!groups.default.fieldNames.major;
          const hasAcademicCategoriesField = !!groups.default.fieldNames
            .academic_categories;
          const hasOrganizationField = !!groups.default.fieldNames
            .organizations;
          const hasPositionsField = !!groups.default.fieldNames.positions;
          const hasDifficultyField = !!groups.default.fieldNames.difficulty;
          const hasSkillsField = !!groups.default.fieldNames.skills;
          const hasTagsField = !!groups.default.fieldNames.tags;
          const hasImportTagsField = !!groups.default.fieldNames.import_tags;
          const hasUsedForField = !!groups.default.fieldNames.used_for;
          const hasSubTypeField = !!groups.default.fieldNames.subType;
          const hasLevelField = !!groups.default.fieldNames.level;
          const hasJobPositionCodesField = !!groups.default.fieldNames
            .job_position_codes;

          const commonFields = [
            <div className={`col-md-${hasMajorField ? 3 : 9}`}>
              {groups.default.fieldNames.q}
            </div>,
            <div className="col-md-3">
              {groups.default.fieldNames.match_type}
            </div>,
            hasMajorField && (
              <div className="col-md-6">{groups.default.fieldNames.major}</div>
            ),
          ];

          return [
            <div className="row">{commonFields}</div>,

            hasLevelField && (
              <div className="row">
                <div className="col-md-12">
                  {groups.default.fieldNames.level}
                </div>
              </div>
            ),

            hasJobPositionCodesField && (
              <div className="row">
                <div className="col-md-12">
                  {groups.default.fieldNames.top_equivalent_positions}
                </div>
              </div>
            ),

            hasAcademicCategoriesField && (
              <div className="row">
                <div className="col-md-12">
                  {groups.default.fieldNames.academic_categories}
                </div>
              </div>
            ),

            (hasOrganizationField || hasPositionsField) && (
              <div className="row">
                {hasOrganizationField && (
                  <div className="col-md-6">
                    {groups.default.fieldNames.organizations}
                  </div>
                )}
                {hasPositionsField && (
                  <div className="col-md-6">
                    {groups.default.fieldNames.positions}
                  </div>
                )}
              </div>
            ),

            (hasDifficultyField || hasSubTypeField) && (
              <div className="row">
                {hasDifficultyField && (
                  <div className="col-md-6">
                    {groups.default.fieldNames.difficulty}
                  </div>
                )}
                {hasSubTypeField && (
                  <div className="col-md-6">
                    {groups.default.fieldNames.subType}
                  </div>
                )}
              </div>
            ),

            (hasImportTagsField || hasUsedForField) && (
              <div className="row">
                {hasImportTagsField && (
                  <div className="col-md-6">
                    {groups.default.fieldNames.import_tags}
                  </div>
                )}
                {hasUsedForField && (
                  <div className="col-md-6">
                    {groups.default.fieldNames.used_for}
                  </div>
                )}
              </div>
            ),

            hasSkillsField && (
              <div className="row">
                <div className="col-md-12">
                  {groups.default.fieldNames.skills}
                </div>
              </div>
            ),

            hasTagsField && (
              <div className="row">
                <div className="col-md-12">
                  {groups.default.fieldNames.tags}
                </div>
              </div>
            ),

            <div className="row">
              <div className="col-md-12">{submitButton}</div>
            </div>,
          ];
        })()}
      </div>
    );
  }
}

export default SearchFormDetailFreestyle;
