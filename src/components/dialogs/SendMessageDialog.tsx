import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
// import { IUser } from "@/server/users";
import { toast } from "sonner";

interface SendMessageDialogProps {
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

export const SendMessageDialog = ({ user, isOpen, onClose }: SendMessageDialogProps) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  console.log(user);

  const handleSend = async () => {
    try {
      setIsSending(true);
      // TODO: Implement message sending logic
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      toast.success("Message sent successfully");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#1A1A1A] border-gold-900/20">
        <DialogHeader>
          <DialogTitle className="text-gold-900">Send Message.</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-[#1A1A1A] border-gold-900/20 text-white"
            rows={5}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} className="border-gold-900/20">
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={!message.trim() || isSending}
              className="bg-gold-900 hover:bg-gold-900/90">
              {isSending ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
