import React from 'react';

import SyllabusEditContainer from 'components/admin/syllabus/edit/EditContainer';

export default {
  componentId: 'SyllabusEditContainer',
  path:
    '(small|medium)?/admin/:unnamed(credit|syllabus|sco|video|question|exercise)/*',
  component: SyllabusEditContainer,
};
