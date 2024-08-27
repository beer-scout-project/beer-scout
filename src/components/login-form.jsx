import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <div className="flex w-full max-w-[325px] flex-col gap-6">
      <form>
        <label htmlFor="email" className="block">
          <span className="block">Email</span>
          <input
            type="email"
            name="email"
            className="placeholder-slate-400focus:outline-none w-full rounded p-1 text-black shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
          ></input>
        </label>
        <label htmlFor="password" className="block">
          <span className="block">Password</span>
          <input
            type="password"
            name="password"
            className="w-full rounded p-1 text-black"
          ></input>
        </label>
      </form>
      <button className="btn btn-primary block">Login</button>
      <div className="link block cursor-default no-underline">
        <Link onClick={() => console.log("forgot password")} className="text">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}
