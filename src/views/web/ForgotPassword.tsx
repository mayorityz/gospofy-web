import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, Mail, KeyRound, Lock } from "lucide-react";
import { FormInput } from "@/components/form/FormInput";
import { FormButton } from "@/components/form/FormButton";

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Step titles and descriptions
  const stepInfo = [
    {
      title: "Forgot Password",
      description: "Enter your email address to receive a verification code",
      icon: <Mail className="h-6 w-6 text-gold" />,
    },
    {
      title: "Enter Verification Code",
      description: "We've sent a code to your email. Enter it below to verify your identity",
      icon: <KeyRound className="h-6 w-6 text-gold" />,
    },
    {
      title: "Create New Password",
      description: "Set a new password for your account",
      icon: <Lock className="h-6 w-6 text-gold" />,
    },
  ];

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateOtp = (otp: string) => {
    return otp.length === 6 && /^\d+$/.test(otp);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, you would call your API here
      // const response = await fetch("/api/auth/forgot-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email })
      // });

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(`Verification code has been sent to ${email}`);

      // Move to OTP verification step
      setCurrentStep(1);
    } catch (error) {
      setError("Failed to send verification code. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateOtp(otp)) {
      setError("Please enter a valid 6-digit verification code");
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, you would call your API here
      // const response = await fetch("/api/auth/verify-otp", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, otp })
      // });

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess("Verification successful");

      // Move to password reset step
      setCurrentStep(2);
    } catch (error) {
      setError("Invalid verification code. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

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
      // In a real app, you would call your API here
      // const response = await fetch("/api/auth/reset-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, otp, password })
      // });

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess("Your password has been reset successfully");

      // In a real app, you might redirect to login page after a successful reset
      // window.location.href = "/login";
    } catch (error) {
      setError("Failed to reset password. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setError("");
    setSuccess("");
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {[0, 1, 2].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                currentStep > step
                  ? "bg-gold text-black font-semibold"
                  : currentStep === step
                  ? "bg-gold-900/50 border-2 border-gold text-gold"
                  : "bg-gray-900 border border-gray-700 text-gray-500"
              }`}>
              {currentStep > step ? <Check className="h-5 w-5" /> : <span>{step + 1}</span>}
            </div>
            {step < 2 && (
              <div
                className={`mx-2 sm:mx-4 w-16 sm:w-20 h-[2px] transition-colors duration-200 mb-0.5 ${
                  currentStep > step ? "bg-gold" : "bg-gray-700"
                }`}></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-[100vw] bg-black flex items-center justify-center p-4 bg-gradient-to-b from-black to-gray-900">
      <Card className="w-full max-w-md border-gold-900 shadow-lg shadow-gold/20 bg-black/50">
        <CardHeader className="text-center border-b border-gold-900/20 pb-6">
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gold flex items-center justify-center shadow-md shadow-gold/30">
            <img src="/images/logo.png" alt="Gospofy Logo" className="w-full h-full" />
          </div>
          <CardTitle className="text-xl text-gold-900 font-Montserrat">
            {stepInfo[currentStep].title}
          </CardTitle>
          <p className="text-gray-400 mt-2">{stepInfo[currentStep].description}</p>
        </CardHeader>
        <CardContent className="pt-6">
          {renderStepIndicator()}

          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-800/30 text-red-400 rounded-md text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-900/20 border border-green-800/30 text-green-400 rounded-md text-sm">
              {success}
            </div>
          )}

          {currentStep === 0 && (
            <form onSubmit={handleEmailSubmit} className="space-y-5">
              <FormInput
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                placeholder="Enter your email"
                required
                icon={<Mail className="w-5 h-5" color="#fff" />}
              />
              <div className="pt-2">
                <FormButton type="submit" isLoading={isLoading} className="text-sm h-[50px]">
                  Send Verification Code
                </FormButton>
              </div>
              <div className="text-center text-sm text-gray-500 border-t border-gray-800 pt-4 mt-4">
                <a
                  href="/login"
                  className="mt-2 text-gold/70 hover:text-gold cursor-pointer transition-colors">
                  Back to Login
                </a>
              </div>
            </form>
          )}

          {currentStep === 1 && (
            <form onSubmit={handleOtpSubmit} className="space-y-5">
              <FormInput
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                label="Verification Code"
                placeholder="Enter 6-digit code"
                required
                icon={<KeyRound className="w-5 h-5" color="#fff" />}
              />
              <div className="grid grid-cols-2 gap-3 pt-2">
                <FormButton
                  type="button"
                  onClick={handleBack}
                  className="text-sm h-[50px] bg-gray-800 hover:bg-gray-700">
                  <div className="flex items-center justify-center">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </div>
                </FormButton>
                <FormButton type="submit" isLoading={isLoading} className="text-sm h-[50px]">
                  Verify Code
                </FormButton>
              </div>
              <div className="text-center text-sm text-gray-500 border-t border-gray-800 pt-4 mt-4">
                <button
                  type="button"
                  className="mt-2 text-gold/70 hover:text-gold cursor-pointer transition-colors"
                  onClick={handleEmailSubmit}
                  disabled={isLoading}>
                  Didn't receive a code? Resend
                </button>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              <FormInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="New Password"
                placeholder="Enter new password"
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
                placeholder="Confirm new password"
                required
                icon={<Lock className="w-5 h-5" color="#fff" />}
              />

              <div className="grid grid-cols-2 gap-3 pt-2">
                <FormButton
                  type="button"
                  onClick={handleBack}
                  className="text-sm h-[50px] bg-gray-800 hover:bg-gray-700">
                  <div className="flex items-center justify-center">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </div>
                </FormButton>
                <FormButton type="submit" isLoading={isLoading} className="text-sm h-[50px]">
                  Reset Password
                </FormButton>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Gospofy. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
