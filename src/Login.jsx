import { useState } from 'react';
import './App.css';
import App from './App';
import DownloadFile from './Download-file';

function Login() {
    const [isVerified, setIsVerified] = useState(() => {
        const saved = sessionStorage.getItem("isVerified");
        return saved === "true";
    });
    const [errorMessage, setErrorMessage] = useState(() => {
        const tried = sessionStorage.getItem("hasTried");
        return tried;
    });

    const checkPw = (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Get the current input value
        const password = document.getElementById("password").value;
        const password_lower = password.toLowerCase();

        const success1 = import.meta.env.VITE_PASSWORD_1;
        const success2 = import.meta.env.VITE_PASSWORD_2;

        if (password_lower === success1 || password_lower === success2) {
            sessionStorage.setItem("isVerified", "true");
            setIsVerified(true);
        } else {
            sessionStorage.setItem("hasTried", "⛔ Sorry, that code doesn't seem to be working ⛔");
            setErrorMessage("⛔ Sorry, that code doesn't seem to be working ⛔"); // Set error message for incorrect password
        }
    };

    return (
        <>
            {isVerified ? <App />
                : (
                    <>
                        <div className="flex flex-col h-screen items-center justify-center">
                            {/* <div className='flex text-2xl font-bold bg-green-800 text-white p-4 rounded-lg m-4'>⚠️ This website isn't going properly live 'til the 24th, hold your horses ⚠️<br />You can download the puzzles ahead of time below though</div> */}
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
                                        autoCorrect="off"
                                        spellCheck="false"
                                        className="mb-4 w-full p-3 rounded-lg border-2 text-gray-800 text-2xl border-white focus:outline-none focus:ring-2 focus:ring-white"
                                    />
                                    <button
                                        type="submit" // Explicitly set the button to submit the form
                                        className="bg-green-500 text-white text-2xl font-bold py-2 px-4 rounded-full hover:bg-green-600 transform hover:scale-105 transition duration-200"
                                    >
                                        🎄 Save Christmas 🎅
                                    </button>
                                </form>
                            </div>
                            <div className="flex mt-4" style={{ minHeight: "4rem" }}>
                                <p className={errorMessage ? "mb-4 w-full p-3 rounded-lg bg-green-700" : ""}>
                                    {errorMessage}
                                </p>
                            </div>
                            <DownloadFile fileName="puzzle_crackers_digital.pdf" buttonText="🧩 Click here to download a digital copy of the puzzle 🧩" />
                            <DownloadFile fileName="puzzle_crackers_solutions.pdf" buttonText="🆘 Need help? Click here to download solutions 🆘" />
                        </div>
                    </>
                )
            }
        </>
    );
}

export default Login;
