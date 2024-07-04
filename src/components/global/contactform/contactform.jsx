"use client";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast, ToastContainer } from "react-toastify";
function ContactForm() {
  const [result, setResult] = useState("");
  const [capVal, setcapVal] = useState(null);
  const [checked, setChecked] = React.useState(false);
  const [field, setField] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("submited");
    toast.success(
      "Thank you for showing your interest in the services offered by us. One of our team members will attend to you shortly.",
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
      }
    );
    // // setResult("Sending....");
    // const formData = new FormData(event.target);
    // console.log(formData);

    // formData.append("access_key", "324b2d24-b3f4-48e9-af01-0ba65fa02b2c");

    // const response = await fetch("https://api.web3forms.com/submit", {
    //   method: "POST",
    //   body: formData,
    // });

    // const data = await response.json();

    // if (data.success) {
    //   event.target.reset();
    //   // Show success toast notification
    //   toast.success(
    //     "Thank you for showing your interest in the services offered by us. One of our team members will attend to you shortly.",
    //     {
    //       position: "bottom-right",
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "dark",
    //       transition: "Bounce",
    //     }
    //   );
    // } else {
    //   console.log("Error", data);
    //   toast.error(data.message, {
    //     position: "bottom-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //     transition: "Bounce",
    //   });
    // }
  };
  return (
    <div className="contact-form-area">
      <ToastContainer />
      <h3>Your Success Starts Here!</h3>
      <form onSubmit={onSubmit}>
        <input
          type="hidden"
          name="access_key"
          value="324b2d24-b3f4-48e9-af01-0ba65fa02b2c"
        />

        <div className="row">
          <div className="col-lg-6 mb-20">
            <div className="form-inner">
              {/* <label>Full Name</label> */}
              <input
              placeholder="Full Name"
                type="text"
                name="fullname"
                required
                // onChange={(e) => setField({ ...field, name: e.target.value })}
              />
            </div>
          </div>
          <div className="col-lg-6 mb-20">
            <div className="form-inner">
              {/* <label>Company / Organization *</label> */}
              <input
              placeholder="Company / Organization *"
                type="text"
                name="organisation"
                onChange={(e) =>
                  setField({ ...field, company: e.target.value })
                }
              />
            </div>
          </div>
          <div className="col-lg-6 mb-20">
            <div className="form-inner">
              {/* <label>Phone *</label> */}
              <input
              placeholder="Phone"
                type="text"
                name="phone"
                onChange={(e) => setField({ ...field, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="col-lg-6 mb-20">
            <div className="form-inner">
              {/* <label>Company email *</label> */}
              <input
                type="email"
                placeholder="Company email *"
                name="email"
                onChange={(e) => setField({ ...field, email: e.target.value })}
              />
            </div>
          </div>
          <div className="col-lg-12 mb-20">
            <div className="form-inner">
              {/* <label>Your Subject *</label> */}
              <input
                type="text"
                placeholder="Your Subject *"
                name="subject"
                onChange={(e) =>
                  setField({ ...field, subject: e.target.value })
                }
              />
            </div>
          </div>
          <div className="col-lg-12 mb-30">
            <div className="form-inner">
              {/* <label>Message *</label> */}
              <textarea
              placeholder="Message *"
                defaultValue={""}
                name="message"
                onChange={(e) =>
                  setField({ ...field, message: e.target.value })
                }
              />
            </div>
          </div>
          <div className="col-lg-12 mb-30">
            <div className="flex items-center gap-2 mb-4">
              <input
                style={{ height: "20px" }}
                type="checkbox"
                defaultChecked={checked}
                name="message"
                // onChange={(e) =>
                //   setField({ ...field, message: e.target.value })
                // }
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
              sitekey="6LeMX9IpAAAAAMPWQvm3SYQ98X13vK2MI6CdQoiS"
              onChange={(val) => setcapVal(val)}
            />
          </div>
          <div className="col-lg-12">
            <div className="form-inner">
              <button
                // disabled={!capVal}
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
      <span>{result}</span>
    </div>
  );
}

export default ContactForm;
