import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);

    const onSubmit = async (data) => {
        const { name, email, password, confirmPassword, phone, address } = data;
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await createUser(email, password);

            await updateUserProfile(name, phone);

            const user = { name, email, phone, address, password, user: 'user' };
            await axios.post('http://localhost:5000/users', user);

            reset();
            toast.success("Registration successful!");
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error("Email already in use. Please try another one.");
            } else if (error.code === 'auth/invalid-email') {
                toast.error("Invalid email format. Please enter a valid email.");
            } else if (error.code === 'auth/weak-password') {
                toast.error("Password is too weak. Use at least 6 characters.");
            } else {
                toast.error("Registration failed. Please try again.");
            }
        }
    }
    return (
        <>
            <Helmet>
                <title>Selling Side || Register</title>
            </Helmet>

            <div className="flex justify-center items-center h-screen">
                <div className="flex justify-center items-center mx-5 sm:mx-20 lg:mx-40 w-full">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
                        <h1 className="my-5 text-3xl text-center">Register Here</h1>

                        <label className="block">Name:</label>
                        <input
                            type="text"
                            name="name"
                            {...register("name", { required: true })}
                            className="py-2 px-2 border border-gray-500 rounded-lg w-full"
                        />
                        {errors.name && <p className="text-red-500">Name is required</p>}

                        <label className="block mt-3">Email:</label>
                        <input
                            type="email"
                            name="email"
                            {...register("email", { required: true })}
                            className="py-2 px-2 border border-gray-500 rounded-lg w-full"
                        />
                        {errors.email && <p className="text-red-500">Email is required</p>}

                        <label className="block mt-3">Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            {...register("phone", { required: true })}
                            className="py-2 px-2 border border-gray-500 rounded-lg w-full"
                        />
                        {errors.phone && <p className="text-red-500">Phone is required</p>}

                        <label className="block mt-3">Address:</label>
                        <textarea
                            type="text"
                            name="address"
                            {...register("address", { required: true })}
                            className="py-2 px-2 border border-gray-500 rounded-lg w-full"
                        />
                        {errors.address && <p className="text-red-500">Address is required</p>}

                        <label className="block mt-3">Password:</label>
                        <input
                            type="password"
                            name="password"
                            {...register("password", {
                                required: true, minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                            })}
                            className="py-2 px-2 border border-gray-500 rounded-lg w-full"
                        />
                        {errors.password?.type === "required" && (
                            <span role="alert">This field is required</span>
                        )}
                        {errors.password?.type === "minLength" && (
                            <span role="alert">This field length is 6</span>
                        )}
                        {errors.password?.type === "pattern" && (
                            <span role="alert">Follow the pattern</span>
                        )}

                        <label className="block mt-3">Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            {...register("confirmPassword", { required: true })}
                            className="py-2 px-2 border border-gray-500 rounded-lg w-full"
                        />
                        {errors.confirmPassword && <p className="text-red-500">Confirm Password is required</p>}

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>

                        <p className="">
                            <small>
                                Already have account?{" "}
                                <Link to="/sign-in" className="text-blue text-xl">
                                    Please login
                                </Link>
                            </small>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
