"use client";
import React from "react";

function ContactForm() {
  return (
    <div className="contact-form-area">
      <h3>Your Success Starts Here!</h3>
      <form>
        <div className="row">
          <div className="col-lg-6 mb-20">
            <div className="form-inner">
              <label>Full Name</label>
              <input type="text" required />
            </div>
          </div>
          <div className="col-lg-6 mb-20">
            <div className="form-inner">
              <label>Company / Organization *</label>
              <input type="text" required />
            </div>
          </div>
          <div className="col-lg-6 mb-20">
            <div className="form-inner">
              <label>Phone *</label>
              <input type="text" />
            </div>
          </div>
          <div className="col-lg-6 mb-20">
            <div className="form-inner">
              <label>Company email *</label>
              <input type="email" required />
            </div>
          </div>
          <div className="col-lg-12 mb-20">
            <div className="form-inner">
              <label>Your Subject *</label>
              <input type="text" required />
            </div>
          </div>
          <div className="col-lg-12 mb-30">
            <div className="form-inner">
              <label>Message *</label>
              <textarea defaultValue={""} />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-inner">
              <button
                className="primary-btn2"
                type="submit"
                data-text="Submit Now"
              >
                <span>Submit Now</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
