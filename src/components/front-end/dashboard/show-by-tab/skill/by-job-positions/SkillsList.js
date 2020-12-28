import React from 'react';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import Icon from 'components/common/Icon';
import lodashGet from 'lodash.get';

import { getDashboardUrl } from 'routes/links/common';

class SkillsList extends React.Component {
  render() {
    const { position } = this.props;
    return (
      <div>
        {position && position.skills && Array.isArray(position.skills) ? (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-condensed">
              <thead>
                <th>{t1('skill_code')}</th>
                <th>{t1('skill_name')}</th>
                <th>{t1('progress')}</th>
                <th width="20%">{t1('view_credit_detail')}</th>
              </thead>
              <tbody>
                {position.skills.map((skill) => (
                  <tr>
                    <td>{skill.code}</td>
                    <td>{skill.name}</td>
                    <td
                      style={
                        lodashGet(skill, 'p.isCompleted')
                          ? { color: 'green' }
                          : null
                      }
                    >
                      {lodashGet(skill, 'p.all.passed') || 0}/
                      {lodashGet(skill, 'p.all.total') || 0}
                    </td>
                    <td width="20%" className="text-center">
                      <Link
                        to={getDashboardUrl('my-skills', {
                          skillIid: skill.iid,
                          action: 'credit-syllabuses',
                        })}
                      >
                        <Icon icon="view" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>{t1('there_are_no_skills_for_this_position_yet')}.</p>
        )}
      </div>
    );
  }
}

export default SkillsList;
