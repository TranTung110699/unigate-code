import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'components/common/mui/RaisedButton';
import { FieldArray, Form, FormSection } from 'redux-form';
import IconClose from 'material-ui/svg-icons/navigation/close';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import ContentAdd from 'material-ui/svg-icons/content/add';

class Addable extends React.Component {
  paperStyle = {
    width: '100%',
    height: 'auto',
    padding: 10,
    marginBottom: 1 + 'em',
  };

  divStyle = { position: 'relative' };

  iconCloseStyle = {
    position: 'absolute',
    right: 10,
    top: 0,
    width: 20,
    height: 20,
    cursor: 'pointer',
  };

  constructor(props) {
    super(props);
  }

  renderMembers = ({ fields, meta: { touched, error } }) => {
    const {
      float,
      depth,
      name,
      xpath,
      hiddenAddButton,
      hiddenRemoveButton,
      defaultValueToAdd,
      renderElementToAdd,
      renderButtonAdd,
      level,
      limit,
    } = this.props;

    const node = this.props.node || this.props.defaultValue || [];
    const addButtonLabel = this.props.addButtonLabel || t1('add');

    return (
      <div style={level ? { padding: 25 } : {}}>
        {fields.map((member, index) => {
          const elementToAdd = renderElementToAdd({
            index,
            total: fields.length,
            defaultValue: node[index],
            xpath: `${xpath || name}[${index}]`,
            depth: depth - 1,
            level: (level || 0) + 1,
          });

          return (
            <Paper key={member} zDepth={2} style={this.paperStyle}>
              <div className={'container-fluid'}>
                <div className="row" style={this.divStyle}>
                  {!hiddenRemoveButton && (
                    <IconClose
                      className="icon-button"
                      style={this.iconCloseStyle}
                      title={t1('remove')}
                      onClick={() => fields.remove(index)}
                    />
                  )}
                  {depth > 1 ? (
                    <Form name={member}>{elementToAdd}</Form>
                  ) : (
                    <FormSection name={member}>{elementToAdd}</FormSection>
                  )}
                </div>
              </div>
            </Paper>
          );
        })}
        {!hiddenAddButton && (!limit || fields.length < limit) && (
          <div className="clearfix">
            {typeof renderButtonAdd === 'function' ? (
              renderButtonAdd(fields, xpath)
            ) : (
              <RaisedButton
                // style={float && { float }}
                label={addButtonLabel}
                labelPosition="after"
                icon="plus"
                onClick={() =>
                  fields.push(
                    defaultValueToAdd
                      ? defaultValueToAdd({
                          index: fields.length,
                          total: fields.length,
                        })
                      : depth > 1
                      ? []
                      : {},
                  )
                }
              />
            )}
          </div>
        )}
        {touched && error && <span>{error}</span>}
      </div>
    );
  };

  render() {
    const { name } = this.props;
    return <FieldArray name={name} component={this.renderMembers} />;
  }
}

Addable.propTypes = {
  name: PropTypes.string.isRequired,
  renderElementToAdd: PropTypes.func,
};

Addable.defaultProps = {
  renderElementToAdd: () => null,
};

export default Addable;
