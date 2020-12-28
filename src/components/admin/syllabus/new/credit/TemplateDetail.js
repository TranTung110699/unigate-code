import React, { Component } from 'react';
import { t1 } from 'translate';
import depth1 from './img/depth1.png';
import depth2 from './img/depth2.png';
import RaisedButton from 'components/common/mui/RaisedButton';
import { templateTypes } from '../../schema/template-types';

class TemplateDetail extends Component {
  render() {
    const { type } = this.props;

    const style = {
      minHeight: '350px',
    };

    const list = [
      {
        type: 'depth1',
        description: t1('mini_syllabus'),
        avatar: depth1,
      },
      {
        type: 'depth2',
        description: t1('standard_syllabus'),
        avatar: depth2,
      },
    ];

    const template = list.find((item) => item.type == type);
    return (
      <div className="text-center whitebox" style={style}>
        <div>
          <img src={template.avatar} style={{ width: '80%' }} />
        </div>
        <div>
          {type == templateTypes.DEPTH1 && (
            <div>
              <p>
                {t1(
                  'mini_syllabus_is_suitable_for_short_syllabus_which_contains_only_an_ordered_list_of_lectures_and_exercises',
                )}
              </p>
            </div>
          )}

          {type == templateTypes.DEPTH2 && (
            <div>
              <p>
                {t1('standard_syllabus_is_suitable_for_syllabus_with_chapters')}
              </p>
            </div>
          )}
        </div>
        <div>
          <RaisedButton
            primary
            label={t1('create_syllabus')}
            onClick={() => {
              this.props.onClick(type);
            }}
          />
        </div>
      </div>
    );
  }
}

export default TemplateDetail;
