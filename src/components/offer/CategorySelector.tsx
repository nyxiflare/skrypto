
import React from 'react';
import { 
  Briefcase, 
  PenTool, 
  Code, 
  FileText, 
  Video, 
  LineChart, 
  CheckCircle 
} from 'lucide-react';

interface CategoryOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface CategorySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  value, 
  onValueChange 
}) => {
  const categories: CategoryOption[] = [
    { value: 'design', label: 'Design', icon: <PenTool size={18} /> },
    { value: 'development', label: 'Development', icon: <Code size={18} /> },
    { value: 'writing', label: 'Writing', icon: <FileText size={18} /> },
    { value: 'video', label: 'Video & Animation', icon: <Video size={18} /> },
    { value: 'business', label: 'Business', icon: <Briefcase size={18} /> },
    { value: 'marketing', label: 'Marketing', icon: <LineChart size={18} /> },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {categories.map((category) => (
        <button
          key={category.value}
          type="button"
          className={`flex items-center p-3 rounded-lg border ${
            value === category.value
              ? 'border-skrypto-purple bg-skrypto-purple/20 text-white'
              : 'border-white/10 bg-skrypto-darker text-white/70 hover:bg-white/5'
          } transition-colors`}
          onClick={() => onValueChange(category.value)}
        >
          <div className="mr-2">{category.icon}</div>
          <span>{category.label}</span>
          {value === category.value && <CheckCircle size={16} className="ml-auto text-skrypto-purple" />}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
