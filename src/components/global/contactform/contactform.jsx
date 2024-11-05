"use client";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

function ContactForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if reCAPTCHA is checked
    if (!captchaValue) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({
          name: "",
          company: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });
        // router.push("/thank-you");
      } else {
        setErrorMessage("Failed to send your message. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="contact-form-area" id="contactForm">
      <ToastContainer />
      <h3>Your Success Starts Here!</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="access_key"
          value="324b2d24-b3f4-48e9-af01-0ba65fa02b2c"
        />

        <div className="row">
          <div className="col-lg-6 mb-20">
            <div className="form-inner">
              <input
                placeholder="Full Name *"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-lg-6 mb-20">
            <div className="form-inner">
              <input
                placeholder="Company / Organization *"
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-lg-6 mb-20">
            <div className="form-inner">
              <input
                placeholder="Phone *"
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-lg-6 mb-20">
            <div className="form-inner">
              <input
                type="email"
                placeholder="Company email *"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-lg-12 mb-20">
            <div className="form-inner">
              <input
                type="text"
                placeholder="Your Subject *"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-lg-12 mb-30">
            <div className="form-inner">
              <textarea
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-lg-12 mb-30">
            <div className="flex items-center gap-2 mb-4">
              <input
                style={{ height: "20px" }}
                type="checkbox"
                required
                name="agreement"
              />{" "}
              <label className="text-sm">
                By checking this box, you are agreeing to our{" "}
                <Link target="_blank" href="/terms-conditions">
                  Terms & Conditions
                </Link>{" "}
                and
                <Link target="_blank" href="/privacy-policy">
                  &nbsp;Privacy Policy
                </Link>
                .
              </label>
            </div>
            <ReCAPTCHA
              sitekey="6LcKb_wpAAAAAA4667I6qrWUInknWbCpjqvxHr-B"
              onChange={(val) => setCaptchaValue(val)}
            />
          </div>
          <div className="col-lg-12">
            <div className="form-inner">
              <button
                disabled={isSubmitting || !captchaValue} // Disable button if reCAPTCHA is not checked
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
      {successMessage && <p className="text-success">{successMessage}</p>}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </div>
  );
}

export default ContactForm;
