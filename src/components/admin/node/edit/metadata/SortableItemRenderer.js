import React, { Component } from 'react';
import { getNode } from 'components/admin/node/utils';
import routes from 'routes/';
import MetadataRow from './row';
import MetadataRenderer from './MetadataRenderer';

class SortableItemRenderer extends Component {
  render() {
    const {
      nodes,
      itemAncestors,
      item,
      fieldEdit,
      depth,
      maximumDepth,
      baseUrl,
      parentItem,
      examTemplateIid,
      ...rest
    } = this.props;

    // get node again from store, because sometimes 'type' is missing
    // but maybe clone is too much since we're only missing the item.type
    let newItem;

    // console.log('SortableItemRenderer', fieldEdit);

    if (fieldEdit === 'metadata') {
      const nodeFromStore = getNode(item.iid, item.pid, nodes, maximumDepth);
      if (nodeFromStore && nodeFromStore.type) {
        item.type = nodeFromStore.type;
      }

      if (nodeFromStore && nodeFromStore.isExam) {
        item.isExam = nodeFromStore.isExam;
      }
      // if we're missing some other fields it's best just to clone
      // for now, as of 14Sep2017 we'll leave this out for performance
      if (nodeFromStore) {
        newItem = Object.assign({}, nodeFromStore, item);
      } else newItem = item;
    } else {
      newItem = item;
    }

    // if (depth < maximumDepth &&
    //     (depth < rootItemFetchedDepth || rootItemFetchedDepth === -1)
    //   ) {
    const renderChildren = depth < maximumDepth;
    let newBaseUrl;
    if (renderChildren) {
      newBaseUrl = '/';
      if (newItem.ntype) {
        newBaseUrl = routes.url('edit_item', {
          base: baseUrl,
          item: newItem,
        });
      }
    }
    return (
      <div>
        <MetadataRow
          {...rest}
          item={newItem}
          nodes={nodes}
          depth={depth}
          maximumDepth={maximumDepth}
          baseUrl={baseUrl}
          fieldEdit={fieldEdit}
          itemAncestors={itemAncestors}
          parentItem={parentItem}
          examTemplateIid={examTemplateIid || item.exam_template_iid}
        />
        {/*if newItem is sco'syllabus is sco-scorm then not show metadatarender(button add exam,...)*/}
        {renderChildren && newItem.tpl_type !== 'scorm' && (
          <MetadataRenderer
            {...rest}
            examTemplateIid={examTemplateIid || item.exam_template_iid}
            itemAncestors={itemAncestors}
            node={newItem}
            fieldEdit={fieldEdit}
            depth={depth + 1}
            maximumDepth={maximumDepth}
            baseUrl={newBaseUrl}
            nodes={nodes}
          />
        )}
      </div>
    );
  }
}

export default SortableItemRenderer;
