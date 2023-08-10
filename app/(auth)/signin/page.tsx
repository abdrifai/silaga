"use client";
import Button from "@/app/components/form/Button";
import Textbox from "@/app/components/form/TextBox";
import { signIn } from "next-auth/react";
import { useRef } from "react";
import { logIn, logOut } from "@/redux/actions/auth-slice";
import { AppDispatch, useAppSelector, useAppDispatch } from "@/redux/store";
import Link from "next/link";

const SingInPage = () => {
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  // const dispatch = useDispatch<AppDispatch>();
  const dispatch = useAppDispatch();
  const tes = useAppSelector((state) => state.auth.value.username);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Menghentikan perilaku default form submission

    // const username = "rifai";
    // dispatch(logIn(username || ""));
    // console.log(dispatch(logIn(username || "")));
    // Mengakses nilai input

    const username = usernameInput.current?.value;
    const password = passwordInput.current?.value;

    signIn("credentials", {
      // redirect: false,
      username: username,
      password: password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <section className="h-screen absolute top-0 right-0 overflow-auto bg-gray-800 bg-opacity-30 shadow-md z-10 w-full">
      <div className="flex items-center justify-center h-screen">
        <div className="w-1/3 border p-10 mt-4 border-slate-300 shadow-md bg-white">
          {/* <div className="border-2 rounded-full w-56 py-2 px-3 text-4xl flex items-center leading-relaxed orange_gradient">
            SILaga
          </div> */}
          <h3 className="text-3xl font-bold pb-2">Sign In</h3>
          <h3 className="text-sm font-thin text-slate-400">
            Silahkan Masukan Username dan Password yang telah di daftarkan
          </h3>
          <span className="border-t-2 border-sky-600 block w-full pb-10"></span>
          <form onSubmit={handleSubmit}>
            <Textbox
              label="Username"
              id="username"
              placeholder="Username"
              ref={usernameInput}
            />
            <Textbox
              ref={passwordInput}
              label="Password"
              id="password"
              type="password"
              placeholder="Password"
            />
            <div className="flex items-center justify-between">
              <Button type="submit">Login</Button>
              <Link
                href={"/"}
                className="px-4 py-2 hover:bg-slate-300 hover:rounded-lg"
              >
                Close
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SingInPage;
