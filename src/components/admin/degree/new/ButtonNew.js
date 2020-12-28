import React, { Component } from 'react';
import FlatButton from 'components/common/mui/NewButton';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import NewDegreeForm from './Form';

class ButtonNew extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    const { dispatch } = this.props;
    const contentDialog = (
      <NewDegreeForm
        mode="new"
        title={t1('new_degree')}
        searchFormId="degree_search"
      />
    );
    const optionsProperties = {
      handleClose: true,
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    return (
      <FlatButton
        name="submit"
        type="submit"
        icon={<Icon icon="plus" />}
        label={t1('new_degree')}
        onClick={() => this.handleOnClick()}
      />
    );
  }
}

export default connect()(ButtonNew);
