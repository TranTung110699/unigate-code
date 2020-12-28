import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { constants } from 'configs/constants';
import { Element } from 'schema-form/elements';
import apiUrls from 'api-endpoints';
import userSagaActions from 'components/admin/user/actions/saga-creators';

class Results extends Component {
  constructor(props) {
    super(props);

    this.statusOnChanged = this.statusOnChanged.bind(this);
  }

  statusOnChanged(status, userId) {
    const { id, dispatch } = this.props;

    const params = {
      status,
      id: userId,
      _sand_step: 'change_status',
      formid: id,
    };

    dispatch(
      userSagaActions.changeStatusRequest(apiUrls.update_node('user'), params),
    );
  }

  render() {
    const { item, readOnly } = this.props;

    return (
      <div>
        {item.status && t1(item.status)} <br />
        <Element
          schema={{
            type: 'select',
            name: item.id,
            fullWidth: true,
            defaultValue: item.status,
            value: item.status,
            options: constants.userStatuses(),
            onChange: (event, value) => {
              this.statusOnChanged(value, item.id);
            },
            readOnly,
          }}
        />
      </div>
    );
  }
}

Results.propTypes = {
  item: PropTypes.shape(),
  id: PropTypes.string,
};

Results.defaultProps = {
  item: {},
  id: null,
};

export default connect()(Results);
