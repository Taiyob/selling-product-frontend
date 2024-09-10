const Signup = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center items-center mx-40">
                <h1>Register Here</h1>
                <form className="" action="">
                    <label className="block">Name:</label>
                    <input type="text" name='name' className="py-2 px-2 border border-gray-500 rounded-lg" />
                    <label className="block">Email:</label>
                    <input type="email" name='email' className="py-2 px-2 border border-gray-500 rounded-lg" />
                    <label className="block">Phone:</label>
                    <input type="text" name='phone' className="py-2 px-2 border border-gray-500 rounded-lg" />
                    <label className="block">Password:</label>
                    <input type="password" name='password' className="py-2 px-2 border border-gray-500 rounded-lg" />
                </form>
            </div>
        </div>
    );
};

export default Signup;