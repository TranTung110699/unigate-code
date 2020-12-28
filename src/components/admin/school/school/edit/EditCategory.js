/**
 * Created by vohung on 02/07/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import nodeActions from 'actions/node/creators';
import CircularProgress from 'material-ui/CircularProgress';
import EditMetadata from 'components/admin/node/edit/metadata/MetadataContainer';
import routes from 'routes';
import Icon from 'components/common/Icon';
import { Link } from 'react-router-dom';
import { t1 } from 'translate';
import actionsCommon from 'actions/creators';

class Layout extends Component {
  style = { paddingTop: 200, textAlign: 'center' };

  constructor(props) {
    super(props);
    this.fetchCategoryOnSuccess = this.fetchCategoryOnSuccess.bind(this);
    this.renderContentSortableItem = this.renderContentSortableItem.bind(this);
  }

  componentWillMount() {
    const category = this.props.category;
    if (!category || !category.iid) {
      this.fetchCategory(this.props);
    } else {
      this.fetchCategoryOnSuccess(category);
    }
  }

  getTitle = (slug) => {
    let title;
    switch (slug) {
      case 'list_featured_courses_or_path':
        title = t1('featured_courses_and_path');
        break;
      case 'open_paths':
        title = t1('publicly_available_open_paths');
        break;
      case 'exam_paths':
        title = t1('exam_paths');
        break;
      default:
        title = '';
        break;
    }
    return title;
  };

  componentWillReceiveProps(nextProps) {
    const slug = this.props.slug;
    if (
      nextProps &&
      (!nextProps.category || !nextProps.category.iid) &&
      nextProps.slug !== slug
    ) {
      this.fetchCategory(nextProps);
    }
    const siteTitle = this.getTitle(nextProps.slug);
    this.props.dispatch(actionsCommon.setTopMenuElement({ siteTitle }));
  }

  checkEditItemFromBank = (node) => {
    const search = window.location.search;
    const { dispatch } = this.props;

    if (search && search.indexOf('?/bank/') !== -1) {
      const tmp = search.replace('?/bank/', '').split('?');
      const ntype = tmp && tmp.length ? tmp[0] : '';
      const type = tmp.length > 1 ? tmp[1] : '';
      dispatch(nodeActions.setBankNtype(ntype, type, node.iid));
    }
  };

  fetchCategory = (props) => {
    const { dispatch, slug } = props;
    dispatch(
      nodeActions.fetchNode({
        slug,
        ntype: 'path',
        depth: 1,
        executeOnSuccess: this.fetchCategoryOnSuccess,
      }),
    );
  };

  fetchCategoryOnSuccess = (node) => {
    const { dispatch, slug } = this.props;
    dispatch(nodeActions.setSlugMapping(slug, node.iid));
    this.checkEditItemFromBank(node);
  };

  renderContentSortableItem(data) {
    const item = data.item || {};
    return (
      <div>
        <span>
          {item.name}({item.iid})
        </span>
        <span className="pull-right">
          <Link to={routes.url('node_edit', item)}>
            <Icon icon="edit" />
          </Link>
        </span>
      </div>
    );
  }

  render() {
    const { category, slug } = this.props;
    const applicableNtypes = this.props.applicableNtypes || ['course'];

    return !category || !category.iid ? (
      <div style={this.style}>
        <CircularProgress />
        <CircularProgress size={60} thickness={5} />
        <CircularProgress size={80} thickness={7} />
      </div>
    ) : (
      <div>
        <EditMetadata
          sortable
          node={category}
          renderContentSortableItem={this.renderContentSortableItem}
          applicableNtypes={applicableNtypes}
        />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { slug } = props;
  const slugsMapping = state.slugIidMapping;
  const nodes = state.tree;
  return {
    category: nodes[slugsMapping[slug]],
  };
}

export default connect(mapStateToProps)(Layout);
