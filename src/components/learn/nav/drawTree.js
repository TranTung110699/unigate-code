import React from 'react';
import { t1 } from 'translate';
import AntdTable from 'antd/lib/table';
import NavItem from './item';
import './stylesheet.scss';
import DownloadAttachmentsButton from '../viewer/download-attachments';
import { connect } from 'react-redux';
import { closeNavDrawer } from '../../../actions/learn';
import { isSmallScreen } from '../../../common';

const getClassNameForItem = (nav, currentNavId, mode) => {
  let className = '';
  if (nav.isHeader) {
    className += 'header';
  }
  if ((currentNavId === nav.navId || nav.nowPlaying) && mode !== 'overview') {
    className += ' active';
  }
  return className;
};

const getExamClass = (nav, nodes) => {
  const { nodeIid } = nav;
  let node = {};
  if (nodes && nodes[nodeIid]) {
    node = nodes[nodeIid];
  }

  if (node && (node.type === 'exam' || node.tpl_type === 'exam')) {
    return 'exam';
  }

  return '';
};

const depthExpanded = 1;
const getDataToRender = (
  navs,
  { children },
  nodes,
  currentNavId = '',
  depth = 0,
) => {
  if (
    !Array.isArray(children) ||
    !children.length ||
    !Array.isArray(navs) ||
    !navs.length
  ) {
    return [];
  }
  let currentNav = null;
  let expandedRowKeysDefault = [];
  const dataSource = children
    .map((iid) => {
      const node = nodes[iid];

      const nav = navs.find(({ nodeIid }) => String(nodeIid) === String(iid));
      if (!nav || !node) {
        return false;
      }

      if (nav.navId === currentNavId) {
        currentNav = nav;
      }

      const childrenData = getDataToRender(
        navs,
        node,
        nodes,
        currentNavId,
        depth + 1,
      );
      const childrenExpandedRowKeys = Array.isArray(
        childrenData.expandedRowKeysDefault,
      )
        ? childrenData.expandedRowKeysDefault
        : [];
      if (
        depth <= depthExpanded ||
        nav.navId === currentNavId ||
        childrenExpandedRowKeys.includes(currentNavId)
      ) {
        expandedRowKeysDefault.push(nav.navId);
      }
      expandedRowKeysDefault = expandedRowKeysDefault.concat(
        childrenExpandedRowKeys,
      );

      currentNav = currentNav || childrenData.currentNav;

      return {
        ...nav,
        children:
          Array.isArray(childrenData.dataSource) &&
          childrenData.dataSource.length
            ? childrenData.dataSource
            : null,
      };
    })
    .filter(Boolean);

  return {
    dataSource,
    expandedRowKeysDefault,
    currentNav,
  };
};

const TreeNav = ({
  currentNavId,
  navs,
  isPreview,
  isReview,
  learnItem,
  nodes,
  mode,
  syllabus,
  surveyUrl,
  dispatch,
}) => {
  let [navIdSelected, setNavIdSelected] = React.useState(null);
  let [expandedRowKeys, setExpandedRowKeys] = React.useState(null);

  const { dataSource, expandedRowKeysDefault, currentNav } = getDataToRender(
    navs,
    learnItem,
    nodes,
    currentNavId,
  );

  if (!Array.isArray(dataSource) || !dataSource.length) {
    return null;
  }

  const currentExpandedRowKeys =
    expandedRowKeys !== null ? expandedRowKeys : expandedRowKeysDefault;

  const onClickProp = isSmallScreen
    ? {
        onClick: () => {
          dispatch(closeNavDrawer(false));
        },
      }
    : {};

  const columns = [
    {
      title: t1('name'),
      render: (text, nav) => {
        return (
          <div className="w-100 tree-item">
            <div
              className={`${getClassNameForItem(nav, currentNavId, mode)} ${
                nav.navId
              } ${getExamClass(nav, nodes)}`}
              key={nav.navId}
              {...onClickProp}
            >
              <NavItem
                {...nav}
                expanded={currentExpandedRowKeys.includes(nav.navId)}
                isPreview={isPreview}
                isReview={isReview}
                navIdSelected={navIdSelected}
                surveyUrl={surveyUrl}
              />
            </div>
          </div>
        );
      },
    },
  ];

  const handleOnExpand = (expanded, key) =>
    setExpandedRowKeys(
      currentExpandedRowKeys
        .filter((id) => id !== key)
        .concat(expanded ? [key] : []),
    );

  return [
    <AntdTable
      rowKey="navId"
      onRowClick={(record) => {
        setNavIdSelected(record.navId);
        // handleOnExpand(
        //   !currentExpandedRowKeys.includes(record.navId),
        //   record.navId,
        // );
      }}
      onExpand={(expanded, record = {}) => {
        handleOnExpand(expanded, record.navId);
      }}
      expandedRowKeys={currentExpandedRowKeys}
      showHeader={false}
      columns={columns}
      dataSource={dataSource.filter((data) => {
        return data.link !== surveyUrl;
      })}
      pagination={false}
      bordered={false}
      size="middle"
      defaultExpandAllRows
      rowClassName={(record) => {
        // console.log({record});
        return getRowClassName(record, syllabus, currentNavId, mode);
      }}
      className={`learn-nav-tree ${
        mode === 'overview' ? 'learn-nav-tree-overview' : ''
      }`}
      footer={() => (
        <DownloadAttachmentsButton
          syllabusIid={syllabus.iid}
          learnItem={learnItem}
        />
      )}
    />,
  ];
};

export default connect()(TreeNav);

const getRowClassName = (record, syllabus, currentNavId, mode) => {
  let ret = `row-item ${
    record.navId === currentNavId && mode !== 'overview' ? 'active' : ''
  }`;
  if (syllabus.max_depth != 1 && record.ntype == 'sco' /* default = 2*/) {
    if (record.treeDepth == 1) ret = ret + ' sco-level-1';
    else {
      if (record.tpl_type != 'scorm') ret = ret + ' sco-level-2';
    }
  }

  // tags
  if (window.TAG_COLORS) {
    const tag =
      record.tags &&
      record.tags.length &&
      record.tags.find((tag) => {
        return window.TAG_COLORS[tag];
      });
    if (tag) {
      return `${ret} tag-taphuan tag-${tag}`;
    }
  }

  return ret;
};
