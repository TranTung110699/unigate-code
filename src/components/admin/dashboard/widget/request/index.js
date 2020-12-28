import React from 'react';
import PropTypes from 'prop-types';

class Request extends React.PureComponent {
  static propTypes = {
    expand: PropTypes.bool,
    formid: PropTypes.string,
    orgIids: PropTypes.arrayOf(PropTypes.number),
  };

  static defaultProps = {
    expand: false,
    formid: null,
    orgIids: null,
  };

  render() {
    const { expand, formid, orgIids } = this.props;
    return <div>empty</div>;
  }
}

export default Request;
