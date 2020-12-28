import React, { Component } from 'react';
import { t1 } from 'translate';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import { getFormValues, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';

class Preview extends Component {
  imgStyle = { margin: '5px', width: '100%' };

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(
      sagaActions.getDataRequest({
        url: 'degree/delete-image-preview',
        keyState: 'degree_preview_result',
      }),
    );
    dispatch(reset('degree_preview'));
  }

  handleSubmit = () => {
    const { dispatch, item, formValues } = this.props;
    const params = { degree: item, values: formValues };
    dispatch(
      sagaActions.getDataRequest(
        { url: apiUrls.degree_preview, keyState: 'degree_preview_result' },
        params,
      ),
    );
  };

  render() {
    const { item, handleSubmit, degreePreviewResult } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit} className="col-md-4" id="degree_preview">
          {item &&
            item.texts &&
            item.texts.map((text, key) => (
              <TextField
                key={text.key}
                fullWidth
                name={text.key}
                floatingLabelText={text.key}
                label={text.key}
                hintText={text.key}
              />
            ))}
          <RaisedButton
            id="submit"
            onClick={() => this.handleSubmit()}
            label={t1('preview')}
            primary
          />
        </form>
        <div className="col-md-8">
          <img
            alt={item.name}
            src={
              degreePreviewResult
                ? `${degreePreviewResult.url}?${new Date().getTime()}`
                : item &&
                  item.template &&
                  item.template[0] &&
                  item.template[0].link
            }
            style={this.imgStyle}
          />
        </div>
      </div>
    );
  }
}

const onSubmit = () => {};

Preview.propTypes = {};

Preview.defaultProps = {};

const mapStateToProps = (state) => {
  const degreePreviewResult = state.dataApiResults.degree_preview_result;
  const formValues = getFormValues('degree_preview')(state);
  return {
    degreePreviewResult,
    formValues,
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    destroyOnUnmount: false,
    form: 'degree_preview',
    onSubmit,
  })(Preview),
);
