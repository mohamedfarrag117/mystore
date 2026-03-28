import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { login } from "../redux/authSlice";
import { loadUserCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const loginSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = (data: LoginFormData): void => {
    dispatch(
      login({
        email: data.email,
        name: data.name,
      }),
    );

    dispatch(loadUserCart());

    toast.success(`Welcome, ${data.name}!`);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#222] p-4">
      <div className="bg-[#2b2b2b] p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <i className="fa-brands fa-shopify text-5xl text-[#F83539] mb-4"></i>
          <h1 className="text-3xl font-bold text-white mt-2">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in to access your cart</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* =========================NAME====================== */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              <i className="fa-solid fa-user mr-2"></i>
              Full Name
            </label>
            <input
              type="text"
              {...register("name")}
              className={`w-full px-4 py-3 rounded-lg bg-[#383838] text-white border focus:outline-none focus:ring-2 transition ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-600 focus:ring-[#F83539]"
              }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">
                <i className="fa-solid fa-circle-exclamation mr-1"></i>
                {errors.name.message}
              </p>
            )}
          </div>

          {/* ========================EMAIL============================= */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              <i className="fa-solid fa-envelope mr-2"></i>
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              className={`w-full px-4 py-3 rounded-lg bg-[#383838] text-white border focus:outline-none focus:ring-2 transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-600 focus:ring-[#F83539]"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                <i className="fa-solid fa-circle-exclamation mr-1"></i>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* ===================PASSWORD================ */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              <i className="fa-solid fa-lock mr-2"></i>
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className={`w-full px-4 py-3 rounded-lg bg-[#383838] text-white border focus:outline-none focus:ring-2 transition ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-600 focus:ring-[#F83539]"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                <i className="fa-solid fa-circle-exclamation mr-1"></i>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* =====================SUBMIT BTN=============== */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#F83539] text-white py-3 rounded-lg font-semibold text-lg transition duration-300 hover:bg-[#d92c2f] hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Signing in...
              </span>
            ) : (
              <span>
                <i className="fa-solid fa-right-to-bracket mr-2"></i>
                Sign In
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
