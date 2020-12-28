/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 * Created by hungvo on 12/10/17.
 */
import React from 'react';
import nodeIcon from 'components/admin/node/icon';
import Icon from 'components/common/Icon';
import { ntype as ntypeDefine } from 'configs/constants';
import FlatButton from 'components/common/mui/FlatButton';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import { types as questionTypes } from 'components/admin/question/schema/question-types';
import DetailOnDialog from 'components/common/detail-on-dialog';
import NodeReport from 'components/admin/report/node';
import { t1 } from 'translate';
import { breadCrumb } from 'common/utils/string';
import apiUrls from 'api-endpoints';
import aApiUrls from 'components/admin/abac-role/endpoints';
import ActionToggle from 'components/common/toggle/ActionToggle';
import Perm from 'common/utils/Perm';

const isExam = (node) =>
  node &&
  ((node.ntype === 'sco' && node.tpl_type === 'exam') ||
    (node.ntype === 'exercise' && node.type === 'exam') ||
    (node.ntype === 'syllabus' && node.is_exam));

export const filterTreeDataByWhiteList = (data, whiteListItemsToShow) => {
  if (!whiteListItemsToShow) {
    return data;
  }
  if (!data) {
    return null;
  }

  if (
    Object.keys(whiteListItemsToShow).includes(data.ntype) &&
    !whiteListItemsToShow[data.ntype].map(String).includes(String(data.iid))
  ) {
    return null;
  }

  let newData = data;
  if (Array.isArray(data.children)) {
    const newChildren = data.children
      .map((child) => filterTreeDataByWhiteList(child, whiteListItemsToShow))
      .filter((child) => child);

    newData = {
      ...newData,
      children: newChildren,
    };
  }
  return newData;
};

export const filterTreeDataDrawTabelHeader = (
  nodeEditer = false,
  data,
  ntypes,
  depth = 1,
  infoTheTests,
  exam = false,
) => {
  if (!data) {
    return {};
  }
  let rowSpan = depth;
  const treeData = [];

  data.forEach((row, index) => {
    let { children, ...item } = row;
    let nodeIsExam = false;
    if (isExam(item) && !exam) {
      nodeIsExam = true;
    }

    if ((ntypes.includes(item.ntype) && !nodeIsExam) || nodeIsExam) {
      let colSpan = 0;

      if (children && children.length && item.ntype !== 'vocabset') {
        const tmp = filterTreeDataDrawTabelHeader(
          nodeEditer,
          children,
          ntypes,
          depth + 1,
          infoTheTests,
          exam || nodeIsExam,
        );
        children = [];
        if (tmp && tmp.treeData && tmp.treeData.length) {
          children = tmp.treeData;
        }
        if (tmp && tmp.rowSpan) {
          rowSpan = tmp.rowSpan;
        }
        if (
          (item.ntype === 'exercise' &&
            (item.type !== 'dictation' && item.type !== 'roleplay') &&
            !exam) ||
          nodeIsExam
        ) {
          children.push({ ...item, nameDisplay: t1('score') });
          children.push({
            ...item,
            nameDisplay: t1('passed'),
            type_display: 'pass',
          });
          if (Perm.nodeEditer(nodeEditer)) {
            children.push({
              ...item,
              nameDisplay: t1('action'),
              type_display: 'reset-take',
            });
          }
        }
      } else if (item.ntype === 'video' && !item.fake) {
        children = [Object.assign(item, { fake: 1 })]; // add it self
      } else children = [];

      if (children && children.length) {
        children.forEach((child) => {
          colSpan += child.colSpan || 1;
        });
        item.children = children;
      }

      colSpan = colSpan || 1;
      // const info = (infoTheTests && infoTheTests[item.iid]) || {};
      const name =
        item.ntype === ntypeDefine.QUESTION ? (
          <span title={t1('question_%s', [index + 1])}>
            {t1('q_%s', index + 1)}
          </span>
        ) : (
          <span title={item.name}>{breadCrumb(item.name, 20)}</span>
        );
      const nameDisplay = (
        <DetailOnDialog
          renderPreview={({ showFull }) => (
            <span onClick={showFull} style={{ cursor: 'pointer' }}>
              <Icon icon={nodeIcon(item)} /> {name}
            </span>
          )}
          renderFull={() => <NodeReport node={item} nodeEditer={nodeEditer} />}
          dialogOptionsProperties={{
            handleClose: true,
            autoScrollBodyContent: true,
            width: '80%',
          }}
          dialogKey={`node-report-${item.iid}`}
        />
      );
      treeData.push({ ...item, colSpan, nameDisplay });
    }
  });
  return { treeData, rowSpan };
};

