import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, User } from "lucide-react";
import { FormInput } from "@/components/form/FormInput";
import { FormButton } from "@/components/form/FormButton";
import { useNavigate } from "react-router";
import { CREATE_ACCOUNT } from "@/server/auth";
import LocalStorage, { STORAGE_KEY } from "@/lib/storage";

const CreateUserAccount = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!fullName.trim()) {
      setError("Please enter your full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      setIsLoading(true);
      const _storage = new LocalStorage();
      const response = await CREATE_ACCOUNT({ name: fullName, email, password });
      if (response.success) {
        setSuccess("Account created successfully");
        _storage.setItem(STORAGE_KEY.EMAIL, email);
        navigate("/otp");
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
            Create Your Account
          </CardTitle>
          <p className="text-gray-400 text-[12px]">Sign up to start your journey with Gospofy</p>
        </CardHeader>
        <CardContent className="pt-6">
          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-800/30 text-red-400 text-capitalize rounded-md text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-900/20 border border-green-800/30 text-green-400 rounded-md text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormInput
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              placeholder="John Doe"
              required
              icon={<User className="w-5 h-5" color="#fff" />}
            />

            <FormInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="john@example.com"
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
            <p className="text-xs text-gray-500 -mt-3 ml-1">
              Password must be at least 8 characters long
            </p>

            <FormInput
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
              placeholder="••••••••"
              required
              icon={<Lock className="w-5 h-5" color="#fff" />}
            />

            <div className="pt-2">
              <FormButton type="submit" isLoading={isLoading} className="text-sm h-[50px]">
                Create Account
              </FormButton>
            </div>

            <div className="text-center text-sm text-gray-500 border-t border-gray-800 pt-4 mt-4">
              <a
                href="/login"
                className="mt-2 text-gold/70 hover:text-gold cursor-pointer transition-colors">
                Already have an account? Log in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Gospofy. All rights reserved.</p>
      </div>
    </div>
  );
};

export default CreateUserAccount;
