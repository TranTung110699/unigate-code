import React from 'react';

import './stylesheet.scss';

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="bg-dark pb40 pt60" id="choosingPlan">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <h3 className="uppercase">
                Complete Training Course in All SAW Steps
              </h3>
            </div>
          </div>

          <div className="row mb32 mb-xs-24">
            <div className="col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 text-center">
              <p>
                From e-commerce fundamentals to complex style guides
                <br />
                for commercial photo studios.
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-3 text-center">
              <div
                className="feature boxed smooth-scroll"
                data-target="#soloPlan"
              >
                <h2 className="number">SOLO</h2>
                <p>FOR ENTRY-LEVEL ENTREPRENEURS</p>
              </div>
            </div>
            <div className="col-sm-3 text-center">
              <div
                className="feature boxed smooth-scroll"
                data-target="#retailerPlan"
              >
                <h2 className="number">PRO-RETAILER</h2>
                <p>FOR AMBITIOUS INTERNET RETAILERS</p>
              </div>
            </div>
            <div className="col-sm-3 text-center">
              <div
                className="feature boxed smooth-scroll"
                data-target="#studioPlan"
              >
                <h2>PRO-STUDIO</h2>
                <p>FOR PROFESSIONAL PHOTO STUDIOS</p>
              </div>
            </div>
            <div className="col-sm-3 text-center">
              <div
                className="feature boxed smooth-scroll"
                data-target="#apiPlan"
              >
                <h2>API</h2>
                <p>FOR MARKETPLACE INTEGRATIONS</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default index;
