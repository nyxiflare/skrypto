
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, LayoutList, Grid } from 'lucide-react';

interface TalentFiltersProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
  selectedToken: string;
  setSelectedToken: (token: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

const TalentFilters = ({
  viewMode,
  setViewMode,
  selectedSkills,
  setSelectedSkills,
  selectedToken,
  setSelectedToken,
  priceRange,
  setPriceRange
}: TalentFiltersProps) => {
  const skillOptions = [
    "coding", "design", "marketing", "writing", "blockchain", 
    "ui-design", "social-media", "video-editing", "seo", "copywriting"
  ];
  
  const cryptoOptions = ["all", "ETH", "USDT", "USDC", "SOL"];
  
  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Input 
              type="search"
              placeholder="Search by skill or keyword..."
              className="bg-skrypto-card/50 border-white/10 text-white"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5">
                <Filter size={16} />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-skrypto-card border-white/10">
              <div className="p-2">
                <Label className="text-sm text-white/70 mb-2 block">Price Range</Label>
                <div className="flex items-center gap-2 mb-4">
                  <Input 
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="bg-skrypto-dark border-white/10 text-white w-24"
                  />
                  <span className="text-white/60">to</span>
                  <Input 
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="bg-skrypto-dark border-white/10 text-white w-24"
                  />
                </div>
                
                <Label className="text-sm text-white/70 mb-2 block">Payment Token</Label>
                <ToggleGroup 
                  type="single" 
                  className="justify-start mb-4 flex flex-wrap gap-2"
                  value={selectedToken}
                  onValueChange={(value) => {
                    if (value) setSelectedToken(value);
                  }}
                >
                  {cryptoOptions.map(token => (
                    <ToggleGroupItem 
                      key={token}
                      value={token}
                      className="bg-skrypto-dark/80 data-[state=on]:bg-skrypto-purple/20 
                      data-[state=on]:text-skrypto-purple border border-white/10 rounded-md"
                    >
                      {token}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Tabs 
            defaultValue={viewMode} 
            className="w-min"
            onValueChange={(value) => setViewMode(value as 'grid' | 'list')}
          >
            <TabsList className="grid w-auto grid-cols-2 bg-skrypto-card/50">
              <TabsTrigger value="grid" className="px-3">
                <Grid size={16} />
              </TabsTrigger>
              <TabsTrigger value="list" className="px-3">
                <LayoutList size={16} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <div className="flex gap-2 min-w-max">
          {skillOptions.map(skill => (
            <button
              key={skill}
              className={`px-3 py-1.5 text-sm rounded-full border border-white/10 transition-colors
                ${selectedSkills.includes(skill)
                  ? 'bg-skrypto-purple/20 text-skrypto-purple'
                  : 'bg-skrypto-card/50 text-white/70 hover:bg-white/5'
                }`}
              onClick={() => handleSkillToggle(skill)}
            >
              {skill.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TalentFilters;