const isSyncProgress = (node) =>
  isExam(node) ||
  [questionTypes.TYPE_API || questionTypes.OPEN_ENDED].includes(
    node && node.type,
  );

export const formatTreeDataDrawTabelHeader = (
  data,
  rowSpan,
  filterOutHeaderIfPossible,
) => {
  const keyDisplay = [];
  let syncProgress = false;
  const dataHeader = [];
  if (!Array.isArray(data)) {
    return { dataHeader, keyDisplay, syncProgress };
  }

  const headerRow1 = [];
  const headerRow2 = [];
  const headerRow3 = [];
  data.forEach((row1) => {
    syncProgress = syncProgress || isSyncProgress(row1);
    if (!row1.children || row1.ntype === 'vocabset' || row1.ntype === 'video') {
      headerRow1.push({ ...row1, rowSpan });
      keyDisplay.push(row1);
    } else if (row1.ntype === 'exercise') {
      headerRow1.push({ ...row1, rowSpan: rowSpan - 1 });

      row1.children
        .filter((question) => question.ntype === 'question')
        .forEach((question) => {
          syncProgress = syncProgress || isSyncProgress(question);
          if (rowSpan === 2) {
            headerRow2.push(question);
          } else {
            headerRow3.push(question);
          }
        });
    } else if (row1.children) {
      headerRow1.push({ ...row1, rowSpan: 1 });
      row1.children.forEach((row2) => {
        syncProgress = syncProgress || isSyncProgress(row2);
        if (!row2.children || row2.ntype === 'vocabset') {
          headerRow2.push({ ...row2, rowSpan: rowSpan - 1 });
          keyDisplay.push(row2);
        } else if (row2.children) {
          headerRow2.push({ ...row2, rowSpan: 1 });
          row2.children.forEach((row3) => {
            syncProgress = syncProgress || isSyncProgress(row3);
            headerRow3.push(row3);
            keyDisplay.push(row3);
          });
        }
      });
    }
  });

  if (headerRow1.length) {
    dataHeader.push(headerRow1);
  }
  if (headerRow2.length) {
    dataHeader.push(headerRow2);
  }
  if (headerRow3.length) {
    dataHeader.push(headerRow3);
  }
  if (filterOutHeaderIfPossible) {
    while (
      dataHeader.length > 1 &&
      Array.isArray(dataHeader[0]) &&
      dataHeader[0].length <= 1
    ) {
      dataHeader.shift();
    }
  }
  return { dataHeader, keyDisplay, syncProgress };
};

