import React from 'react';

class TwoTen extends React.Component {
  render() {
    const { searchForm, results, pagination } = this.props;
    return (
      <div className={'row'}>
        <div className={'col-md-2'}>{searchForm}</div>
        <div className={'col-md-10'}>
          {results}
          <div>{pagination}</div>
        </div>
      </div>
    );
  }
}

export default TwoTen;
