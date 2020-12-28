import React from 'react';
import lodashGet from 'lodash.get';
import Warning from 'components/common/Warning';
import { t1 } from 'translate';
import { last } from 'common/utils/Array';

const startedCloningSyllabus = (node) =>
  lodashGet(node, 'processing.cloning_syllabus.ts');

const isCloningSyllabus = (node) =>
  lodashGet(node, 'processing.cloning_syllabus.is_processing');

const isCloningSyllabusSuccess = (node) =>
  lodashGet(node, 'processing.cloning_syllabus.success');

const pathToErrorItem = (node) =>
  lodashGet(node, 'processing.cloning_syllabus.path_to_error_item');

const CloningSyllabus = ({ node }) => {
  if (
    startedCloningSyllabus(node) &&
    !isCloningSyllabus(node) &&
    !isCloningSyllabusSuccess(node)
  ) {
    const errItem = last(pathToErrorItem(node));

    return (
      <React.Fragment>
        <Warning>
          <div>
            {t1('cannot_create_syllabus_for_this_course')}.{' '}
            {t1('because_%s_%s_is_broken', [
              lodashGet(errItem, 'ntype'),
              lodashGet(errItem, 'id_or_iid'),
            ])}
          </div>
        </Warning>
      </React.Fragment>
    );
  }

  return null;
};

export default CloningSyllabus;
