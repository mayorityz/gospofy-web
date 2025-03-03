// import "./App.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { FormInput } from "@/components/form/FormInput";
import { FormButton } from "@/components/form/FormButton";
import { Mail, Lock, Link } from "lucide-react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    // setTimeout(() => {
    //   console.log("Login attempt with:", { email, password });
    //   setIsLoading(false);
    //   // In a real app, you would handle authentication here
    // }, 1500);

    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen w-[100vw] bg-black flex items-center justify-center p-4 bg-gradient-to-b from-black to-gray-900">
      <Card className="w-full max-w-md border-gold-900 shadow-lg shadow-gold/20 bg-black/50">
        <CardHeader className="text-center border-b border-gold-900/20 pb-6">
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gold flex items-center justify-center shadow-md shadow-gold/30">
            <img
              src="/images/logo.png"
              alt="Gospofy Logo"
              className="w-full h-full"
            />
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
            <FormInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="admin@gospofy.com"
              required
              icon={<Mail className="w-5 h-5" color="#fff" />}
            />
            <FormInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="••••••••"
              required
              icon={<Lock className="w-5 h-5" color="#fff" />}
            />
            <div className="pt-2">
              <FormButton
                type="submit"
                isLoading={isLoading}
                className="text-sm h-[50px]"
              >
                Login
              </FormButton>
            </div>
            <div className="text-center text-sm text-gray-500 border-t border-gray-800 pt-4 mt-4">
              <p>Admin access only. Unauthorized access is prohibited.</p>
              <p className="mt-2 text-gold/70 hover:text-gold cursor-pointer transition-colors">
                Forgot password?
              </p>
            </div>
          </form>
        </CardContent>
        <Link href="https://gospofy.com" className="p-4 text-center text-blue">
          Login in as user: <span className="text-gold">user@gospofy.com</span>
        </Link>
      </Card>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Gospofy. All rights reserved.</p>
      </div>
    </div>
  );
}

export default App;
