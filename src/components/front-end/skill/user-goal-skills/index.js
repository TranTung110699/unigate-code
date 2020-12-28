import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultiCheckBox from 'schema-form/elements/multi-checkbox/core';
import { constants, loadingStatuses } from 'configs/constants';
import Loading from 'components/common/loading';
import fetchData from './fetchData';
import Skill from '../common/item';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPassedVisible: [0, 1],
    };
  }

  isPassedTypeOnChanged = (value) => {
    this.setState({
      isPassedVisible: value,
    });
  };

  multiCheckBoxWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    height: 100,
  };

  multiCheckBoxLabelStyle = { width: 'auto' };

  render() {
    const { skills, loadingStatus } = this.props;

    if (loadingStatus !== loadingStatuses.FINISHED) {
      return <Loading blackLoadingIcon />;
    }

    return (
      <div>
        <div style={this.multiCheckBoxWrapperStyle}>
          <MultiCheckBox
            inline
            options={constants.isPassedType()}
            onChange={this.isPassedTypeOnChanged}
            value={this.state.isPassedVisible}
            labelStyle={this.multiCheckBoxLabelStyle}
          />
        </div>
        <Skill
          skill={{
            children: skills,
          }}
          isPassedVisible={this.state.isPassedVisible}
        />
      </div>
    );
  }
}

Index.propTypes = {
  skill: PropTypes.instanceOf(Object),
  skillIid: PropTypes.number,
};

Index.defaultProps = {
  skill: {},
  skillIid: null,
};

export default fetchData(Index);
