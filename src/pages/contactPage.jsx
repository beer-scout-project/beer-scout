import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("sending");

    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        e.target,
      );

      if (result.status === 200) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error sending email:", error);
    }
  };

  return (
    <div
      className="hero min-h-full"
      style={{
        backgroundImage: "url(/beerBackground.png)",
      }}
    >
      <div className="hero-overlay flex items-start justify-center bg-black bg-opacity-60 p-4 md:p-16">
        <div className="max-w-3xl flex-col gap-12 rounded-lg bg-[#FDEBD0] bg-opacity-85 p-4 text-[#2f2f2f] md:p-8">
          <div className="flex flex-col gap-4">
            <h4>Contact the Beer Scout Team</h4>
            <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#2f2f2f]">Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="input input-bordered bg-white"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#2f2f2f]">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Your email"
                  className="input input-bordered bg-white"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#2f2f2f]">Message</span>
                </label>
                <textarea
                  name="message"
                  className="textarea textarea-bordered h-24 bg-white"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>

              <button
                className="btn btn-warning mt-2 w-full"
                disabled={submitStatus === "sending"}
              >
                {submitStatus === "sending" ? "Sending..." : "Send Message"}
              </button>

              {submitStatus === "success" && (
                <p className="text-center text-green-600">
                  Message sent successfully!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-center text-red-600">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
            <p className="mb-4">
              You can also reach us by email at
              <a href="mailto:beerscoutca@gmail.com" className="text-[#D2691E]">
                {" "}
                beerscoutca@gmail.com
              </a>
              , or find us on LinkedIn and GitHub with the links below.
            </p>
            <div className="flex flex-row justify-center gap-4 md:gap-16">
              <div className="flex flex-col items-center gap-2">
                <h6>Alex</h6>
                <div className="flex gap-2">
                  <a
                    href="https://www.linkedin.com/in/alex-whalen-0496b227b/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="https://github.com/Awhalen1999"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="h-6 w-6" />
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <h6>Cassandra</h6>
                <div className="flex gap-2">
                  <a
                    href="https://www.linkedin.com/in/cassandra-lee-3247b52a2/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="https://github.com/casslee1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="h-6 w-6" />
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <h6>Danny</h6>
                <div className="flex gap-2">
                  <a
                    href="https://www.linkedin.com/in/danny-simms-2a14631a4/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="https://github.com/GreyNewfie"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
