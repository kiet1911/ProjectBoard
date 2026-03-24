import { useEffect, useRef, useState } from "react";
import LoginForm from "./LoginForm";
import { data } from "react-router-dom";
import { useTypewriter } from "../../utilities/useTypewriter";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const topRef = useRef<HTMLInputElement>(null);
  const dataTopic = [
    "Ready for another round? Log in and dive back in.",
    "Roll the dice again – your board game collection is calling.",
    "Your games are waiting. Let's make some magic happen.",
  ];
  useTypewriter({ test: dataTopic, ref: topRef });

  return (
    <>
      <main className=" h-screen flex flex-row justify-center-safe items-center max-md:flex-col">
        <section className=" flex-1 w-full h-full flex flex-col justify-start items-start px-20 py-10 gap-5 max-md:order-2">
          <div>
            <h1 className="text-xl font-bold text-(--main-color)">
              Welcome back, adventurer! Your next epic game night awaits.
            </h1>
            <input
              ref={topRef}
              className=" text-mist-500 w-full outline-0"
              readOnly
              type="text"
              //   placeholder="Ready for another round? Log in and dive back in."
            />
            {/* <p className=" text-mist-500">
              Ready for another round? Log in and dive back in.
            </p> */}
          </div>
          <LoginForm></LoginForm>
        </section>
        <section className=" flex-1 border w-full h-full max-md:order-1 max-md:h-1/2">
          <img
            className=" w-full h-full object-cover"
            src="./login_template_01.jpg"
            alt="tempalte_01"
          />
        </section>
      </main>
    </>
  );
}
