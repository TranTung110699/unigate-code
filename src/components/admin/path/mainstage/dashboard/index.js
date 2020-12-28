import React from 'react';
import { t1 } from 'translate';
import SwitchControls from 'components/common/SwitchControls';
import controls from 'components/admin/path/edit/switch-controls';
import Paper from 'components/common/paper';
import Title from 'schema-form/field-set/Title';
import { Link } from 'react-router-dom';
import Icon from 'components/common/Icon';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

const styles = {
  minHeight: '150px',
};

class PathDashboard extends React.Component {
  render() {
    const { node, isFeatureEnabled } = this.props;
    const heading =
      node.type === 'path' ? t1('path_dashboard') : t1('program_dashboard');
    const curriculumLabel = node.children
      ? t1('curriculum_(%d)', [node.children.length])
      : t1('curriculum');
    const isNew_UI_JULY_2019Enabled = isFeatureEnabled(
      features.NEW_UI_JULY_2019,
    );
    return (
      <div className={`${!isNew_UI_JULY_2019Enabled ? 'container-fluid' : ''}`}>
        <h1 className={`${isNew_UI_JULY_2019Enabled ? 'text-white' : ''}`}>
          {heading}
        </h1>
        <div className="row">
          <div className="col-md-4">
            <Paper className={'p-10'}>
              <Title
                title={t1('edit_path_curriculum')}
                className={'text-transform'}
              />
              <div style={styles}>
                <Link to={`/admin/${node.type}/${node.iid}/children`}>
                  <Icon icon="edit" /> {curriculumLabel}
                </Link>
              </div>
            </Paper>
          </div>

          <div className="col-md-2">
            <Paper className={'p-10'}>
              <Title
                title={t1('program_status')}
                className={'text-transform'}
              />
              <div style={styles}>
                <SwitchControls items={controls(node)} />
              </div>
            </Paper>
          </div>
          {/*
          <div className="col-md-4">
            <Block
              title={t1('view_path_enrolled_students')}
              link={`/admin/${node.type}/${node.iid}/users`}
              icon="progress"
              label={t1('students_progress')}
            />
          </div>
 */}
        </div>
        <div className="clearfix m-t-10" />
        {/*
        <div className="row">
          <div className="col-md-4 col-md-offset-2">
            <Block
              title={t1('edit_path_curriculum')}
              link={`/admin/${node.type}/${node.iid}/invite`}
              icon="enrolment"
              label={t1('enrolment')}
            />
          </div>
          <div className="col-md-4">
            <Block
              title={t1('view_path_enrolled_students')}
              link={`/admin/${node.type}/${node.iid}/graduation`}
              icon="graduation"
              label={t1('graduation')}
            />
          </div>
        </div>
        */}
      </div>
    );
  }
}

export default withFeatureFlags()(PathDashboard);
