import React from 'react';
import { Link } from 'react-router-dom';
import nodeIcon from 'components/admin/node/icon';
import { isExam } from 'common/learn';
import { ntype as allNtype, schoolTypes } from 'configs/constants';
import { types as questionTypes } from 'components/admin/question/schema/question-types';
import Icon from 'components/common/Icon';
import { t1, t4 } from 'translate';
import NodeNew from 'components/admin/node/new';
import { getLearningItemFormSchema } from 'components/admin/node/schema-form/learning-items';
import { breadCrumb, stripHTML } from 'common/utils/string';
import DetailOnDialog from 'components/common/detail-on-dialog';
import lodashGet from 'lodash.get';
import Widget from 'components/common/Widget';
import EditAvatar from 'components/admin/node/edit/EditAvatar';
import Links from 'routes/links';

const compactNameLength = 20; //chars
const normalNameLength = 60; // chars
const shortenDisplayName = (content, isCompact) => {
  return breadCrumb(content, isCompact ? compactNameLength : normalNameLength);
};

const getDisplayNameQuestion = (question, isCompact, index) => {
  let type, title;
  switch (question.type) {
    case questionTypes.TYPE_INTRODUCTION:
      type = 'INTR';
      title = t1('introduction_question');
      break;
    case questionTypes.TYPE_INLINE:
      type = 'IL';
      title = t1('inline_question');
      break;
    case questionTypes.TYPE_MC:
    case questionTypes.TYPE_MC_OPEN_ENDED:
      if (question.sub_type === 'MMC') {
        type = 'MMC';
        title = t1('multiple_multiple_choice_question');
      } else {
        type = 'MC';
        title = t1('multiple_choice_question');
      }
      break;
    case questionTypes.TYPE_REORDER:
      type = 'RO';
      title = t1('reorder_question');
      break;
    case questionTypes.TYPE_MATCHING_PAIRS:
      type = 'MP';
      title = t1('matching_pair_question');
      break;
    case questionTypes.TYPE_OPEN_ENDED:
      type = 'OE';
      title = t1('open_ended_question');
      break;
    case questionTypes.TYPE_API:
      type = 'API';
      title = t1('api_question');
      break;
    case questionTypes.TYPE_WRITING: {
      type = 'WT';
      title = t1('writing_question');
      break;
    }
    case questionTypes.TYPE_SPEAKING: {
      type = 'SP';
      title = t1('speaking_question');
      break;
    }
    default:
      type = '#';
  }

  let content;
  if (question.content) {
    content = breadCrumb(
      stripHTML(question.content),
      isCompact ? compactNameLength : normalNameLength,
    );
  } else content = question.code || question.iid;
  return `<span><span title="${title}">[${type}]</span> ${content}</span>`;
};

const linkStyle = {
  cursor: 'pointer',
};

const rubricSubTypeLabel = (subType) => {
  return <span> {`[${subType}]`}</span>;
};

const ProgramModuleTitle = ({ item, icon }) => {
  const itemName = lodashGet(item, 'name');
  const dialogKey = `edit_program_module_${lodashGet(item, 'iid')}`;

  const renderPreview = React.useCallback(
    ({ showFull }) => {
      return (
        <a
          style={linkStyle}
          onClick={showFull}
          title={t1('click_to_edit_item')}
        >
          {icon}
          {itemName}
        </a>
      );
    },
    [itemName, icon],
  );

  const renderFull = React.useCallback(
    () => {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <NodeNew
                mode="edit"
                node={item}
                ntype={item.ntype}
                schema={getLearningItemFormSchema(item.ntype)}
                step={item && item.type}
                closeModal={false}
                formid={`edit_program_module_${lodashGet(item, 'iid')}`}
                dialogKey={dialogKey}
              />
            </div>
            <div className="col-md-6">
              <Widget title={t1('edit_avatar')}>
                <EditAvatar node={item} />
              </Widget>
            </div>
          </div>
        </div>
      );
    },
    [item, dialogKey],
  );

  const dialogOptionsProperties = {
    title: t1('edit_program_module'),
    handleClose: true,
    width: '80%',
  };

  if (!item) {
    return null;
  }

  return (
    <DetailOnDialog
      renderPreview={renderPreview}
      renderFull={renderFull}
      dialogOptionsProperties={dialogOptionsProperties}
      dialogKey={dialogKey}
    />
  );
};

const Name = ({
  item,
  metadataFilters,
  parentItem,
  isCompact,
  index,
  schoolType,
  inEPRunning,
}) => {
  const iconStyle = {
    paddingRight: '3px',
    ...(isExam(item) ? { color: 'red' } : {}),
  };

  const propsLink =
    inEPRunning && item.ntype === allNtype.SYLLABUS
      ? {
          to: Links.learnCourse(item, null, true),
          target: '_blank',
        }
      : {
          to: item.path,
          title: t1('click_to_edit_item'),
        };

  return (
    <div>
      {item.ntype === allNtype.PATH &&
      [allNtype.PROGRAM_MODULE, allNtype.SPECIALIZATION_PROGRAM].includes(
        item.type,
      ) ? (
        <ProgramModuleTitle
          item={item}
          icon={<Icon icon="edit" style={iconStyle} />}
        />
      ) : (
        (() => {
          const content = (
            <React.Fragment>
              {item.ntype !== 'question' && (
                <Icon icon={nodeIcon(item)} style={iconStyle} />
              )}
              {item.ntype !== allNtype.QUESTION ? (
                <span title={item.name}>
                  {shortenDisplayName(item.name, isCompact)}
                </span>
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: getDisplayNameQuestion(item, isCompact, index),
                  }}
                />
              )}
            </React.Fragment>
          );

          if (item.path) {
            return (
              <Link {...propsLink}>
                {content}

                {item.ntype === allNtype.SKILL &&
                item.type === 'rubric' &&
                item.sub_type
                  ? rubricSubTypeLabel(item.sub_type)
                  : ''}
              </Link>
            );
          }

          return <span>{content}</span>;
        })()
      )}

      {schoolType === schoolTypes.SIS && (
        <span className="text-muted">
          {' '}
          {item.ntype !== allNtype.QUESTION &&
            (item.code ? ` - ${item.code}` : item.iid)}
        </span>
      )}

      {/* when editing credit syllabus in a program, we need to show whether this syllabus is online only */}
      {item &&
      item.ntype === allNtype.SYLLABUS &&
      item.type === allNtype.CREDIT &&
      item.online_only &&
      parentItem &&
      parentItem.type === allNtype.PROGRAM ? (
        <span
          className="text-muted"
          title={t1('this_credit_syllabus_can_be_learned_online_only')}
        >
          {' '}
          [{t1('online_only')}]
        </span>
      ) : (
        ''
      )}

      {item.credit ? (
        <span className="p-l-10">
          {' '}
          [<b>{item.credit}</b> {t4('credits')}]
        </span>
      ) : null}

      {metadataFilters &&
      metadataFilters.content &&
      item.ntype &&
      item.ntype === allNtype.QUESTION &&
      item.content ? (
        <div className="question-content preview-content-question">
          <p dangerouslySetInnerHTML={{ __html: item.content }} />
          {item.type === questionTypes.TYPE_API && item.saw_training_package && (
            <div>
              Packages: <b>{item.saw_training_package}</b>
            </div>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Name;
