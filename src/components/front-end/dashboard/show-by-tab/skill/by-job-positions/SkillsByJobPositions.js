import React from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import SkillsList from './SkillsList';
import PositionInfo from './PositionInfo';

import SkillsProgressChart from './SkillsProgressChart';
import './../../stylesheet.scss';
import fetchData from 'components/common/fetchData';
import fetchSkillsByJobPositions from './fetchSkillsByJobPositions';

class SkillsByJobPositions extends React.Component {
  render() {
    const { positionsOfUserWithSkills, userInfo } = this.props;
    return (
      <div className="my-position-wrappers">
        {positionsOfUserWithSkills &&
        Array.isArray(positionsOfUserWithSkills) &&
        positionsOfUserWithSkills.length > 0 ? (
          <div>
            {positionsOfUserWithSkills.map((position) => (
              <div className="m-b-30">
                <h3>
                  {position.name}
                  {position && position.type === 'job_position' ? null : (
                    <span className="text-muted">
                      {' '}
                      ( {t1('equivalent_position')} )
                    </span>
                  )}
                </h3>

                <div>
                  {position && position.type === 'job_position' && (
                    <PositionInfo position={position} userInfo={userInfo} />
                  )}
                </div>

                <div>
                  <SkillsProgressChart skills={position.skills} />
                </div>

                <SkillsList position={position} />
              </div>
            ))}
          </div>
        ) : (
          <p>{t1('there_are_no_job_positions_yet')}.</p>
        )}
      </div>
    );
  }
}

SkillsByJobPositions.propTypes = {
  SkillsByJobPositions: PropTypes.arrayOf(PropTypes.any),
  // could be passed from store for current user, or passed manually (in admin screen, when a teacher is viewing skills of a student)
  // userInfo: PropTypes.object(),
};

SkillsByJobPositions.defaultProps = {
  SkillsByJobPositions: [],
};

export default fetchData(fetchSkillsByJobPositions)(SkillsByJobPositions);
