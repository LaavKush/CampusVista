import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="bg-[#0F172A] py-16 px-6 sm:px-10 md:px-20 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-wide text-teal-400">
          Get in Touch
        </h2>
        <p className="text-lg text-[#cbd5e1] mb-10">
          Have questions or want to collaborate? We'd love to hear from you!
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Message Sent!');
          }}
          className="space-y-6 text-left"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="bg-[#1e293b] text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="bg-[#1e293b] text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full bg-[#1e293b] text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-400"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-black font-semibold px-6 py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
