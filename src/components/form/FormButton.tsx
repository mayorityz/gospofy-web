import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormButtonProps {
  type?: "submit" | "button" | "reset";
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

export const FormButton = ({
  type = "button",
  className = "",
  disabled = false,
  isLoading = false,
  children,
  onClick,
}: FormButtonProps) => {
  return (
    <Button
      type={type}
      className={`w-full bg-gold-900 hover:bg-gold-900/90 text-white font-bold py-3 transition-all duration-300 shadow-md hover:shadow-gold-900/30 ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
