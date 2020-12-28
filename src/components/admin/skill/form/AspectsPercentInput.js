import React, { Component } from 'react';
import { connect } from 'react-redux';
import Text from 'schema-form/elements/text';
import FlatButton from 'components/common/mui/FlatButton';
import { t1 } from 'translate';
import { change, Field } from 'redux-form';

class AspectsPercent extends Component {
  flatButtonStyle = { fontWeight: 'bold' };

  onChange(value, field) {
    const { dispatch, name, formid } = this.props;
    if (parseFloat(value) > 100) {
      dispatch(change(formid, `${name}.${field}`, 100));
    } else dispatch(change(formid, `${name}.${field}`, value));
  }

  render() {
    const styles = {};
    let { total } = this.props;
    if (!total || total === undefined) total = 0;
    else if (total > 100) styles.secondary = true;
    else if (total === 100) styles.primary = true;

    return (
      <div>
        <div>
          <FlatButton {...styles} style={this.flatButtonStyle}>
            {t1('total')} {total}%
          </FlatButton>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div>
                {t1('learning_percentage')}:
                <Field
                  component={Text}
                  name="learning"
                  type="number"
                  max="100"
                  hintText={t1('learning_percentage')}
                  onChange={(ev) => this.onChange(ev.target.value, 'learning')}
                />
              </div>
              <div>
                {t1('practice_percentage')}:
                <Field
                  component={Text}
                  name="practice"
                  type="number"
                  max="100"
                  hintText={t1('practice_percentage')}
                  onChange={(ev) => this.onChange(ev.target.value, 'practice')}
                />
              </div>
              <div>
                {t1('output_exam_percentage')}:
                <Field
                  component={Text}
                  name="output"
                  type="number"
                  max="100"
                  hintText={t1('output_exams_percentage')}
                  onChange={(ev) => this.onChange(ev.target.value, 'output')}
                />
              </div>
              <div>
                {t1('application_percentage')}:
                <Field
                  component={Text}
                  name="apply"
                  type="number"
                  max="100"
                  hintText={t1('skill_application_percentage')}
                  onChange={(ev) => this.onChange(ev.target.value, 'apply')}
                />
              </div>
            </div>

            <div className="col-md-3">
              {t1('pass_score')} (%):
              <Field
                component={Text}
                name="pass_score"
                type="number"
                max="100"
                hintText={t1('pass_score')}
                onChange={(ev) => this.onChange(ev.target.value, 'pass_score')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(AspectsPercent);
