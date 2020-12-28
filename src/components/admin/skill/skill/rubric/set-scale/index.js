import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NodeNew from 'components/admin/node/new';
import { skillScaleOptionsSelector } from 'components/admin/skill/skill/utils';
import skillSchema from 'components/admin/skill/schema/form';

class SkillRubricViewSetScale extends React.Component {
  cssClass = 'skill-rubric-view-set-skill';

  render() {
    const { className, skill, skillScaleOptions } = this.props;
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <NodeNew
          title={'set_scale_for_skill'}
          ntype={(skill && skill.ntype) || 'skill'}
          schema={skillSchema}
          mode={'edit'}
          step={'scale'}
          params={{
            skillScaleOptions,
          }}
          node={skill}
        />
      </div>
    );
  }
}

SkillRubricViewSetScale.propTypes = {
  className: PropTypes.string,
};

SkillRubricViewSetScale.defaultProps = {
  className: '',
};

const mapStateToProps = (state) => ({
  skillScaleOptions: skillScaleOptionsSelector(state),
});

export default connect(mapStateToProps)(SkillRubricViewSetScale);
