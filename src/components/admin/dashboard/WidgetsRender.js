import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import GridLayout from 'react-grid-layout';
import { connect } from 'react-redux';
import 'react-grid-layout/css/styles.css';
import RaisedButton from 'material-ui/RaisedButton';
import widgetActions from 'actions/admin/widget/actions';
import { t1 } from 'translate';
import sagaActions from 'actions/node/saga-creators';
import contestApiUrls from 'components/admin/contest/endpoints';
import Widget from './widget/index';
// import Widget2 from 'components/common/Widget';

import { generateConfigsDefault } from './util';
import './stylesheet.scss';

const styles = {
  widgetContainer: {
    transform: 'translate(0px, 0px)',
  },
  gridLayout: {
    padding: 0,
    margin: 0,
  },
};

const MIN_ROW_HEIGHT = 100;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 1000 };
  }

  componentDidMount() {
    this.setState({ width: this.elemWidth });
  }

  handleLayoutChanged = (layout) => {
    this.layout = layout;
  };

  getHeightItem = (item, layout) => {
    const i = layout && layout.find((l) => l.i === item.id);
    return ((i && i.h) || item.height) * 100 - 36;
  };

  handleCancelResize = () => {
    const { dispatch } = this.props;
    dispatch(widgetActions.enableResize(false));
  };

  handleUpdateWidgetLayout = () => {
    const { dispatch } = this.props;
    dispatch(
      sagaActions.getDataRequest(
        {
          url: contestApiUrls.change_exam_shift_for_user,
          post: true,
          executeOnSuccess: this.handleCancelResize,
        },
        {
          widget: {
            layout: this.layout,
          },
          _sand_step: 'change_widget_layout',
        },
      ),
    );
  };

  render() {
    const { items, enableResize, layout, node } = this.props;

    // GridLayout expects layout[i].static to be strictly boolean. not [0,1] integer
    // if (Array.isArray(layout) && layout.length) {
    //   layout.forEach((el) => {
    //     el.static = !!el.static;
    //   });
    // }

    return (
      <Fragment>
        <GridLayout
          className="widget-gird-layout-container"
          layout={/* layout || */ generateConfigsDefault(items)}
          rowHeight={MIN_ROW_HEIGHT}
          style={styles.gridLayout}
          width={this.state.width}
          isDraggable={enableResize}
          isResizable={enableResize}
          autoSize
          useCSSTransforms={false}
          onLayoutChange={this.handleLayoutChanged}
        >
          {items &&
            items
              .map((item) => {
                if (!item) return null;

                const style = Object.assign({}, item.componentStyle, {
                  height: this.getHeightItem(item, layout),
                  overflowY: 'scroll',
                });

                // return <div
                //   key={item.id}
                //   className={'widget-container'}
                // ><Widget2 title={item.label}>{item.component()}</Widget2>
                // </div>;

                return (
                  <div
                    key={item.id}
                    className={'widget-container'}
                    style={styles.widgetContainer}
                  >
                    <Widget
                      id={item.id}
                      className={item.className}
                      label={item.label}
                      href={item.href}
                      expand={item.expand}
                      component={item.component}
                      menuOptions={item.menuOptions}
                      componentStyle={style}
                      node={node}
                    />
                  </div>
                );
              })
              .filter((item) => item !== null)}
        </GridLayout>
        {enableResize && (
          <div className="dashboard-action">
            <RaisedButton
              label={t1('cancel')}
              className="cancel"
              keyboardFocused
              onClick={this.handleCancelResize}
            />
            <RaisedButton
              label={t1('update')}
              keyboardFocused
              primary
              onClick={this.handleUpdateWidgetLayout}
            />
          </div>
        )}
      </Fragment>
    );
  }
}

Index.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()),
  className: PropTypes.string,
};

Index.defaultProps = {
  items: null,
  className: null,
};

const mapStateToProps = (state) => ({
  enableResize: state.widget.enableResize,
});

export default connect(mapStateToProps)(Index);
