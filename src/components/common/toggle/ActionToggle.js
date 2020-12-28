/* eslint-disable no-undef,react/prop-types */
/**
 * Created by vohung on 03/06/2017.
 */

import React from 'react';
import { connect } from 'react-redux';
import Request from 'common/network/http/Request';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import sagaActions from 'actions/node/saga-creators';
import DetailOnDialog from 'components/common/detail-on-dialog/index';
import RaisedButton from 'components/common/mui/RaisedButton';
import { submit } from 'redux-form';
import AntToggle from 'antd/lib/switch';
import './stylesheet.scss';

class ActionToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      newToggle: {},
    };
  }

  componentWillMount() {
    const { dataSet, value } = this.props;
    this.setLoggedValue(this.getDefaultToggled(dataSet, value));
  }

  componentWillReceiveProps(nextProps) {
    const { dataSet, updateValue, value } = this.props;
    if (
      nextProps &&
      typeof nextProps.value !== 'undefined' &&
      (updateValue || value !== nextProps.value)
    ) {
      this.setLoggedValue(this.getDefaultToggled(dataSet, nextProps.value));
    }
  }

  getDefaultToggled = (dataSet, value) => {
    let logged = false;
    if (dataSet && dataSet.on && dataSet.on === value) {
      logged = true;
    } else if (!dataSet && value) {
      logged = true;
    }
    return logged;
  };

  handleChange = (logged) => {
    if (logged === this.state.logged) {
      return;
    }
    const {
      baseURL,
      name,
      dispatch,
      user,
      permission,
      searchFormId,
      node,
    } = this.props;
    const dataSet = this.props.dataSet || { on: 1, off: 0 };

    const value = logged ? dataSet.on : dataSet.off;

    if (!baseURL || !name) {
      if (this.props.handleChange) {
        this.props.handleChange({ success: true }, value);
      }
      this.setLoggedValue(logged);
      return;
    }

    let params = this.props.params || {};
    params = {
      ...params,
      [name]: value || 0,
    };

    if (user) {
      params = {
        ...params,
        userIid: user.iid,
      };
    }

    if (node) {
      dispatch(
        sagaActions.upsertNodeRequest({
          apiUrl: baseURL,
          data: Object.assign({}, node, params),
          searchFormId,
          mode: 'edit',
          requestSuccessful: (res) => {
            if (permission && !res.result) {
              this.setLoggedValue(!logged ? dataSet.on : dataSet.off);
            } else {
              this.setLoggedValue(logged);
            }

            if (this.props.handleChange) {
              this.props.handleChange(res, logged);
            }
          },
        }),
      );
    } else {
      Request.post(baseURL, params).then((res) => {
        if (res && res.success) {
          if (searchFormId) {
            dispatch(submit(searchFormId));
          }
          if (permission && !res.result) {
            this.setLoggedValue(!logged ? dataSet.on : dataSet.off);
            dispatch(actions.snackbar(true, t1('no_permission')));
          } else {
            this.setLoggedValue(logged);
            dispatch(
              actions.snackbar(true, res.message && t1('operation_successful')),
            );
          }
        } else {
          dispatch(actions.snackbar('error', res.message));
        }

        if (this.props.handleChange) {
          this.props.handleChange(res, logged);
        }
      });
    }
  };

  setLoggedValue = (logged) => {
    this.setState((state) => ({ ...state, logged }));
  };

  getLabelByProps = (props) => {
    if (props && props.hideLabel) return '';
    let label = props.label;
    if (typeof label !== 'boolean') {
      return t1(label);
    }
    const dataSet = props.dataSet;
    const labelSet = props.labelSet || {};
    if (typeof label === 'boolean' && label && dataSet) {
      label = this.state.logged
        ? labelSet.on || dataSet.on
        : labelSet.off || dataSet.off;
    }

    if (props && props.hideLabel) return '';

    return t1(label);
  };

  getReadOnlyLabelByProps = (props) => {
    const { readOnlyLabelSet } = props;
    if (!readOnlyLabelSet) {
      return '';
    }
    return this.state.logged
      ? t1(readOnlyLabelSet.on)
      : t1(readOnlyLabelSet.off);
  };

  renderFull = ({ closeDialog }) => {
    const newToggle = this.state.newToggle || {};
    const { event, logged } = newToggle;
    const { confirmToChange } = this.props;

    if (!event || typeof logged === 'undefined' || !confirmToChange) {
      closeDialog();
      return;
    }

    return (
      <div>
        <h3>
          {typeof confirmToChange === 'function'
            ? confirmToChange(logged)
            : confirmToChange}
        </h3>
        <div className="text-center">
          <RaisedButton
            className="text-center"
            label={t1('ok')}
            primary
            onClick={() => {
              closeDialog();
              this.handleChange(event, logged);
              this.setState((state) => ({ ...state, newToggle: {} }));
            }}
          />
        </div>
      </div>
    );
  };

  render() {
    const { readOnly, noLabel } = this.props;
    const { confirmToChange, ...options } = this.props;
    delete options.labelSet;

    const label = this.getLabelByProps(this.props);
    const readOnlyLabel = this.getReadOnlyLabelByProps(this.props);

    return !readOnly ? (
      <DetailOnDialog
        renderPreview={({ showFull }) => (
          <div className={noLabel ? '' : 'ant-toggle'}>
            <div
              className={noLabel ? '' : `d-flex ${label && 'ant-toggle-item'}`}
            >
              {!noLabel && <span className="toggle-label m-r-5">{label}</span>}
              <AntToggle
                {...options}
                checked={this.state.logged}
                onChange={
                  confirmToChange
                    ? (logged, event) => {
                        this.setState((state) => ({
                          ...state,
                          newToggle: { event, logged },
                        }));
                        setTimeout(function() {
                          showFull();
                        }, 0);
                      }
                    : this.handleChange
                }
              />
            </div>
          </div>
        )}
        renderFull={this.renderFull}
      />
    ) : (
      readOnlyLabel || label
    );
  }
}

ActionToggle.defaultProps = {
  readOnly: false,
};

export default connect()(ActionToggle);
