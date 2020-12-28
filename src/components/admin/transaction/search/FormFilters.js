import React from 'react';
import { connect } from 'react-redux';
import schemaActions from 'schema-form/actions';
import RaisedButton from 'components/common/mui/RaisedButton';
import { Element } from 'schema-form/elements';
import { t1 } from 'translate';
import DatePicker from 'schema-form/elements/date-picker';

class TransactionSearchFormFilters extends React.Component {
  componentWillMount() {
    const { onComponentWillMount } = this.props;
    if (onComponentWillMount) {
      onComponentWillMount();
    }
  }

  render() {
    const { acts } = this.props;

    return (
      <div id="teacher-search-form">
        <div className="row">
          <div className="col-md-4">
            <Element
              schema={{
                name: 'act',
                type: 'select',
                floatingLabelText: t1('act'),
                options: acts,
                floatingLabelFixed: true,
              }}
            />
          </div>
          <div className="col-md-4">
            <Element
              schema={{
                name: 'ts_from',
                type: DatePicker,
                floatingLabelText: t1('from'),
                floatingLabelFixed: true,
              }}
            />
          </div>
          <div className="col-md-4">
            <Element
              schema={{
                name: 'ts_to',
                type: DatePicker,
                floatingLabelText: t1('to'),
                floatingLabelFixed: true,
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Element
              schema={{
                name: 'actor',
                type: 'text',
                floatingLabelText: t1('actor_name'),
              }}
            />
          </div>
          <div className="col-md-4">
            <Element
              schema={{
                name: 'actor__u__iid',
                type: 'text',
                floatingLabelText: t1('actor_iid'),
              }}
            />
          </div>
          <div className="col-md-4">
            <Element
              schema={{
                name: 'actor__u__mail',
                type: 'text',
                floatingLabelText: t1('actor_mail'),
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Element
              schema={{
                name: 'context__supporter__name',
                type: 'text',
                floatingLabelText: t1('supporter_name'),
              }}
            />
          </div>
          <div className="col-md-4">
            <Element
              schema={{
                name: 'context__supporter__iid',
                type: 'text',
                floatingLabelText: t1('supporter_iid'),
              }}
            />
          </div>
          <div className="col-md-4">
            <Element
              schema={{
                name: 'context__supporter__mail',
                type: 'text',
                floatingLabelText: t1('supporter_mail'),
              }}
            />
          </div>
        </div>
        <br />
        <RaisedButton primary type="submit" label={t1('search')} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const defaultSelectOptions = [
    {
      value: '',
      primaryText: t1('all'),
    },
  ];

  let acts = defaultSelectOptions;

  const config = state.formSchemaConfigs[props.id];

  if (config) {
    if (config.act) {
      acts = acts.concat(config.act);
    }
  }

  return {
    acts,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  onComponentWillMount() {
    const { id } = props;
    const asyncFields = ['act'];
    asyncFields.forEach((asyncField) => {
      dispatch(schemaActions.formSchemaConfigsRequest(asyncField, id, {}));
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionSearchFormFilters);
