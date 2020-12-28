import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import Icon from 'components/common/Icon';
import commonSagaActions from 'actions/saga-creators';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { userMajorStatus } from 'configs/constants';
import AddMajorToUser from '../add-to-user';
import ButtonSendSMS from './sendSMS';
import Results from './Results';
import schema from '../schema/search-form';
import RaisedButton from 'components/common/mui/RaisedButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valuesSearchForm: {},
      popoverOpen: false,
      popoverAnchorEl: null,
    };
  }

  renderResultComponent = (items, props) => (
    <Results items={items} {...props} />
  );

  handleClosePopover = () => {
    this.setState({
      popoverOpen: false,
    });
  };

  handleExport = (exportType) => {
    const { valuesSearchForm } = this.state;
    this.props.dispatch(
      commonSagaActions.exportDataRequest(apiUrls.export_user_major, {
        ...(valuesSearchForm || {}),
        export_type: exportType,
      }),
    );
    this.handleClosePopover();
  };

  render() {
    const {
      hiddenQueryField,
      optionsFilter,
      renderResultComponent,
      formid,
      showExport,
      sendSMS,
      hiddenFields,
      ...props
    } = this.props;
    return (
      <div>
        <SearchWrapper
          {...props}
          hiddenFields={hiddenFields}
          schema={schema(optionsFilter, showExport || sendSMS)}
          classFormFilter={hiddenQueryField && 'display-none'}
          formid={formid || 'user_major_search'}
          renderResultsComponent={
            renderResultComponent || this.renderResultComponent
          }
          alternativeApi={apiUrls.user_major_search}
          onChange={
            showExport || sendSMS
              ? (valuesSearchForm) => {
                  this.setState(() => ({ valuesSearchForm }));
                }
              : null
          }
          submitButton={
            showExport || sendSMS ? (
              <div>
                <RaisedButton
                  primary
                  type="submit"
                  label={t1('search')}
                  className="m-l-10 m-r-10"
                />
                {sendSMS && (
                  <ButtonSendSMS conditions={this.state.valuesSearchForm} />
                )}
                {showExport && (
                  <RaisedButton
                    primary
                    onClick={(event) => {
                      if (
                        get(this.state, 'valuesSearchForm.status') ===
                        userMajorStatus.CERTIFIED
                      ) {
                        event.preventDefault();
                        this.setState({
                          popoverOpen: true,
                          popoverAnchorEl: event.currentTarget,
                        });
                        return;
                      }
                      this.handleExport();
                    }}
                    icon={<Icon icon="export" style={{ color: 'white' }} />}
                    label={t1('export')}
                    className="m-l-10 m-r-10"
                  >
                    {get(this.state, 'valuesSearchForm.status') ===
                      userMajorStatus.CERTIFIED && (
                      <Popover
                        open={this.state.popoverOpen}
                        anchorEl={this.state.popoverAnchorEl}
                        anchorOrigin={{ horizontal: 'middle', vertical: 'top' }}
                        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                        onRequestClose={this.handleClosePopover}
                      >
                        <Menu>
                          <MenuItem
                            primaryText={
                              <Icon icon="path" className="icon">
                                &nbsp;
                                {t1('export_learning_information')}
                              </Icon>
                            }
                            onClick={() => this.handleExport()}
                          />
                          <MenuItem
                            primaryText={
                              <Icon icon="path" className="icon">
                                &nbsp;
                                {t1('export_information_after_graduation')}
                              </Icon>
                            }
                            onClick={() =>
                              this.handleExport('information_after_graduation')
                            }
                          />
                        </Menu>
                      </Popover>
                    )}
                  </RaisedButton>
                )}
              </div>
            ) : null
          }
        />
        {hiddenFields && (
          <div>
            <AddMajorToUser className="m-t-30" {...this.props} />
          </div>
        )}
      </div>
    );
  }
}

Layout.propTypes = {
  type: PropTypes.string,
};

Layout.defaultProps = {
  type: '',
};

export default connect()(Layout);
