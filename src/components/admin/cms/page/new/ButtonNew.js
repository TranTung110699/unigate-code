import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/NewButton';

import Icon from 'components/common/Icon';
import { Link } from 'react-router-dom';

class ButtonNew extends Component {
  render() {
    return (
      <Link to="/admin/page/new">
        <FlatButton
          name="submit"
          type="submit"
          icon={<Icon icon="plus" />}
          label={t1('new_page')}
        />
      </Link>
    );
  }
}

export default connect()(ButtonNew);
