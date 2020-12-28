import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import schema from './course-generator-schema';
import { t1 } from 'translate';
import Links from 'routes/links';
import Widget from 'components/common/Widget';

class PracticeSyllabusContainer extends Component {
  onRequestSuccessful = (json) => {
    if (json.success) {
      window.location.reload();
    }
  };

  render() {
    const { node } = this.props;
    return (
      <div className="container-fluid">
        <div className={'row'}>
          <div className="col-md-4">
            <Widget title={t1('current_practice_courses')}>
              {node.bank_practice_courses &&
              node.bank_practice_courses.length ? (
                <div>
                  {node.bank_practice_courses.map((course, i) => {
                    course.slug = 'practice';
                    return (
                      <div key={`a-${course.iid}`}>
                        <h3 style={{ fontWeight: 'bold' }}>
                          <a
                            target="_blank"
                            href={Links.overViewCourse(course)}
                          >
                            {t1('practice_#%d', i + 1)} ({course.type})
                          </a>
                        </h3>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>{t1('there_are_no_practice_courses_yet')}</div>
              )}
            </Widget>
            <hr />
            <Widget title={t1('generate_practice_courses')}>
              <NodeNew
                schema={schema}
                hiddenFields={{ iid: node.iid }}
                alternativeApi="/exam-template/generate-practice-course"
                formid={`generate-practice-course-${node.iid}`}
                requestSuccessful={this.onRequestSuccessful}
              />
            </Widget>
          </div>
        </div>
      </div>
    );
  }
}

export default PracticeSyllabusContainer;
