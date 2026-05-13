import React from "react";

export default function Contact() {
  return (
    <div className="bg-slate-50 text-slate-900 font-sans">
      <section className="bg-slate-900 text-white py-24 text-center">
        <h1 className="text-5xl font-black mb-4">
          Visit Our <span className="text-[#db3332]">Game Hub</span>
        </h1>
        <p className="text-slate-300">
          Questions, bookings, or just want to roll some dice? We're always
          ready.
        </p>
      </section>

      <section className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-black mb-6">Our Location</h2>

          <p className="text-slate-600 mb-4">
            Project K Boardgame Cafe
            <br />
            123 Strategy Street,
            <br />
            Ho Chi Minh City, Vietnam
          </p>

          <a
            href="https://maps.google.com"
            target="_blank"
            className="inline-block bg-[#db3332] text-white px-6 py-3 rounded-full font-semibold"
          >
            Open in Google Maps
          </a>
        </div>

        <iframe
          className="w-full h-[350px] rounded-3xl shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.593303407839!2d106.69568799999999!3d10.765794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f158460132f%3A0x97d6f3e888fff9c0!2sBoard%20Game%20Station!5e0!3m2!1svi!2s!4v1778615844757!5m2!1svi!2s" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-black mb-10">Opening Hours</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <p className="font-bold">Mon - Fri</p>
              <p className="text-slate-500">10:00 - 22:00</p>
            </div>
            <div>
              <p className="font-bold">Saturday</p>
              <p className="text-slate-500">09:00 - 23:00</p>
            </div>
            <div>
              <p className="font-bold">Sunday</p>
              <p className="text-slate-500">09:00 - 21:00</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white p-8 rounded-3xl shadow">
          <h3 className="font-bold mb-2">Phone</h3>
          <p className="text-slate-600">+84 123 456 789</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow">
          <h3 className="font-bold mb-2">Email</h3>
          <p className="text-slate-600">hello@projectk.vn</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow">
          <h3 className="font-bold mb-2">Facebook</h3>
          <p className="text-slate-600">facebook.com/projectk</p>
        </div>
      </section>

      <section className="bg-slate-100 py-20">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center mb-10">
            Send Us a Message
          </h2>

          <form className="space-y-4">
            <input
              placeholder="Your Name"
              className="w-full p-4 rounded-xl border"
            />

            <input
              placeholder="Email"
              className="w-full p-4 rounded-xl border"
            />

            <textarea
              placeholder="Your Message..."
              rows={5}
              className="w-full p-4 rounded-xl border"
            />

            <button
              type="submit"
              className="w-full bg-[#db3332] text-white py-4 rounded-xl font-bold"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
