import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ViewProfileDialogProps {
  user: {
    _id: string;
    name: string;
    email: string;
    isVerified: boolean;
    createdAt: string;
    accountStatus: "active" | "suspended";
    isPremiumUser: boolean;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const ViewProfileDialog = ({ user, isOpen, onClose }: ViewProfileDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#1A1A1A] border-gold-900/20">
        <DialogHeader>
          <DialogTitle className="text-gold-900">User Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-gray-400">Name:</span>
            <span className="col-span-3 text-white">{user.name}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-gray-400">Email:</span>
            <span className="col-span-3 text-white">{user.email}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-gray-400">Status:</span>
            <span
              className={`col-span-3 ${
                user.accountStatus === "active" ? "text-green-500" : "text-red-500"
              }`}>
              {user.accountStatus === "active" ? "Active" : "Suspended"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-gray-400">Subscription:</span>
            <span
              className={`col-span-3 ${user.isPremiumUser ? "text-gold-900" : "text-gray-400"}`}>
              {user.isPremiumUser ? "Premium" : "Free"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-gray-400">Joined:</span>
            <span className="col-span-3 text-white">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
