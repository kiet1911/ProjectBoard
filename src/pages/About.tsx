import React from "react";

export default function About() {
  return (
    <div className="bg-slate-50 text-slate-900 font-sans">

      <section className="bg-slate-900 text-white py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              A PLACE TO <span className="text-[#db3332]">PLAY</span>,
              <br />
              NOT JUST BUY.
            </h1>

            <p className="text-slate-300 text-lg mb-8">
              Project K is a boardgame store and community space where
              friends gather, strategies unfold, and memories are made
              around real tables.
            </p>

            <div className="flex gap-4">
              <button className="bg-[#db3332] px-6 py-3 rounded-full font-bold">
                Browse Games
              </button>
              <button className="border border-white px-6 py-3 rounded-full">
                Book a Table
              </button>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1000"
            className="rounded-3xl shadow-2xl"
            alt="Boardgame cafe"
          />
        </div>
      </section>

      <section className="py-20 container mx-auto px-6">
        <h2 className="text-4xl font-black text-center mb-16">
          More Than a Store
        </h2>

        <div className="grid md:grid-cols-3 gap-8 *:transition-all *:duration-500 *:hover:shadow-2xl *:hover:-translate-y-2 ">

          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-xl font-bold mb-4">🎲 Play at Our Space</h3>
            <p className="text-slate-600">
              Reserve tables, explore hundreds of games, and enjoy a
              welcoming play environment.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-xl font-bold mb-4">🛒 Buy Boardgames</h3>
            <p className="text-slate-600">
              Carefully curated titles from party games to heavy strategy
              classics.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-xl font-bold mb-4">👥 Community Events</h3>
            <p className="text-slate-600">
              Weekly meetups, tournaments, and beginner sessions.
            </p>
          </div>

        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8 text-center">

            {[
              "Choose a Game",
              "Book a Table",
              "Come & Play",
              "Make Friends"
            ].map((step, i) => (
              <div key={i}>
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#db3332] text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <p className="font-semibold">{step}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-6 grid md:grid-cols-3 text-center gap-10">

          {[
            { val: "500+", label: "Games Library" },
            { val: "10K+", label: "Players Joined" },
            { val: "100+", label: "Events Hosted" }
          ].map((s, i) => (
            <div key={i}>
              <div className="text-5xl font-black text-[#db3332]">
                {s.val}
              </div>
              <p className="text-slate-500 mt-2">{s.label}</p>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-slate-900 text-white">
        <h2 className="text-4xl font-black mb-8">
          Ready to Join the Table?
        </h2>

        <button className="bg-[#db3332] px-10 py-4 rounded-full font-bold">
          Book Your First Game Night
        </button>
      </section>

    </div>
  );
}