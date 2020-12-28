/**
 * Created by anhvtt on 09/05/2017.
 */
import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import Section from '../element/Section';
import ConfDashboard from '../dashboard/ConfDashboard';
import requireRoot from 'common/hoc/requireRoot';

class ConfSearchLayout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
    this.state = {
      menu: '',
      category: [],
      sectionsList: {},
    };
  }

  componentWillMount() {
    this.setConfig(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps !== 'undefined' &&
      typeof nextProps.menu !== 'undefined' &&
      nextProps.menu !== this.props.menu
    ) {
      this.setConfig(nextProps);
    }
  }

  setConfig = (props) => {
    const { sections, menu } = props;
    const category = [];
    const sectionsList = {};

    if (sections) {
      sections.forEach((section) => {
        sectionsList[section.id] = section.title;
        category.push(section.id);
      });
    }

    this.setState({
      menu,
      category,
      sectionsList,
    });
  };

  renderResultComponent(items, props) {
    const { sectionsList } = props;
    return (
      <div>
        {items &&
          items.map((item, index) => (
            <Section
              key={item.id || index}
              section={sectionsList[item.id] || item.id}
              blocksByContent={item.content}
            />
          ))}
      </div>
    );
  }

  render() {
    const { sectionsList, menu, category } = this.state;

    if (menu === 'dashboard') {
      return <ConfDashboard />;
    }

    return (
      <SearchWrapper
        formid="conf_search"
        searchResultKey={`conf_search_${menu}`}
        hiddenFields={{
          category,
        }}
        renderResultsComponent={this.renderResultComponent}
        showQueryField={false}
        hidePagination
        sectionsList={sectionsList}
        menuField={menu}
        autoSearchWhenValuesChange
      />
    );
  }
}

export default requireRoot(ConfSearchLayout);
