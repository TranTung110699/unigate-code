import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { t1 } from 'translate';
import { getUrl } from 'routes/links/common';
import Icon from 'components/common/Icon';
import FlatButton from 'components/common/mui/NewButton';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from '../../contract/search/schema';

import Results from './Results';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    return <Results items={items} {...props} />;
  }

  render() {
    const { teacher } = this.props;

    const hiddenFields = {
      ntype: 'teaching_experience',
      staff_iid: (teacher && teacher.iid) || null,
    };

    return (
      <div>
        <SearchWrapper
          formid="teaching_experience_search"
          hiddenFields={hiddenFields}
          teacher={teacher}
          renderResultsComponent={this.renderResultComponent}
          schema={schema}
          noResultText={t1('no_teaching_experience_added')}
          classFormFilter="display-none"
        />

        <div className="m-t-25 text-center">
          <Link
            to={getUrl('node_edit', {
              ...teacher,
              ntype: 'teacher',
              step: 'add-teaching-experience',
              dialog: 1,
            })}
          >
            <FlatButton
              icon={<Icon icon={'plus'} />}
              label={t1('add_teaching_experience')}
              className="admin-btn"
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default Layout;
