import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const Signin = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        const { email, password } = data;

        try {
            await login(email, password);

            reset();
            navigate(from, { replace: true });
            toast.success("Logged in successful!");
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/user-not-found') {
                toast.error("User not found. Please register first.");
            } else if (error.code === 'auth/wrong-password') {
                toast.error("Incorrect password. Please try again.");
            } else if (error.code === 'auth/invalid-email') {
                toast.error("Invalid email format. Please enter a valid email.");
            } else {
                toast.error("Login failed. Please try again.");
            }
        }
    }
    return (
        <>
            <Helmet>
                <title>Selling Side || Login</title>
            </Helmet>

            <div className="flex justify-center items-center h-screen">
                <div className="flex justify-center items-center mx-5 sm:mx-20 lg:mx-40 w-full">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
                        <h1 className="my-5 text-3xl text-center">Login Here</h1>

                        <label className="block mt-3">Email:</label>
                        <input
                            type="email"
                            name="email"
                            {...register("email", { required: true })}
                            className="py-2 px-2 border border-gray-500 rounded-lg w-full"
                        />
                        {errors.email && <p className="text-red-500">Email is required</p>}

                        <label className="block mt-3">Password:</label>
                        <input
                            type="password"
                            name="password"
                            {...register("password", { required: true })}
                            className="py-2 px-2 border border-gray-500 rounded-lg w-full"
                        />
                        {errors.password?.type === "required" && (
                            <span role="alert">This field is required</span>
                        )}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">
                                Forgot password?
                            </a>
                        </label>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>

                        <p className="">
                            <small>
                                Are you new here?{" "}
                                <Link to="/sign-up" className="text-blue text-xl">
                                    Please register
                                </Link>
                            </small>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signin;




/*

VITE_apiKey=AIzaSyCjFrcHh-g4qlXlHRYP7zFHBKaYgv4V-rA
VITE_authDomain=selling-product-ce577.firebaseapp.com
VITE_projectId=selling-product-ce577
VITE_storageBucket=selling-product-ce577.appspot.com
VITE_messagingSenderId=227426486005
VITE_appId=1:227426486005:web:cf912666053423e73227bc


*/