export const getContentColumTable = (
  nodeEditer = false,
  user,
  item,
  node,
  type,
  changePassItem = () => {},
  viewerTakeDetail = () => {},
  formid,
) => {
  const progressDefault = '';
  if (!user || !item || !node) {
    return progressDefault;
  }

  let { progress } = user;
  const isUserGroup = user && user.type === 'user_group';

  progress = progress && progress[item.iid];
  const passed = progress && progress.pf ? 1 : 0;

  if (type === 'cp') {
    return `${(progress && progress.cp) || 0}%`;
  }

  if (type === 'pass' || item.type_display === 'pass') {
    if (isUserGroup) {
      return null;
    }

    return (
      <span className="text-center">
        <ActionToggle
          baseURL={aApiUrls.has_permissions}
          params={{
            actions: ['course:set:passed'], // Permission_Const_Course::COURSE_ACTION_CAN_SWITCH_THE_LEARNING_STATUS
            resources: [node],
          }}
          value={passed}
          disabled={!nodeEditer}
          name={'status'}
          permission={1}
          handleChange={(res, value) => {
            changePassItem(user, item, value);
          }}
          noLabel={true}
        />
      </span>
    );
  }

  if (type === 'reset-take' || item.type_display === 'reset-take') {
    if (isUserGroup) {
      return null;
    }

    const params = {
      target: {
        iid: user && user.iid,
        type: 'user',
      },
      node: {
        iid: node.iid,
        ntype: node.ntype,
      },
      item: {
        iid: item && item.iid,
        ntype: item && item.ntype,
      },
    };
    return (
      <DeleteItem
        alternativeApi={apiUrls.reset_progress}
        title={t1('reset_take_and_progress')}
        icon="autorenew"
        style={{ fontSize: 15, color: '#939393' }}
        params={params}
        formid={formid}
      />
    );
  }

  let content = progressDefault;
  if (progress && typeof progress.p !== 'undefined') {
    content = progress.p;
  }

  switch (item.ntype) {
    case ntypeDefine.QUESTION: {
      if (content !== progressDefault) {
        content = content || 0;
      } else if (progress && progress.tts) {
        content = '...';
      }
      if (
        [questionTypes.TYPE_OPEN_ENDED, questionTypes.TYPE_API].includes(
          item.type,
        )
      ) {
        content =
          progress && typeof progress.p !== 'undefined' ? progress.p : content;
        content = nodeEditer ? (
          <div>
            {content}{' '}
            <Icon
              style={{ cursor: 'pointer' }}
              icon="edit"
              title={t1('mark')}
              onClick={() => viewerTakeDetail(user, node, item)}
            />
          </div>
        ) : (
          content
        );
      }
      break;
    }
    case ntypeDefine.EXERCISE: {
      if (item.type === 'exam') {
        content = nodeEditer ? (
          <FlatButton
            label={`${content}`}
            onClick={() => viewerTakeDetail(user, node, item)}
            title={t1('marking')}
          />
        ) : (
          content
        );
      }
      break;
    }
    case ntypeDefine.SCO: {
      if (item.tpl_type === 'exam') {
        content = nodeEditer ? (
          <FlatButton
            label={`${content}`}
            onClick={() => viewerTakeDetail(user, node, item)}
            title={t1('marking')}
          />
        ) : (
          content
        );
      }
      break;
    }
    default:
      break;
  }
  return content;
};

export const getNtypeConfigFilter = (node, ntypes, modules, noExam) => {
  const ntypeConfigs = [];
  if (node.ntype === ntypeDefine.COURSE) {
    if (
      !noExam &&
      (modules.includes(ntypeDefine.SCO) ||
        modules.includes(ntypeDefine.EXERCISE))
    ) {
      ntypeConfigs.push({
        value: 'exam',
        label: t1('exam'),
      });
    }
    if (modules.includes(ntypeDefine.VIDEO)) {
      ntypeConfigs.push({
        value: 'video',
        label: t1('video'),
      });
    }
    if (modules.includes(ntypeDefine.VOCABSET)) {
      ntypeConfigs.push({
        value: 'vocabset',
        label: t1('vocabset'),
      });
    }
    if (modules.includes(ntypeDefine.EXERCISE)) {
      ntypeConfigs.push({
        value: 'exercise',
        label: t1('exercise'),
      });
    }
    if (
      (ntypes.includes('exercise') || ntypes.includes('exam')) &&
      modules.includes('question')
    ) {
      ntypeConfigs.push({
        value: 'question',
        label: t1('question'),
      });
    }
  } else if (node.ntype === ntypeDefine.PATH) {
    if (modules.includes(ntypeDefine.PATH)) {
      ntypeConfigs.push({
        value: 'path',
        label: t1('path'),
      });
    }
    if (modules.includes(ntypeDefine.COURSE)) {
      ntypeConfigs.push({
        value: 'course',
        label: t1('course'),
      });
    }
  }
  return ntypeConfigs;
};
