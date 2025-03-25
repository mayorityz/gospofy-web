// import "./App.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { FormInput } from "@/components/form/FormInput";
import { FormButton } from "@/components/form/FormButton";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router";
import { LOGIN } from "@/server/auth";
import LocalStorage from "@/lib/storage";
import { STORAGE_KEY } from "@/lib/storage";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      const data = {
        email,
        password,
      };

      const response = await LOGIN(data);

      if (response.success) {
        const _storage = new LocalStorage();
        _storage.setItem(STORAGE_KEY.TOKEN, response.data.token);

        window.location.href = "/user";
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-[100vw] bg-black flex items-center justify-center p-4 bg-gradient-to-b from-black to-gray-900">
      <Card className="w-full max-w-md border-gold-900 shadow-lg shadow-gold/20 bg-black/50">
        <CardHeader className="text-center border-b border-gold-900/20 pb-6">
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gold flex items-center justify-center shadow-md shadow-gold/30">
            <img src="/images/logo.png" alt="Gospofy Logo" className="w-full h-full" />
          </div>
          <CardTitle className="text-xl text-gold-900 font-Montserrat">
            Welcome to Gospofy
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-800/30 text-red-400 text-capitalize rounded-md text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-5">
            <FormInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="john@doe.com"
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
            <Link
              to="/create-account"
              className="text-gold/70 hover:text-gold cursor-pointer transition-colors text-right">
              <p className="text-[grey] text-[12px] hover:text-gold cursor-pointer transition-colors font-[Montserrat]">
                Don't have an account? Create one.
              </p>
            </Link>
            <div className="pt-2">
              <FormButton type="submit" isLoading={isLoading} className="text-sm h-[50px]">
                Login
              </FormButton>
            </div>
            <div className="text-center text-sm text-gray-500 border-t border-gray-800 pt-4 mt-4">
              <Link
                to="/forgot-password"
                className="mt-2 text-gold/70 hover:text-gold cursor-pointer transition-colors">
                <p className="mt-2 text-gold/70 hover:text-gold cursor-pointer transition-colors">
                  Forgot password?
                </p>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Gospofy. All rights reserved.</p>
      </div>
    </div>
  );
}

export default UserLogin;
