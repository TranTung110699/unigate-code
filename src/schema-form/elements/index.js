import { t1 } from 'translate';
import React from 'react';
import Field from 'redux-form/es/Field';
import FormSection from 'redux-form/es/FormSection';
import { normalizeVimeoUrl, normalizeYoutubeUrl } from 'common/normalizers';
import { isPhoneNumber } from 'common/validators';

import ElementFormSection from 'schema-form/Form';

import VarDump from 'components/common/VarDump';
import Store from 'store';
import lodashGet from 'lodash.get';
import { UiLibs } from 'configs/constants';
import Text from './text';
import SocialVideoInputField from './social-video-input';
import Guided from 'components/common/guided';

import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import SelectField from 'schema-form/elements/redux-form-fields/MuiSelectField';
import Checkbox from 'schema-form/elements/redux-form-fields/MuiCheckbox';
import AntCheckbox from 'schema-form/elements/redux-form-fields/AntCheckbox';
import AntSelectField from 'schema-form/elements/redux-form-fields/AntSelectField';
import Radio from 'schema-form/elements/redux-form-fields/MuiRadio';
import AntRadio from 'schema-form/elements/redux-form-fields/AntRadio';
import AntInputField from 'schema-form/elements/redux-form-fields/AntInputField';
import MultiCheckbox from 'schema-form/elements/redux-form-fields/MuiMultiCheckbox';
import AntMultiCheckbox from 'schema-form/elements/redux-form-fields/AntMultiCheckbox';

const YoutubeUrl = (props) => (
  <Field component={Text} {...props} format={normalizeYoutubeUrl} />
);
const VimeoUrl = (props) => (
  <Field component={Text} {...props} format={normalizeVimeoUrl} />
);
const SocialVideoInput = (props) => (
  <FormSection name={props.name}>
    <SocialVideoInputField {...props} />
  </FormSection>
);

const HiddenInput = <input type="hidden" />;
const Hidden = (props) => <Field name={props.name} component={HiddenInput} />;

const styles = {
  text: {
    marginBottom: '10px',
  },
};

