import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'components/common/Icon';
import RaisedButton from 'components/common/mui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import PropTypes from 'prop-types';
import { feesTemplateTypes, feesTypeApplied } from 'configs/constants';

const btnStyle = {
  margin: 25,
};

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleCloseModal = () => {
    const { dispatch } = this.props;
    dispatch(actions.handleOpenDialog({ openDialog: false }));
  };

  handleClick = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div className="col-md-12">
        {Object.keys(feesTypeApplied).map((key) => {
          if (feesTypeApplied[key] === feesTypeApplied.TUITION_FEE) {
            return (
              <Link
                to="#"
                key={feesTypeApplied[key]}
                onClick={this.handleClick}
                style={btnStyle}
              >
                <RaisedButton
                  fullWidth
                  label={t1(feesTypeApplied[key])}
                  icon={<Icon icon="path" className="icon" />}
                />
                <Popover
                  open={this.state.open}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{ horizontal: 'middle', vertical: 'top' }}
                  targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                  onRequestClose={this.handleRequestClose}
                >
                  <Menu>
                    <MenuItem
                      containerElement={
                        <Link
                          to={`/admin/financial/applied-fee-templates/new/${
                            feesTemplateTypes.TUITION_FEE_BY_SUBJECT
                          }`}
                        />
                      }
                      primaryText={
                        <Icon icon="path" className="icon">
                          &nbsp;
                          {t1(feesTemplateTypes.TUITION_FEE_BY_SUBJECT)}
                        </Icon>
                      }
                      onClick={this.handleCloseModal}
                    />
                    <MenuItem
                      containerElement={
                        <Link
                          to={`/admin/financial/applied-fee-templates/new/${
                            feesTemplateTypes.TUITION_FEE_BY_CREDIT
                          }`}
                        />
                      }
                      primaryText={
                        <Icon icon="path" className="icon">
                          &nbsp;
                          {t1(feesTemplateTypes.TUITION_FEE_BY_CREDIT)}
                        </Icon>
                      }
                      onClick={this.handleCloseModal}
                    />
                    <MenuItem
                      containerElement={
                        <Link
                          to={`/admin/financial/applied-fee-templates/new/${
                            feesTemplateTypes.TUITION_FEE_BY_SEMESTER
                          }`}
                        />
                      }
                      primaryText={
                        <Icon icon="path" className="icon">
                          &nbsp;
                          {t1(feesTemplateTypes.TUITION_FEE_BY_SEMESTER)}
                        </Icon>
                      }
                      onClick={this.handleCloseModal}
                    />
                  </Menu>
                </Popover>
              </Link>
            );
          }

          if (!feesTemplateTypes || !feesTemplateTypes[key]) {
            return null;
          }

          return (
            <Link
              key={feesTypeApplied[key]}
              to={`/admin/financial/applied-fee-templates/new/${
                feesTemplateTypes[key]
              }`}
              onClick={this.handleCloseModal}
              style={btnStyle}
            >
              <RaisedButton
                fullWidth
                label={t1(feesTemplateTypes[key])}
                icon={<Icon icon="path" className="icon" />}
              />
            </Link>
          );
        })}
      </div>
    );
  }
}

Index.propTypes = {
  dispatch: PropTypes.func,
};

Index.defaultProps = {
  dispatch: () => {},
};

export default connect()(Index);
