import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthProvider";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    // console.log({ name, photoURL, email, password });

    setPasswordError("");

    if (password.length < 6) {
      return setPasswordError("Password must be at least 6 characters long");
    }

    if (!/[A-Z]/.test(password)) {
      return setPasswordError(
        "Password must contain at least one uppercase letter",
      );
    }
    if (!/[a-z]/.test(password)) {
      return setPasswordError(
        "Password must contain at least one lowercase letter",
      );
    }
    if (!/[!@#$&*]/.test(password)) {
      return setPasswordError(
        "Password must contain at least one special character",
      );
    }

    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
        console.error("Registration error:", error.code, error.message);
      });
  };

  const handleGoogleRegister = () => {
    // Google registration logic will go here
    signInWithGoogle()
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error("Login error:", error.code, error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 dark:bg-gray-800">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Create an Account
        </h2>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              required
              placeholder="Profile photo URL"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Create a password"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {passwordError && (
              <p className="text-red-600 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="grow h-px bg-gray-300"></div>
        </div>

        {/* Google Register */}
        <button
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium">Sign up with Google</span>
        </button>

        {/* Login Link */}
        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
