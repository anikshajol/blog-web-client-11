/* eslint-disable no-unused-vars */
import Lottie from "react-lottie";
import animationData from "../../../../public/Animation - 1699298932014.json";
import toast from "react-hot-toast";
import { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  const handleSubscribe = () => {
    toast.success("Email added Successfully");
    setEmail("");
  };

  return (
    <div className="hero max-h-screen bg-base-200 ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center w-1/2 lg:text-left">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
        <div className="card w-1/2 p-4">
          <h1 className="text-5xl font-bold mb-4">
            Subscribe To Our Newsletter
          </h1>

          <div className="">
            <div className="input-group">
              <input
                type="email"
                placeholder="xxx@xxx.com"
                className="input input-bordered"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                onClick={handleSubscribe}
                className="btn w-1/4 btn-primary btn-square"
                type="btn"
                value={"Subscribe"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
