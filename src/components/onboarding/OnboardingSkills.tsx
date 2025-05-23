
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from 'lucide-react';
import { useProfile } from '@/contexts/ProfileContext';
import { skillCategories } from '@/contexts/ProfileContext';
import { useToast } from "@/components/ui/use-toast";

type OnboardingSkillsProps = {
  onNext: () => void;
};

const OnboardingSkills = ({ onNext }: OnboardingSkillsProps) => {
  const { profile, updateProfile } = useProfile();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(profile?.skills || []);
  
  const handleSelectSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && !selectedSkills.includes(searchQuery.trim())) {
      setSelectedSkills([...selectedSkills, searchQuery.trim()]);
      setSearchQuery("");
    }
  };
  
  const handleNext = () => {
    if (selectedSkills.length === 0) {
      toast({
        variant: "destructive",
        title: "Skills Required",
        description: "Please select at least one skill to continue.",
      });
      return;
    }
    
    updateProfile({ skills: selectedSkills });
    onNext();
  };
  
  // Get skills for the selected category
  const categorySkills = selectedCategory 
    ? skillCategories.find(cat => cat.name === selectedCategory)?.skills || []
    : [];
    
  // Get all skills for search filtering
  const allSkills = skillCategories.flatMap(cat => cat.skills);
  
  // Filter skills based on search query
  const filteredSkills = searchQuery
    ? allSkills.filter(skill => 
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">Select your skills</h2>
      <p className="text-white/70 text-center mb-8">
        This helps us recommend jobs that match your expertise
      </p>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Input
            placeholder="Search a skill"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/5 border-white/10 text-white pl-10"
          />
          <Search className="absolute left-3 top-3 text-white/60" size={16} />
        </div>
        
        {searchQuery && filteredSkills.length > 0 && (
          <div className="mt-2 bg-white/5 rounded-md p-2 max-h-40 overflow-y-auto">
            {filteredSkills.map(skill => (
              <button
                key={skill}
                type="button"
                className="block w-full text-left px-2 py-1 rounded text-white/80 hover:bg-white/10"
                onClick={() => {
                  handleSelectSkill(skill);
                  setSearchQuery("");
                }}
              >
                {skill}
              </button>
            ))}
          </div>
        )}
      </form>
      
      <div className="mb-6">
        <h3 className="text-white mb-3 font-medium">OR</h3>
        <h3 className="text-white mb-3 font-medium">Select a category</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {skillCategories.map(category => (
            <button
              key={category.name}
              type="button"
              className={`px-4 py-2 rounded-md text-left text-sm ${
                selectedCategory === category.name 
                  ? 'bg-skrypto-purple/30 border border-skrypto-purple'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
              onClick={() => handleSelectCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {selectedCategory && (
          <div className="mt-4">
            <h4 className="text-white mb-2">Select skills in {selectedCategory}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {categorySkills.map(skill => (
                <button
                  key={skill}
                  type="button"
                  className={`px-4 py-2 rounded-md text-left text-sm ${
                    selectedSkills.includes(skill)
                      ? 'bg-skrypto-blue/30 border border-skrypto-blue'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => handleSelectSkill(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-white font-medium">{selectedSkills.length} skills selected</h4>
          <span className="text-white/60 text-sm">
            {selectedSkills.length === 0 ? 
              'Select at least one skill to help us recommend customized jobs for you.' : 
              ''}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedSkills.map(skill => (
            <div 
              key={skill}
              className="bg-skrypto-purple/20 border border-skrypto-purple/40 text-white px-3 py-1 rounded-full flex items-center gap-1"
            >
              <span>{skill}</span>
              <button 
                type="button"
                onClick={() => handleSelectSkill(skill)}
                className="hover:bg-white/10 rounded-full"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={handleNext}
          disabled={selectedSkills.length === 0}
          className="w-full bg-skrypto-purple hover:bg-skrypto-purple/90"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default OnboardingSkills;
