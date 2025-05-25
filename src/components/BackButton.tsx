
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const BackButton = ({ to, className = "", children, onClick }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={`text-white hover:bg-white/10 flex items-center gap-2 ${className}`}
    >
      <ArrowLeft size={16} />
      {children || "Back"}
    </Button>
  );
};

export default BackButton;
