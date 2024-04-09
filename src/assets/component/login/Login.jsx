import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CreatAuth } from "../firebase/Authproviders";

const Login = () => {
    const [success, setSuccess] = useState('');
    const [signupError, setsignupError] = useState('');
    const { loginInUser, signInGoogle,signIngithub } = useContext(CreatAuth)
    const [shoandHideIcone, setShoandHideIcone] = useState(false);


    const handelSubmitLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        setsignupError('')
        loginInUser(email, password)
            .then(result => {
                console.log(result);
                setSuccess('Success! You are logged in.');
            })
            .catch(error => {
                console.error(error);
                setsignupError('invalid password Plese Forget password')

            });
    };


    return (
        <div className="py-10 mx-auto max-w-[90%]">
            <div>
                <div className="card shadow shrink-0 w-full md:w-[50%] lg:w-[40%]  bg-base-100 mx-auto my-10">
                    <h1 className="text-[35px] font-bold text-center pt-10">Login your account</h1>
                    <form className="card-body" onSubmit={handelSubmitLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Email address</span>
                            </label>
                            <input type="email" placeholder="Enter your email address" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text text-xl font-semibold">Password</span>
                            </label>
                            <input type={shoandHideIcone ? 'text' : 'password'} name="password" placeholder="Enter your password" className="input input-bordered" required />
                            <div className="absolute right-5 bottom-4" onClick={() => setShoandHideIcone(!shoandHideIcone)}>
                                {
                                    shoandHideIcone ? <FaEyeSlash className="text-xl"></FaEyeSlash> : <FaEye className="text-xl"></FaEye>
                                }
                            </div>
                        </div>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>

                        {<p className="text-xl font-medium text-green-500 text-center ">{success}</p>}
                        <div className="form-control">
                            <button className="btn bg-[#403F3F] text-white">Login</button>
                        </div>
                    </form>
                    <div className="mx-auto mb-10">
                        <button onClick={()=>signInGoogle()} className="btn btn-outline  text-sm mr-3 ">
                            <FaGoogle className="text-green-500 text-xl font-bold"></FaGoogle>
                            Log with Google
                        </button>
                        <button onClick={()=>signIngithub()} className="btn btn-outline  mt-2">
                            <FaGithub className="text-xl font-bold"></FaGithub>
                            Log with Gothub
                        </button>
                    </div>
                    {signupError && <p className="font-semibold px-5 text-center mb-5 text-red-600">{signupError}</p>}
                    <p className="font-semibold text-[16px] pb-10 text-center">Dont’t Have An Account ? <Link to={'/signup'} className="text-[#F75B5F]">Register</Link></p>
                </div>
            </div>
        </div>

    )
};
export default Login;