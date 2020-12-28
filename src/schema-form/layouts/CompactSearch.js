import React from 'react';

class CompactSearch extends React.PureComponent {
  render() {
    const {
      groups,
      groupsMetadata,
      readOnly,
      message,
      addNewAndEditButton,
      showAddNewAndEditButton,
    } = this.props;
    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    // const { columns } = this.props;
    const hasHiddenWhenCompactGroups = groupsMetadata.find(
      (g) => g.hiddenWhenCompact,
    );

    return (
      <div className="container-fluid">
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="row">
          <div className="col-md-10">
            {groupsMetadata.map((g) => {
              if (!g.hiddenWhenCompact && g.id !== '__collapser__')
                return groups[g.id];
            })}
          </div>
          <div className="col-md-2">
            <div className="form-button-groups">{groups.__collapser__}</div>
          </div>
        </div>
        {hasHiddenWhenCompactGroups && (
          <div className="row">
            <div className="col-md-12">
              {groupsMetadata.map((g) => {
                if (g.hiddenWhenCompact) return groups[g.id];
              })}
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-md-12">
            <div className="form-button-groups">
              {submitButton}
              {showAddNewAndEditButton && addNewAndEditButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompactSearch;
