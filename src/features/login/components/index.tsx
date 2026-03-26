import { useRef, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useTypewriter } from "../../../hook/useTypewriter";
import { ArrowLeftCircleIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  let navigator = useNavigate();
  const typeWriter = useRef<HTMLInputElement>(null);
  const handleToggleForm = () => {
    setIsRegister(!isRegister);
  };
  const goBack = () => {
    navigator(-1);
  };
  const dataTopic = [
    "Ready for another round? Log in and dive back in.",
    "Roll the dice again – your board game collection is calling.",
    "Your games are waiting. Let's make some magic happen.",
  ];
  useTypewriter({ test: dataTopic, ref: typeWriter });

  return (
    <>
      <main className=" h-screen flex flex-row justify-center-safe items-center max-md:flex-col">
        <ArrowLeftCircleIcon
          onClick={goBack}
          size={25}
          className="absolute top-5 left-5 cursor-pointer max-md:hidden"
        ></ArrowLeftCircleIcon>
        <section className=" flex-1 w-full h-full flex flex-col justify-start items-start px-20 pt-5 gap-5 max-md:order-2  box-border overflow-y-auto">
          <div>
            <h1 className="text-xl font-bold text-(--main-color)">
              Welcome back, adventurer! Your next epic game night awaits.
            </h1>
            <input
              ref={typeWriter}
              className=" text-mist-500 w-full outline-0"
              readOnly
              type="text"
              //   placeholder="Ready for another round? Log in and dive back in."
            />
            {/* <p className=" text-mist-500">
              Ready for another round? Log in and dive back in.
            </p> */}
          </div>
          {isRegister ? (
            <RegisterForm toggleForm={handleToggleForm}></RegisterForm>
          ) : (
            <LoginForm toggleForm={handleToggleForm}></LoginForm>
          )}
        </section>
        <section className=" flex-1 border w-full h-full max-md:order-1 max-md:h-1/3 max-md:flex-0">
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
