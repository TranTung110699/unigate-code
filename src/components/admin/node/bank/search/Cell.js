import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { t1 } from 'translate';
import MUTags from 'schema-form/elements/tags';
import DisplayHtml from 'components/common/html';
import { ntype as ntypes } from 'configs/constants';
import { questionTypeInText } from 'components/admin/question/schema/question-types';

class Cell extends Component {
  render() {
    const { column, item } = this.props;
    let content;

    switch (column) {
      case 'id':
      case 'code': {
        let action = '';

        switch (item.ntype) {
          case ntypes.QUESTION:
          case ntypes.VIDEO:
          case ntypes.VOCAB:
          case ntypes.EXERCISE:
            action = 'edit';
            break;
          case ntypes.PATH:
          case ntypes.PROGRAM:
          case ntypes.COURSE:
          case ntypes.SKILL:
            action = 'dashboard';
            break;
          case ntypes.SYLLABUS:
          case ntypes.CREDIT:
          case ntypes.SCO:
            action = 'children';
            break;
          default:
            action = 'dashboard';
        }

        // content = (
        //   <Link to={`/admin/${item.ntype}/${item.iid}/${action}`}>
        //     {item.iid}
        //   </Link>
        // );
        content = item.code || item.iid || item.id;
        break;
      }
      case 'credit':
        content = item.code;
        break;
      case 'slug':
        content = item.slug;
        break;
      case 'name':
        content = item.name;
        break;
      // case 'code':
      //   content = (
      //     <Link target="_blank" to={`/admin/${item.ntype}/${item.iid}`}>{item.code}</Link>
      //   );
      //   break;
      case 'content':
        content = (
          <DisplayHtml
            content={item.content}
            className="question-content__text"
          />
        );
        break;
      case 'author':
        content = item.u && item.u.name;
        break;

      case 'vname':
      case 'ico':
      case 'program':
      case 'description':
        content = item[column];
        break;
      case 'total_credit':
        content = item.credit;
        break;
      case 'total_hours':
        content = item.hours;
        break;
      case 'tags':
        content = <MUTags tags={item.tags} />;
        break;
      case 'type':
        if (item.ntype === 'question') {
          content = questionTypeInText(item.type);
        } else {
          content = item.type;
        }
        break;
      case 'organizations':
      case 'positions':
      case 'skills':
        content =
          item &&
          item.__expand &&
          Array.isArray(item.__expand[column]) &&
          item.__expand[column]
            .map((elem) => elem && elem.name)
            .reduce((result, elem) => [...result, elem, <br />], []);
        break;
      case 'difficulty':
        content = t1(item[column]);
        break;
      case 'online_only':
        if (item[column]) content = t1('online_only');
        else content = t1('online_and_offline');
        break;
      default:
        content = item[column];
        break;
    }
    return <span>{content}</span>;
  }
}

export default Cell;
