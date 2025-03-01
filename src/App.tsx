// import "./App.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Login attempt with:", { email, password });
      setIsLoading(false);
      // In a real app, you would handle authentication here
    }, 1500);
  };

  return (
    <div className="min-h-screen w-[100vw] bg-black flex items-center justify-center p-4 bg-gradient-to-b from-black to-gray-900">
      <Card className="w-full max-w-md border-gold-900/30 shadow-lg shadow-gold/20">
        <CardHeader className="text-center border-b border-gold-900/20 pb-6">
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gold flex items-center justify-center shadow-md shadow-gold/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12 text-white"
            >
              <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
              <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
            </svg>
          </div>
          <CardTitle className="text-xl text-gold-900 font-Montserrat">
            Gospofy Admin
          </CardTitle>
          <p className="text-gray-400 mt-2 font-DM-Sans">
            Enter your credentials to access the dashboard
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gold">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gold/70">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 pl-10 rounded-md border border-gray-700 bg-gray-800 text-white focus:border-gold focus:ring-1 focus:ring-gold/50 focus:outline-none transition-colors"
                  placeholder="admin@gospofy.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gold"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gold/70">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 pl-10 rounded-md border border-gray-700 bg-gray-800 text-white focus:border-gold focus:ring-1 focus:ring-gold/50 focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-gold hover:bg-lighterGold text-white font-bold py-3 transition-all duration-300 shadow-md hover:shadow-gold/30"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
            <div className="text-center text-sm text-gray-500 border-t border-gray-800 pt-4 mt-4">
              <p>Admin access only. Unauthorized access is prohibited.</p>
              <p className="mt-2 text-gold/70 hover:text-gold cursor-pointer transition-colors">
                Forgot password?
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
