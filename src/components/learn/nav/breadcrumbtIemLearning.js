import React from 'react';
import get from 'lodash.get';
import Breadcrumb from 'antd/lib/breadcrumb';
import NavItem from './item';

const getNavsInParentDataTree = (treeNav, currentNavId) => {
  let result = [];

  let ok = false;
  treeNav.forEach(({ children, ...nav }) => {
    if (nav.navId === currentNavId) {
      result.push(nav);
      ok = true;
    }

    if (ok || !Array.isArray(children) || !children.length) {
      return;
    }
    const tmp = getNavsInParentDataTree(children, currentNavId);
    if (Array.isArray(tmp) && tmp.length) {
      result = [nav].concat(tmp);
    }
  });

  return result;
};

const getNavsSameTageInDataTreeWithParenNavs = (treeNav, parentNavs, tag) => {
  let result = [];
  let rightfAterItem = false;
  treeNav.forEach(({ children, ...nav }) => {
    if (rightfAterItem) {
      return;
    }
    const tags = nav.tags;
    if (Array.isArray(tags) && tags.includes(tag)) {
      result.push(nav);
    } else if (Array.isArray(children) && children.length) {
      result = result.concat(
        getNavsSameTageInDataTreeWithParenNavs(children, parentNavs, tag),
      );
    }

    if (parentNavs.find((pNav) => pNav.navId === nav.navId)) {
      rightfAterItem = true;
    }
  });

  return result;
};

const BreadcrumbTheItemIsLearning = ({
  currentNav,
  treeNav,
  currentNavId,
  isPreview,
  isReview,
}) => {
  let [navIdSelected, setNavIdSelected] = React.useState(null);
  const tag = get(currentNav, 'tags.[0]');

  if (!tag || !Array.isArray(treeNav) || !treeNav.length || !currentNavId) {
    return null;
  }

  const parentNavs = getNavsInParentDataTree(treeNav, currentNavId);

  if (!Array.isArray(parentNavs) || parentNavs.length <= 1) {
    return null;
  }

  const navsTheSameTag = getNavsSameTageInDataTreeWithParenNavs(
    treeNav,
    parentNavs,
    tag,
  ).filter((nav) => nav.navId !== currentNavId);

  if (!Array.isArray(navsTheSameTag) || !navsTheSameTag.length) {
    return null;
  }

  return (
    <Breadcrumb separator=">">
      {navsTheSameTag.map((nav) => {
        return (
          <Breadcrumb.Item
            className="breadcrumb-items-learning"
            onClick={() => {
              setNavIdSelected(nav.navId);
            }}
          >
            <NavItem
              className={`breadcrumb-item breadcrumb-item-tag-${tag}`}
              {...nav}
              breadcrumb
              expanded={true}
              isPreview={isPreview}
              isReview={isReview}
              navIdSelected={navIdSelected}
            />
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbTheItemIsLearning;
