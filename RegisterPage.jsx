import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schema/authSchema";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/authAction";
import instance from "../services/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const handleSubmitForm = async (data) => {
    try {
      await instance.post("/register", data);

      const confirmRegister = confirm(
        "Đăng ký thành công. Chuyển đến trang đăng nhập?"
      );

      dispatch(registerUser(data));

      if (confirmRegister) {
        nav("/login");
      } else {
        reset();
      }
    } catch (error) {
      toast.error("email đã tồn tại!", error);
    }
  };

  return (
    <div className="w-full pd container mx-auto bg-white rounded-lg shadow dark:border mt-32 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Đăng Nhập Tài Khoản
        </h1>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mật Khẩu
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirm"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mật Khẩu
            </label>
            <input
              type="password"
              name="confirm"
              id="confirm"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("confirm", { required: true })}
            />
            {errors.confirm && (
              <p className="text-red-600">{errors.confirm.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Đăng Ký
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Bạn Đã Có Tài Khoản?
            <Link
              to="/login"
              href="#"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-2"
            >
              Đăng Nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
