import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FormContext } from "./../context/FormData";
import axios from "axios";
import Button from "../components/shared/Button";

const Login = () => {
  const { googleLogin, loginUser, user, setUser } = useContext(FormContext);
  const [password, setPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const signInUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then((res) => {
        setIsLoading(false);
        navigate(location?.state ? location.state : "/");
      })
      .catch((er) => {
        setIsLoading(false);
        toast.error(er.message);
      });
  };

  const googleSignInUser = () => {
    googleLogin()
      .then((res) => {
        toast.success("Successfully logged in!");
        navigate(location?.state ? location.state : "/");
        const userInfo = {
          email: res.user.email,
          name: res.user.displayName,
          role: "tourist",
          photo: res.user.photoURL,
        };
        axios.post(`${import.meta.env.VITE_URL}/user`, userInfo);
      })
      .catch((er) => {
        toast.error(er.message);
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 animate-fade-in-up">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white dark:bg-slate-800 rounded-3xl shadow-premium overflow-hidden border border-slate-100 dark:border-slate-700/50">
        
        {/* Left Decorative Panel */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 p-12 flex-col justify-center">
          {/* Decorative Blobs */}
          <div className="absolute top-10 right-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
              Welcome Back
            </span>
            <h2 className="text-3xl font-extrabold font-display text-white tracking-tight leading-tight">
              Continue Your <br />
              <span className="text-primary">Adventure</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Sign in to manage your bookings, share travel stories, and explore handpicked tour packages from local experts.
            </p>
            <div className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-2">
                {["https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=60",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=60",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=60"
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" />
                ))}
              </div>
              <p className="text-xs text-slate-400">
                <span className="text-white font-bold">2,400+</span> travelers trust Treva
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="space-y-1 mb-8">
            <h2 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
              Sign In
            </h2>
            <p className="text-sm text-slate-400">
              Enter your credentials to access your account.
            </p>
          </div>

          <form className="space-y-5" onSubmit={signInUser}>
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all"
                type="email"
                placeholder="you@example.com"
                name="email"
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
                  type={password ? "text" : "password"}
                  required
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setPassword(!password)}
                >
                  {password ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
                </button>
              </div>
            </div>

            {/* Account Link */}
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Create one
              </Link>
            </p>

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={isLoading}
              className="w-full font-bold text-base"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8 flex items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700" />
            <span className="flex-shrink-0 mx-4 text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Or continue with
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700" />
          </div>

          {/* Google Button */}
          <button
            onClick={googleSignInUser}
            className="w-full flex items-center justify-center gap-3 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 active:scale-[0.98]"
          >
            <FcGoogle className="h-5 w-5" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
