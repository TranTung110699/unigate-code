import React from 'react';
import PropTypes from 'prop-types';
import { PureRubric } from 'components/admin/skill/skill/rubric';
import fetchNodes from 'components/common/fetchNodes';
import { t1 } from 'translate';
import { Link } from 'react-router-dom';
import routes from 'routes';
import sagaActions from 'actions/node/saga-creators';
import Icon from 'components/common/Icon';
import { connect } from 'react-redux';
import { filterObjectKeys } from 'common/utils/object';

const checkIfAllSkillScale = (zm) => {
  const hasScale = [];
  const notHaveScale = [];
  if (!zm || !Array.isArray(zm.children) || zm.children.length === 0) {
    return {
      hasScale,
      notHaveScale,
    };
  }
  const checkIfSkillHasScale = (skill) => skill && skill.scale;
  return {
    hasScale: zm.children.filter(checkIfSkillHasScale),
    notHaveScale: zm.children.filter((skill) => !checkIfSkillHasScale(skill)),
  };
};

const getScaleForZm = (zm) => {
  if (!zm || !Array.isArray(zm.children) || zm.children.length === 0) {
    return '';
  }
  if (!zm.children[0] || !zm.children[0].scale) {
    return '';
  }
  const scale = zm.children[0].scale;
  for (let index = 1; index < zm.children.length; index += 1) {
    const skill = zm.children[index];
    if (skill && skill.scale !== scale) {
      return '';
    }
  }
  return scale;
};

class GoalRubrics extends React.Component {
  cssClass = '';

  zmNameStyle = {
    margin: 0,
    fontSize: 15,
  };

  notHaveScaleSkillStyle = {
    margin: 0,
  };

  getMarkingValuesFromZm = (zm) =>
    zm &&
    Array.isArray(zm.children) &&
    zm.children.reduce(
      (result, skill) => ({
        ...result,
        [skill.iid]: skill.score,
      }),
      {},
    );

  handleMarkingValuesChange = (zm, values) => {
    const { dispatch } = this.props;
    dispatch(
      sagaActions.updateNodeRequest({
        iid: zm.iid,
        step: 'children',
        data: {
          id: zm.id,
          iid: zm.iid,
          ntype: zm.ntype,
          children: zm.children.map((skill) =>
            filterObjectKeys(
              {
                ...skill,
                score: values[skill.iid],
              },
              ['id', 'iid', 'name', 'ntype', 'type', 'score'],
            ),
          ),
        },
      }),
    );
  };

  render() {
    const { className, node } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    return (
      <div className={componentClassName}>
        {node &&
          node.children &&
          node.children.map((zm) => {
            const { hasScale, notHaveScale } = checkIfAllSkillScale(zm);
            let newZm = zm;
            newZm = Object.assign({}, newZm, {
              children: hasScale.map((skill) => ({ ...skill, children: null })),
            });
            newZm = Object.assign({}, newZm, { scale: getScaleForZm(newZm) });

            return (
              <div>
                <h2 style={this.zmNameStyle}>
                  <Icon icon="zm" /> {zm.name}
                </h2>
                {hasScale.length > 0 && (
                  <PureRubric
                    mode="assign_children_score"
                    node={newZm}
                    controlled
                    markingValues={this.getMarkingValuesFromZm(zm)}
                    onMarkingValuesChange={(values) =>
                      this.handleMarkingValuesChange(zm, values)
                    }
                  />
                )}
                {notHaveScale.length > 0 && (
                  <div>
                    <span>
                      {t1(
                        'there_are_some_skills_without_score_scale,_please_edit_them_to_continue_assign_score',
                      )}
                    </span>
                    <ul style={this.notHaveScaleSkillStyle}>
                      {notHaveScale.map((skill) => (
                        <li>
                          <Link to={routes.url('node_edit', skill)}>
                            {skill.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    );
  }
}

GoalRubrics.propTypes = {
  className: PropTypes.string,
};

GoalRubrics.defaultProps = {
  className: '',
};

export default fetchNodes([
  {
    nodePropName: 'node',
    depth: 2,
    fullNodePropName: 'node',
  },
])(connect()(GoalRubrics));