export class Element extends React.PureComponent {
  renderContentElement = ({ type, uiLib, ...schema }) => {
    let Element = null;
    //TODO: Tạm thời để config này để có thể dùng ant-date-time-picker nhưng không dùng ant-input,
    // tuy nhiên sau khi move toàn bộ sang Ant thì chỉ cần 1 config chooseUiLib
    const chooseTextIputLib = uiLib || UiLibs.ANT;

    const unknownElement = (
      <div>
        Element not defined <VarDump data={schema} />
      </div>
    );

    switch (type) {
      case 'text': {
        if (chooseTextIputLib === UiLibs.MATERIAL_UI) {
          Element = (
            <TextField style={styles.text} floatingLabelFixed {...schema} />
          );
        } else {
          Element = <AntInputField style={styles.text} {...schema} />;
        }

        break;
      }
      case 'phone': {
        const { errorText } = schema;
        if (chooseTextIputLib === UiLibs.ANT) {
          Element = (
            <AntInputField
              style={styles.text}
              type="phone"
              validate={[isPhoneNumber(errorText)]}
              floatingLabelFixed
              {...schema}
            />
          );
        } else {
          Element = (
            <TextField
              floatingLabelFixed
              validate={[isPhoneNumber(errorText)]}
              {...schema}
            />
          );
        }

        break;
      }
      case 'password': {
        if (chooseTextIputLib === UiLibs.MATERIAL_UI) {
          Element = (
            <TextField floatingLabelFixed type="password" {...schema} />
          );
        } else {
          Element = (
            <AntInputField style={styles.text} type="password" {...schema} />
          );
        }
        break;
      }
      case 'number': {
        if (chooseTextIputLib === UiLibs.MATERIAL_UI) {
          Element = <TextField type="number" {...schema} />;
        } else {
          Element = (
            <AntInputField style={styles.text} type="number" {...schema} />
          );
        }
        break;
      }
      case 'checkbox': {
        if (chooseTextIputLib === UiLibs.MATERIAL_UI) {
          Element = Checkbox(schema);
        } else {
          Element = AntCheckbox(schema);
        }
        break;
      }
      case 'select': {
        if (chooseTextIputLib === UiLibs.MATERIAL_UI) {
          Element = SelectField(schema);
        } else {
          Element = AntSelectField(schema);
        }
        break;
      }
      case 'multiCheckbox': {
        if (
          chooseTextIputLib === UiLibs.MATERIAL_UI ||
          typeof schema.renderCustomizableOptions === 'function'
        ) {
          Element = MultiCheckbox(schema);
        } else {
          Element = AntMultiCheckbox(schema);
        }
        break;
      }
      case 'youtubeUrl': {
        Element = YoutubeUrl(schema);
        break;
      }

      case 'vimeoUrl': {
        Element = VimeoUrl(schema);
        break;
      }
      case 'socialVideoInput': {
        // console.log('socialVideoInput', schema);
        Element = SocialVideoInput(schema);
        break;
      }
      case 'seo': {
        if (chooseTextIputLib === UiLibs.ANT) {
          Element = (
            <div>
              <AntInputField
                name="seo_title"
                floatingLabelText={t1('seo_title')}
              />
              <AntInputField
                name="seo_description"
                floatingLabelText={t1('seo_description')}
              />
            </div>
          );
        } else {
          Element = (
            <div>
              <TextField name="seo_title" floatingLabelText={t1('seo_title')} />
              <TextField
                name="seo_description"
                floatingLabelText={t1('seo_description')}
              />
            </div>
          );
        }
        break;
      }
      case 'radio': {
        if (chooseTextIputLib === UiLibs.MATERIAL_UI) {
          Element = Radio(schema);
        } else {
          Element = AntRadio(schema);
        }
        break;
      }
      case 'section': {
        Element = (
          <FormSection name={schema.name}>
            <ElementFormSection
              {...this.props}
              {...schema}
              isFormSection="1"
              hideSubmitButton
            />
          </FormSection>
        );
        break;
      }
      case 'hidden': {
        Element = Hidden(schema);
        break;
      }
      // in this case, schema.fieldName doesn't matter any more. this is just
      // a react component that contains its own <Field> logic
      // and it will be encapsulated inside this form
      case 'cascade': {
        if (schema.component) {
          if (React.isValidElement(schema.component)) {
            // is React element
            Element = schema.component;
          } else {
            try {
              // is React component
              const C = schema.component;
              Element = <C {...schema} />;
            } catch (ex) {
              Element = unknownElement;
            }
          }
        } else if (schema.schema) {
          Element = (
            <ElementFormSection
              {...this.props}
              {...schema}
              isFormSection="1"
              hideSubmitButton
            />
          );
        }
        break;
      }
      case 'help': {
        if (schema.component && React.isValidElement(schema.component)) {
          // is React element
          console.log('aaaaa');
          Element = schema.component;
        } else {
          console.log('bbbb');
          Element = <div>invalid help component</div>;
        }

        break;
      }
      default: {
        // type: <SomeComponent />
        try {
          Element = <Field component={type} {...schema} />;
        } catch (ex) {
          Element = unknownElement;
        }
      }
    }

    // if (schema.guide) {
    //   Element = <Guided guide={schema.guide}>{Element}</Guided>;
    // }

    return Element;
  };

  render() {
    const schema = this.props.schema || {};
    const { styleWrapper, classWrapper, ...propsSchema } = schema;
    const ElementRender = this.renderContentElement(propsSchema);
    // console.log("form elements rendering....", schema.name);
    // console.log({ props: this.props });
    return classWrapper || styleWrapper ? (
      <div className={classWrapper} style={styleWrapper}>
        {ElementRender}
      </div>
    ) : (
      ElementRender
    );
  }
}
