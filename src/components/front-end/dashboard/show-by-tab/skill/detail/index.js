import React from 'react';
import { connect } from 'react-redux';
import SkillInfo from './SkillInfo';
import CreditSyllabuses from './CreditSyllabuses';
import { DefinedUrlParams } from 'routes/links/common';

import './../../stylesheet.scss';

class StudentSkillDetail extends React.Component {
  render() {
    return (
      <div className="my-position-wrappers">
        <div className="row">
          {
            <div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <SkillInfo skillIid={this.props.skillIid} />
                <CreditSyllabuses {...this.props} />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { match } = props;
  const skillIid =
    match && match.params && match.params[DefinedUrlParams.SKILL_IID];
  const mode = `programsOfSkill-${skillIid}`;
  const userInfo = state.user.info;

  return {
    // mode,
    userInfo,
    skillIid,
  };
};

export default connect(mapStateToProps)(StudentSkillDetail);
