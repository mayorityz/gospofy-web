import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormButton } from "@/components/form/FormButton";
import { VERIFY_EMAIL } from "@/server/auth";
import { STORAGE_KEY } from "@/lib/storage";
import LocalStorage from "@/lib/storage";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      pastedData.split("").forEach((digit, index) => {
        if (index < 6) newOtp[index] = digit;
      });
      setOtp(newOtp);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    try {
      const _storage = new LocalStorage();

      const data = {
        verificationCode: otpString,
        email: _storage.read(STORAGE_KEY.EMAIL),
      };

      console.log(data);

      const response = await VERIFY_EMAIL(data);
      if (response.success) {
        setSuccess("Verification successful");
        window.location.href = "/login";
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
            Enter Verification Code
          </CardTitle>
          <p className="text-gray-400 text-[12px]">We've sent a 6-digit code to your email</p>
        </CardHeader>
        <CardContent className="pt-6">
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-xl font-semibold bg-gray-900/50 border border-gold-900/20 text-white rounded-md focus:border-gold focus:ring-1 focus:ring-gold-900/50 focus:outline-none transition-colors"
                />
              ))}
            </div>

            <div className="pt-2">
              <FormButton type="submit" isLoading={isLoading} className="text-sm h-[50px]">
                Verify Code
              </FormButton>
            </div>

            <div className="text-center text-sm text-gray-500 border-t border-gray-800 pt-4 mt-4">
              <button
                type="button"
                className="mt-2 text-gold/70 hover:text-gold cursor-pointer transition-colors"
                onClick={() => {
                  // In a real app, you would call your API to resend the code
                  setSuccess("New code sent successfully");
                }}
                disabled={isLoading}>
                Didn't receive a code? Resend
              </button>
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

export default Otp;
