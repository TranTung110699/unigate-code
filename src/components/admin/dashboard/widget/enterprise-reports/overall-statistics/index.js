import React from 'react';
import apiUrls from 'api-endpoints/index';
import { t1 } from 'translate';
import sagaActions from 'actions/node/saga-creators';
import { connect } from 'react-redux';
import Loading from 'components/common/loading';
import withUserOrganizations from 'common/hoc/withUserOrganizations';

class OverallStatistics extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    const { dispatch, orgIids } = this.props;
    const params = {
      group_type: 'user.ancestor_organizations',
      user_organizations: orgIids,
    };
    const url = apiUrls.enterprise_dashboard_reports;
    const keyState = 'enterprise_report_passed_failed';

    dispatch(
      sagaActions.getDataRequest(
        {
          url,
          keyState,
          executeOnSuccess: (res) => {
            this.setState({ data: res });
          },
        },
        params,
      ),
    );
  }

  render() {
    const { data } = this.state;
    if (!data) {
      return <Loading />;
    }

    const {
      no_of_credit_syllabuses: creditSyllabuses,
      no_of_enrolment_plans: enrolmentPlans,
      no_of_staffs: staffs,
      no_of_programs: programs,
      no_of_sinvites: sinvites,
      no_of_students: students,
    } = data;

    const style = {
      height: '300px',
    };

    return (
      <div style={style}>
        <div className="row">
          <div className="col-md-6">
            <span>{t1('credit_syllabuses: %s', creditSyllabuses)}</span>
          </div>
          <div className="col-md-6">
            <span>{t1('enrolment_plans: %s', enrolmentPlans)}</span>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <span>{t1('staffs: %s', staffs)}</span>
          </div>
          <div className="col-md-6">
            <span>{t1('programs: %s', programs)}</span>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <span>{t1('sinvite: %s', sinvites)}</span>
          </div>
          <div className="col-md-6">
            <span>{t1('students: %s', students)}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withUserOrganizations(OverallStatistics);
