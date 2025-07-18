import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();

    // ✅ Check login status on form submit
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      toast.error("Please login to send your message.");
      navigate("/login"); // Redirect to login page
      return;
    }

    emailjs
      .sendForm(
        "service_s6xsdvb",     // your EmailJS service ID
        "template_jnva8vv",    // your EmailJS template ID
        form.current,
        "Afksm-GS687Pt_v1k"    // your EmailJS public key
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          setStatus("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="color-change-2x w-full py-16 px-6 max-w-full mx-auto xl:h-screen xl:flex-col">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-900">
        Contact Us
      </h1>

      <p className="text-gray-100 text-center mb-10 text-md">
        Have questions or feedback? Fill out the form below and we'll get back to you soon.
      </p>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      {status && (
        <p className="text-center text-green-600 mt-4">{status}</p>
      )}

      <div className="mt-12 text-center text-gray-300 text-sm">
        You can also reach us at:{" "}
        <a href="mailto:pallaviphotos3@gmail.com" className="text-blue-100 underline underline-offset-2">
          pallaviphotos3@gmail.com
        </a>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Contact;
