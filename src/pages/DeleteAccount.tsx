import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Trash2, UserX, Music, FileAudio, BookOpen, Mail } from "lucide-react";
import { useNavigate } from "react-router";

export default function DeleteAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleDeleteAccount = async () => {
    if (!email.trim()) {
      setEmailError("Email address is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    setIsDeleting(true);
    try {
      // TODO: Implement actual account deletion API call
      // await deleteAccountAPI(email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear local storage
      localStorage.clear();

      // Redirect to landing page
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      setIsDeleting(false);
    }
  };

  const dataLossItems = [
    {
      icon: <Music className="w-5 h-5 text-red-500" />,
      title: "Music Library",
      description: "All your saved songs, playlists, and music preferences",
    },
    {
      icon: <FileAudio className="w-5 h-5 text-red-500" />,
      title: "Podcasts & Sermons",
      description: "Downloaded episodes, listening history, and bookmarks",
    },
    {
      icon: <BookOpen className="w-5 h-5 text-red-500" />,
      title: "Content & Uploads",
      description: "Any podcasts, sermons, or music you've uploaded",
    },
    {
      icon: <UserX className="w-5 h-5 text-red-500" />,
      title: "Account Data",
      description: "Profile information, settings, and subscription history",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-[100px]">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-lg border-red-200">
          <CardHeader className="text-center border-b border-red-100">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Delete Account</CardTitle>
            <p className="text-gray-600 mt-2">
              This action cannot be undone. Please read carefully before proceeding.
            </p>
          </CardHeader>

          <CardContent className="p-6">
            {/* Warning Section */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-2">⚠️ Irreversible Action</h3>
                  <p className="text-red-700 text-sm">
                    Once you delete your account, all your data will be permanently removed and
                    cannot be recovered. This includes your music library, podcasts, sermons, and
                    any uploaded content.
                  </p>
                </div>
              </div>
            </div>

            {/* What You'll Lose */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What You'll Lose:</h3>
              <div className="space-y-3">
                {dataLossItems.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    {item.icon}
                    <div>
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternative Options */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">💡 Consider These Alternatives:</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>
                  • <strong>Deactivate account:</strong> Temporarily disable your account instead of
                  permanent deletion
                </li>
                <li>
                  • <strong>Export your data:</strong> Download your music library and content
                  before deleting
                </li>
                <li>
                  • <strong>Contact support:</strong> If you're having issues, we're here to help
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={() => navigate(-1)} className="flex-1">
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => setIsModalOpen(true)} className="flex-1">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Confirmation Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                <span>Final Confirmation</span>
              </DialogTitle>
              <DialogDescription className="text-left">
                <div className="space-y-4">
                  <p className="font-semibold text-gray-900">
                    Are you absolutely sure you want to delete your account?
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm font-medium">
                      This action is <strong>PERMANENT</strong> and cannot be undone.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">You will lose:</p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• All your music and playlists</li>
                      <li>• Downloaded podcasts and sermons</li>
                      <li>• Uploaded content and creations</li>
                      <li>• Account settings and preferences</li>
                      <li>• Subscription and payment history</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-yellow-800 text-sm">
                      <strong>Note:</strong> If you have any active subscriptions, they will be
                      cancelled immediately.
                    </p>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Confirm your email address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError("");
                        }}
                        className={`pl-10 ${emailError ? "border-red-500" : ""}`}
                        disabled={isDeleting}
                      />
                    </div>
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    <p className="text-xs text-gray-500">
                      A confirmation email will be sent to this address before your account is
                      permanently deleted.
                    </p>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1"
                disabled={isDeleting}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="flex-1">
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Yes, Delete My Account
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
