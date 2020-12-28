/**
 * Created by vohung on 07/06/2017.
 */
import React, { Component } from 'react';
import get from 'lodash.get';
import Checkbox from 'antd/lib/checkbox';
import Button from 'antd/lib/button';
import apiUrls from 'api-endpoints';
import fetchData from 'components/common/fetchData';
import Name from 'components/admin/node/edit/metadata/row/Name';
import Table from 'antd/lib/table';
import { t1 } from 'translate';
import NodeNew from 'components/admin/node/new';
import RaisedButton from 'components/common/mui/RaisedButton';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Bank from '../bank/Bank';

const alternativeApi = '/syllabus/api/apply-skills-for-learning-item';
class EditSkills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillsApplied: [],
      skillAddedForLearningItem: [],
      skillRemovedForLearningItem: [],
    };
  }

  handleApplySkillsForLearningItem = (
    learningItem,
    skill,
    checked = false,
    defaultChecked = false,
  ) => {
    if (!learningItem || !skill) {
      return;
    }

    let newState = [];
    if (defaultChecked) {
      this.setState(({ skillRemovedForLearningItem }) => {
        newState = skillRemovedForLearningItem;
        if (checked) {
          newState = newState.filter(
            (row) =>
              get(row, 'learning_item.id') !== learningItem.id ||
              get(row, 'skill.id') !== skill.id,
          );
        } else {
          newState.push({
            learning_item: {
              id: learningItem.id,
              iid: learningItem.iid,
              ntype: learningItem.ntype,
            },
            skill: {
              id: skill.id,
              iid: skill.iid,
              ntype: skill.ntype,
              type: skill.type,
            },
          });
        }
        return { skillRemovedForLearningItem: newState };
      });
      return;
    }

    this.setState(({ skillAddedForLearningItem }) => {
      newState = Array.isArray(skillAddedForLearningItem)
        ? skillAddedForLearningItem
        : [];
      if (checked) {
        newState.push({
          learning_item: {
            id: learningItem.id,
            iid: learningItem.iid,
            ntype: learningItem.ntype,
          },
          skill: {
            id: skill.id,
            iid: skill.iid,
            ntype: skill.ntype,
            name: skill.name,
          },
        });
      } else {
        newState = newState.filter(
          (row) =>
            get(row, 'learning_item.id') !== learningItem.id ||
            get(row, 'skill.id') !== skill.id,
        );
      }

      return { skillAddedForLearningItem: newState };
    });
  };

  addSkillsApplied = (skill) => {
    if (!skill) {
      return;
    }
    let skills = Array.isArray(skill) ? skill : [skill];

    this.setState(({ skillsApplied }) => {
      if (!Array.isArray(skillsApplied) || !skillsApplied.length) {
        return { skillsApplied: skills };
      }

      return { skillsApplied: skillsApplied.concat(skills) };
    });
  };

  getSkillsToRenderColumns = () => {
    const result = [];
    let { skills } = this.props;
    skills = (Array.isArray(skills) ? skills : []).concat(
      get(this.state, 'skillsApplied', []),
    );

    if (Array.isArray(skills) && skills.length) {
      skills.forEach((skill) => {
        if (result.find((row) => String(row.iid) === String(skill.iid))) {
          return;
        }
        result.push(skill);
      });
    }
    return result;
  };

  getColumns = () => {
    const skillsToRender = this.getSkillsToRenderColumns();

    const columns = [
      {
        title: t1('learning_item'),
        render: (text, row) => {
          return (
            <span style={{ display: 'inline-block' }}>
              <Name item={row} />
            </span>
          );
        },
      },
    ];

    if (skillsToRender.length) {
      columns.push({
        title: t1('skills'),
        children: skillsToRender.map((skill) => {
          if (!skill || !skill.iid) {
            return false;
          }

          return {
            title: skill.name,
            className: 'text-center',
            render: (text, row) => {
              let skills = get(row, 'skills');
              skills = Array.isArray(skills) ? skills : [];
              const defaultChecked = !!skills.find(
                (sk) => String(sk.iid) === String(skill.iid),
              );

              return {
                children: (
                  <Checkbox
                    defaultChecked={defaultChecked}
                    onChange={(event) => {
                      const checked = get(event, 'target.checked');
                      this.handleApplySkillsForLearningItem(
                        row,
                        skill,
                        checked,
                        defaultChecked,
                      );
                    }}
                  />
                ),
                props: {
                  className: 'text-center',
                },
              };
            },
          };
        }),
      });
    }

    return columns.filter(Boolean);
  };

  getApplySkillsForLearningItem = (
    skillAddedForLearningItem = [],
    skillRemovedForLearningItem = [],
  ) => {
    let result = [];

    if (
      Array.isArray(skillAddedForLearningItem) &&
      skillAddedForLearningItem.length
    ) {
      result = result.concat(
        skillAddedForLearningItem.map((row) => ({ ...row, mode: 'add' })),
      );
    }

    if (
      Array.isArray(skillRemovedForLearningItem) &&
      skillRemovedForLearningItem.length
    ) {
      result = result.concat(
        skillRemovedForLearningItem.map((row) => ({ ...row, mode: 'remove' })),
      );
    }

    return result;
  };

  render() {
    const { dataSource, loadingStatus, handleRefetch, node } = this.props;

    const skillAddedForLearningItem = get(
      this.state,
      'skillAddedForLearningItem',
      [],
    );
    const skillRemovedForLearningItem = get(
      this.state,
      'skillRemovedForLearningItem',
      [],
    );

    return [
      <div className="flex-container-wrap">
        <Table
          style={{ width: '95%', minWidth: 300 }}
          bordered
          size="small"
          pagination={false}
          defaultExpandAllRows
          columns={this.getColumns()}
          className="white-background"
          loading={!Array.isArray(dataSource) || loadingStatus !== 'finished'}
          dataSource={Array.isArray(dataSource) ? dataSource : []}
        />
        <DetailOnDialog
          renderPreview={({ showFull }) => (
            <Button
              className="m-l-5"
              type="primary"
              shape="round"
              icon="plus"
              title={t1('add_skills_to_apply')}
              onClick={showFull}
            />
          )}
          renderFull={({ closeDialog }) => (
            <Bank
              ntype="skill"
              fieldEdit="skills"
              subType="skill"
              handleCloseDialog={closeDialog}
              requestSuccessful={(res) => {
                if (res.success && res.result) {
                  this.addSkillsApplied(res.result);
                }
              }}
              handleAddNodeSuccessful={(nodes) => {
                this.addSkillsApplied(nodes);
                closeDialog();
              }}
            />
          )}
          dialogOptionsProperties={{
            title: t1('add_skills'),
            handleClose: true,
            width: '80%',
          }}
        />
      </div>,
      <NodeNew
        className="pull-left"
        schema={{
          schema: () => ({}),
          ui: () => [],
        }}
        hiddenFields={{
          apply_skills_for_learning_item: this.getApplySkillsForLearningItem(
            skillAddedForLearningItem,
            skillRemovedForLearningItem,
          ),
        }}
        requestSuccessful={() => {
          if (typeof handleRefetch === 'function') {
            handleRefetch();
          }
          this.setState(() => ({
            skillAddedForLearningItem: [],
            skillRemovedForLearningItem: [],
          }));
        }}
        formid="apply-skills-for-learning-item"
        alternativeApi={alternativeApi}
        submitButton={() => (
          <RaisedButton
            type="submit"
            disabled={
              (!Array.isArray(skillAddedForLearningItem) ||
                !skillAddedForLearningItem.length) &&
              (!Array.isArray(skillRemovedForLearningItem) ||
                !skillRemovedForLearningItem.length)
            }
            className="m-t-30"
            label={t1('apply_skills_for_learning_item')}
            primary
          />
        )}
      />,
    ];
  }
}

const getPropertyToEditSkills = ({ children, ...node }) => {
  let skills = get(node, 'skills');
  skills = Array.isArray(skills) ? skills : [];
  if (Array.isArray(children) && children.length) {
    const newChildren = [];
    children.forEach((child) => {
      const newProps = getPropertyToEditSkills(child);
      skills = skills.concat(newProps.skills);
      newChildren.push(newProps.treeData);
    });
    node.children = newChildren;
  }

  return { treeData: node, skills };
};

export default fetchData((props) => ({
  baseUrl: apiUrls.get_snippet,
  fetchCondition: get(props, 'node.iid') && get(props, 'node.ntype'),
  params: (() => {
    const iid = get(props, 'node.iid');
    const ntype = get(props, 'node.ntype');
    return {
      ntype,
      iid,
      depth: -1,
      editing_syllabus: 2,
    };
  })(),
  formatDataResult: (result = {}) => {
    const { treeData, skills } = getPropertyToEditSkills(result);
    return {
      dataSource: [treeData],
      skills,
    };
  },
  refetchCondition: () => false,
}))(EditSkills);
