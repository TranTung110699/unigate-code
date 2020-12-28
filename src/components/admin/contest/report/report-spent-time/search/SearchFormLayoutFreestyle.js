import React from 'react';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import RaisedButton from 'components/common/mui/RaisedButton';

class SearchFormDetailFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  render() {
    const { groups, message } = this.props;

    return (
      <div className="container-fluid elementGroup">
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="row">
          <div className={`col-md-4 element-item`}>
            {groups.id.fieldNames.exam_round_iid}
          </div>
          <div className={`col-md-4 element-item`}>
            {groups.id.fieldNames.exam_shift_iid}
          </div>
          <div className={`col-md-4 element-item`}>
            {groups.id.fieldNames.highlight_question_has_spent_time_less_than}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 element-item">{groups.id.fieldNames.q}</div>
        </div>
        <div className="row">
          <div className="col-md-12 element-item">
            {groups.id.fieldNames.user_codes}
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 m-t-10 m-b-10">
            <RaisedButton
              type="submit"
              name="search"
              id="search"
              icon={<Icon icon={'search'} />}
              label={t1('search')}
              primary
            />
          </div>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

export default SearchFormDetailFreestyle;
