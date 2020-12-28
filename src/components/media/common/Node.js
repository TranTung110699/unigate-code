/**
 * Created by Peter Hoang Nguyen on 4/4/2017.
 */

import iconMapping from 'common/icons/IconMapping';

class ProcessMMData {
  constructor() {
    this.idCounter = 1;
  }

  processRootList(rootList) {
    if (!rootList) {
      return rootList;
    }
    const result = [];
    rootList.forEach((node, index) => {
      const newNode = Object.assign({}, node);

      const hasIdProperty = Object.prototype.hasOwnProperty.call(newNode, 'id');

      if (!hasIdProperty) {
        this.idCounter += 1;
        newNode.id = this.idCounter;
      }

      newNode.dir = '/';
      newNode.isRoot = true;
      newNode.root = node.id;
      newNode.type = 'dir';
      newNode.relative_path_from_root = '/';

      result[index] = newNode;
    });
    return result;
  }

  processNodeList(nodeList, parentId) {
    if (!nodeList) {
      return nodeList;
    }
    const result = [];
    nodeList.forEach((node, index) => {
      const newNode = Object.assign({}, node);

      const hasIdProperty = Object.prototype.hasOwnProperty.call(newNode, 'id');

      if (!hasIdProperty) {
        this.idCounter += 1;
        newNode.id = this.idCounter;
      }

      if (parentId) {
        newNode.parent_id = parentId;
      }
      newNode.size = node.size || 0;
      newNode.size = `${Math.round(newNode.size / 1000, -2)} k`;

      result[index] = newNode;
    });
    return result;
  }

  newFolderNode(currentNode, folderName) {
    const relativePathFromRoot = currentNode.relative_path_from_root
      ? currentNode.relative_path_from_root
      : '/';
    this.idCounter += 1;
    return {
      name: folderName,
      path: 'http://vlms.dev/ufiles/5836b4a0840e8219a565c721/123',
      relative_path_from_root: `${relativePathFromRoot}/${folderName}`,
      date: new Date().getTime(),
      date_display: new Date(),
      is_dir: 1,
      size: '0 k',
      size_display: '.',
      type: 'dir',
      id: this.idCounter,
    };
  }

  findNodeById(id, mediaList) {
    if (id === 0) {
      return mediaList;
    }
    return this.findNodeChildren(id, mediaList);
  }

  findChildrenById(id, mediaList) {
    if (id === 0) {
      return mediaList;
    }
    return this.findNodeChildren(id, mediaList);
  }

  findNodeChildren(id, nodes) {
    let result = [];
    for (let i = 0; i < nodes.length; i += 1) {
      if (nodes[i].id === id) {
        result = nodes[i].children;
        if (result.length !== 0) {
          return result;
        }
      }
    }

    if (result.length === 0) {
      for (let i = 0; i < nodes.length; i += 1) {
        result = this.findNodeChildren(id, nodes[i].children);
        if (result.length !== 0) {
          return result;
        }
      }
    }
    return [];
  }

  generateNodeIconClass(node) {
    let icon = '';

    if (!node.type) {
      return '';
    }

    switch (node.type.toLowerCase()) {
      case 'dir':
        icon = iconMapping.mapping('folder');
        break;
      case 'audio':
        icon = iconMapping.mapping('audio');
        break;
      case 'image':
        icon = iconMapping.mapping('picture');
        break;
      default:
        icon = iconMapping.mapping('file');
    }

    return icon;
  }
}

const processMMData = new ProcessMMData();
export default processMMData;
