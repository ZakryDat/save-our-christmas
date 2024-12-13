import { useState } from 'react'
import './App.css'
import App from './App';

function Login() {
    const [isVerified, setIsVerified] = useState(() => {
        const saved = sessionStorage.getItem("isVerified");
        return saved === "true";
    });
    const [errorMessage, setErrorMessage] = useState(() => {
        const tried = sessionStorage.getItem("hasTried");
        return tried
    });

    const checkPw = () => {
        // gets the current input value
        const password = document.getElementById("password").value;


        if (password === "password") {
            sessionStorage.setItem("isVerified", "true")
            setIsVerified(true);
        } else {
            sessionStorage.setItem("hasTried", "⛔ Sorry, that code doesn't seem to be working ⛔");
        }
    };

    return (
        <>
            {isVerified ? <App />
                :
                (
                    <>
                        <div className="flex-col">
                            <div className="flex">
                                <form
                                    onSubmit={checkPw}
                                    className="flex flex-col items-center bg-green-700 p-6 px-8 rounded-lg shadow-lg max-w-sm mx-auto"
                                >
                                    <input
                                        id="password"
                                        name="password"
                                        placeholder="Enter password"
                                        autoComplete="off"
                                        className="mb-4 w-full p-3 rounded-lg border-2 border-white focus:outline-none focus:ring-2 focus:ring-white"
                                    />
                                    <button
                                        className="bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transform hover:scale-105 transition duration-200"
                                    >
                                        🎄 Save Christmas 🎅
                                    </button>
                                </form>
                            </div>
                            <div className="flex mt-4" style={{ minHeight: "4rem" }}>
                                <p className={errorMessage ? "mb-4 w-full p-3 rounded-lg bg-green-700" : ""}>{errorMessage}</p>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Login
