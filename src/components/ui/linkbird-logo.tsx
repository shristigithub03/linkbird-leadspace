import { Bird } from "lucide-react";

interface LinkBirdLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const LinkBirdLogo = ({ className = "", size = "md" }: LinkBirdLogoProps) => {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-10 w-10"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center justify-center rounded-lg bg-gradient-primary p-1.5 shadow-soft">
        <Bird className={`${sizes[size]} text-white`} />
      </div>
      <span className={`${textSizes[size]} font-bold text-foreground`}>
        LinkBird
      </span>
    </div>
  );
};