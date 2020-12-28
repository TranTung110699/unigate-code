import React from 'react';
import ContactImagePortrait from './resources/contact-portrait.png';
import ContactImageLandscape from './resources/contact-landscape.png';
import Form from './form';
import './stylesheet.scss';

class Contact extends React.Component {
  cssClass = 'vieted-home-page-contact';

  render() {
    return (
      <div className={this.cssClass}>
        <div className="container">
          <div className={`row ${this.cssClass}__content`}>
            <div className={`col-sm-6 ${this.cssClass}__content-group`}>
              <Form />
            </div>
            <div className={`col-sm-6 ${this.cssClass}__content-group`}>
              <div className={`${this.cssClass}__content-image-wrapper`}>
                <img
                  className={`${this.cssClass}__content-image\
                    ${this.cssClass}__content-image--portrait`}
                  src={ContactImagePortrait}
                  alt="contact"
                />
                <img
                  className={`${this.cssClass}__content-image\
                    ${this.cssClass}__content-image--landscape`}
                  src={ContactImageLandscape}
                  alt="contact"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Contact.propTypes = {};

Contact.defaultProps = {};

export default Contact;
