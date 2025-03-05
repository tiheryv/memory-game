import { useState } from "react";

interface LandingPageProps {
  onLogin: (name: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (name.trim()) {
      localStorage.setItem("username", name);
      onLogin(name);
    }
  };

  return (
    <div className="login__container font-crt bg-primary flex flex-col items-center justify-center h-screen">
      <div className="login__card border-4 border-neonGreen rounded-md p-6">
        <div className="login__title animate-blink mb-4 text-neonGreen font-pixel font-extrabold py-7 text-[22px] text-center">
          <p>INSERT</p>
          <p>COIN</p>
        </div>

        <div className="login__form flex flex-col">
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="...and your name"
            className="login__input h-8 px-3 bg-gray-500 border-2 border-neonGreen text-black rounded-lg mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Enter your name"
          />
          <button
            className="login__button text-[19px] font-semibold py-2 px-1.5 bg-secondary text-gray-600 tracking-wider rounded-lg hover:border-2 hover:border-neonGreen hover:bg-black hover:text-neonGreen"
            onClick={handleLogin}
            aria-label="Start the game"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
