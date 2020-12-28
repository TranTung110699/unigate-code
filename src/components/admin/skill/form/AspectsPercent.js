import React, { Component } from 'react';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import FlatButton from 'components/common/mui/FlatButton';
import { t1 } from 'translate';

// import PropTypes from 'prop-types';

class AspectsPercent extends Component {
  flatButtonStyle = { fontWeight: 'bold' };

  render() {
    const styles = {};

    if (this.props.total > 100) styles.secondary = true;
    else if (this.props.total === 100) styles.primary = true;

    return (
      <div>
        <div>
          <FlatButton {...styles} style={this.flatButtonStyle}>
            {t1('total: %s', this.props.total)}%
          </FlatButton>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div>
                {t1('learning_percentage')}:{' '}
                <TextField
                  name="learning"
                  type="number"
                  hintText={t1('learning_percentage')}
                />
              </div>
              <div>
                {t1('practice_percentage')}:{' '}
                <TextField
                  name="practice"
                  type="number"
                  hintText={t1('practice_percentage')}
                />
              </div>
              <div>
                {t1('output_exam_percentage')}:{' '}
                <TextField
                  name="output"
                  type="number"
                  hintText={t1('output_exams_percentage')}
                />
              </div>
              <div>
                {t1('application_percentage')}:{' '}
                <TextField
                  name="apply"
                  type="number"
                  hintText={t1('skill_application_percentage')}
                />
              </div>
            </div>

            <div className="col-md-3">
              {t1('pass_score')} (%):{' '}
              <TextField
                name="pass_score"
                type="number"
                hintText={t1('pass_score')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AspectsPercent;
