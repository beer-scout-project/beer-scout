export default function CreateAccountForm() {
  return (
    <div className="flex w-full max-w-[325px] flex-col gap-6">
      <h2>Create your account</h2>
      <form className="flex flex-col gap-4">
        <div>
          <label htmlFor="first-name" className="block">
            First Name
          </label>
          <input
            type="text"
            name="first-name"
            className="w-full rounded p-1 text-black"
          ></input>
        </div>
        <div>
          <label htmlFor="last-name" className="block">
            Last Name
          </label>
          <input
            type="text"
            name="last-name"
            className="w-full rounded p-1 text-black"
          ></input>
        </div>
        <div>
          <label htmlFor="display-name" className="block">
            Display Name*
          </label>
          <input
            type="text"
            name="display-name"
            className="w-full rounded p-1 text-black"
          ></input>
        </div>
        <div>
          <label htmlFor="email" className="block">
            Email*
          </label>
          <input
            type="email"
            name="email"
            className="laceholder-slate-400focus:outline-none w-full rounded p-1 text-black shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
          ></input>
        </div>
        <div>
          <label htmlFor="password" className="block">
            Password*
          </label>
          <input
            type="password"
            name="password"
            className="w-full rounded p-1 text-black"
          ></input>
        </div>
        <div>
          <label htmlFor="confirm-password" className="block">
            Confirm Password*
          </label>
          <input
            type="password"
            name="confirm-password"
            className="w-full rounded p-1 text-black"
          ></input>
        </div>
        <button
          type="submit"
          onClick={() => console.log("register")}
          className="btn btn-primary mt-4 block"
        >
          Register
        </button>
      </form>
    </div>
  );
}
