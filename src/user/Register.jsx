import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FormContext } from "../context/FormData";
import { toast } from "sonner";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import axios from "axios";
import Button from "../components/shared/Button";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { handelRegisterUser, setUser, user } = useContext(FormContext);
  const navigate = useNavigate();

  const handelRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const name = e.target.name.value;
    const photoURl = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // password validation
    if (password.length < 6) {
      setIsLoading(false);
      toast.error("Password should be at least 6 characters long.");
      return;
    }

    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;

    if (!upperCase.test(password)) {
      setIsLoading(false);
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!lowerCase.test(password)) {
      setIsLoading(false);
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }

    handelRegisterUser(email, password)
      .then((res) => {
        setIsLoading(false);
        toast.success("Account Created Successfully!");
        navigate("/");

        const userInfo = {
          email: res.user.email,
          name: name,
          role: "tourist",
          photo: photoURl,
        };
        axios.post(`${import.meta.env.VITE_URL}/user`, userInfo);

        const profile = {
          displayName: name,
          photoURL: photoURl,
        };
        updateProfile(auth.currentUser, profile).then(() => {
          setUser((prev) => {
            return { ...prev, displayName: name, photoURL: photoURl };
          });
        });
        setUser(res.user);
      })
      .catch((error) => {
        setIsLoading(false);
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 animate-fade-in-up">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white dark:bg-slate-800 rounded-3xl shadow-premium overflow-hidden border border-slate-100 dark:border-slate-700/50">
        
        {/* Left Decorative Panel */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 p-12 flex-col justify-center">
          <div className="absolute top-10 left-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <span className="text-xs font-bold tracking-widest text-secondary uppercase bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full">
              Get Started
            </span>
            <h2 className="text-3xl font-extrabold font-display text-white tracking-tight leading-tight">
              Start Your <br />
              <span className="text-secondary">Journey Today</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Create your Treva account to unlock personalized travel packages, become a verified guide, and join a community of passionate explorers.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: "150+", label: "Destinations" },
                { value: "80+", label: "Tour Guides" },
                { value: "4.9★", label: "User Rating" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-xl font-extrabold text-white font-display">{stat.value}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="space-y-1 mb-8">
            <h2 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
              Create Account
            </h2>
            <p className="text-sm text-slate-400">
              Fill in your details to get started.
            </p>
          </div>

          <form onSubmit={handelRegister} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                Full Name
              </label>
              <input
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all"
                placeholder="John Doe"
                name="name"
                type="text"
                required
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                Photo URL
              </label>
              <input
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all"
                placeholder="https://example.com/photo.jpg"
                name="photo"
                type="url"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all"
                placeholder="you@example.com"
                name="email"
                type="email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all pr-12"
                  placeholder="••••••••"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">
                Must contain 6+ characters, uppercase and lowercase.
              </p>
            </div>

            {/* Already have account */}
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Sign In
              </Link>
            </p>

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={isLoading}
              className="w-full font-bold text-base"
            >
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
