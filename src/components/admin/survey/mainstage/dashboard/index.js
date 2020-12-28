import React from 'react';
import { t1 } from 'translate';
import Paper from 'components/common/paper';
import Title from 'schema-form/field-set/Title';
import SurveyStatistics from './widget/survey-statistics';
import Status from './widget/Status';

const styles = {
  minHeight: '150px',
};

class SurveyDashboard extends React.PureComponent {
  render() {
    const { node } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9">
            <Paper className={'p-10'}>
              <Title
                title={t1('survey_statistics')}
                className={'text-transform'}
              />
              <div style={styles}>
                <SurveyStatistics node={node} />
              </div>
            </Paper>
          </div>
          <div className="col-md-3">
            <Paper className={'p-10'}>
              <Title title={t1('survey_status')} className={'text-transform'} />
              <div style={styles}>
                <Status node={node} />
              </div>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

export default SurveyDashboard;
