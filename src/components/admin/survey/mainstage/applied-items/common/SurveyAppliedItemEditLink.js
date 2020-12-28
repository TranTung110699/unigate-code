import React from 'react';
import { Link } from 'react-router-dom';
import { surveyAppliedItemTypes } from 'configs/constants/survey';
import routes from 'routes';
import lodashGet from 'lodash.get';

const getUrl = ({ item }) => {
  switch (lodashGet(item, 'type')) {
    case surveyAppliedItemTypes.COURSE: {
      return routes.url('node_edit', {
        ntype: 'course',
        iid: lodashGet(item, 'item_iid'),
      });
    }
    case surveyAppliedItemTypes.CREDIT_SYLLABUS: {
      return routes.url('node_edit', {
        ntype: 'syllabus',
        type: 'credit',
        iid: lodashGet(item, 'item_iid'),
      });
    }
    case 'semester': {
      return routes.url('node_edit', {
        ntype: 'semester',
        iid: lodashGet(item, 'item_iid'),
      });
    }
    default:
      return null;
  }
};

export default (props) => <Link to={getUrl(props)} {...props} />;
