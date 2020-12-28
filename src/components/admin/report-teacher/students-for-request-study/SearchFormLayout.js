import React from 'react';

const style = {
  action: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

class SearchFormLayout extends React.PureComponent {
  render() {
    const { groups, submitButton } = this.props;
    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className="col-md-12">{groups.id.fieldNames.major}</div>
          <div className="col-md-3 m-t-10">{groups.id.fieldNames.user}</div>
          <div className="col-md-3">{groups.id.fieldNames.course}</div>
          <div className="col-md-3">{groups.id.fieldNames.syllabus}</div>
          <div className="col-md-3 m-t-10">
            {groups.id.fieldNames.learn_type}
          </div>
          <div className="col-md-12 m-t-20" style={style.action}>
            <div style={{ width: 100 }}>{submitButton}</div>{' '}
            {groups.id.fieldNames.export}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchFormLayout;
