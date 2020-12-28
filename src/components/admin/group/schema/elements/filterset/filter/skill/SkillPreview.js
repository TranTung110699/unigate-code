import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate/index';
import { skillOpToText } from 'components/admin/skill/configs';
import get from 'lodash.get';
import sagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';

const keyStateForSkillPreview = (formid, skillIid) =>
  `preview-${formid}-skill-${skillIid}`;

class Error extends React.Component {
  render() {
    return <span style={{ color: 'red' }}>{this.props.children}</span>;
  }
}

class SkillPreview extends React.Component {
  componentDidMount() {
    this.fetchData(this.props.skill);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.skill && this.props.skill.iid != nextProps.skill.iid)
      this.fetchData(nextProps.skill);
  }

  fetchData(skill) {
    const url = apiUrls.get_snippet;
    const keyState = keyStateForSkillPreview(
      this.props.formid,
      this.props.skill.iid,
    );
    const params = {
      iid: skill.iid,
      ntype: 'skill',
      depth: 0,
    };

    this.props.dispatch(sagaActions.getDataRequest({ url, keyState }, params));
  }

  render() {
    const { skill, skillFullInfo } = this.props; // object of shape {skill, op, level}

    return (
      <div>
        <b>{t1('skill')}</b>: {skillFullInfo && skillFullInfo.name} (#
        {skill.iid}) {!skill.op && <Error>{t1('no_op')}</Error>}
        {!skill.level && <Error>{t1('no_level_chosen')}</Error>}
        {skill.op &&
          skill.level &&
          t1(`being_%s_level_%s`, [skillOpToText(skill.op), skill.level])}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const skillFullInfo = get(
    state,
    `dataApiResults.${keyStateForSkillPreview(props.formid, props.skill.iid)}`,
  );

  return { skillFullInfo };
};

export default connect(mapStateToProps)(SkillPreview);
