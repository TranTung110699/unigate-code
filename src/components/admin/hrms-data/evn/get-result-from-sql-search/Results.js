import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VarDump from 'components/common/VarDump';

class Results extends Component {
  render() {
    const { items } = this.props;
    const itemList = items && items.filter((item) => !!item);
    if (!itemList) {
      return null;
    }

    return (
      <div className="table-result">
        <VarDump data={items} />
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default Results;
