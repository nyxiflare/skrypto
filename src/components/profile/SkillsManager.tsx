
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from 'lucide-react';
import { useProfile, skillCategories, UserSkill } from '@/contexts/ProfileContext';

const SkillsManager = () => {
  const { userSkills, addSkill, deleteSkill } = useProfile();
  const [showForm, setShowForm] = useState(false);
  const [newSkill, setNewSkill] = useState({
    skill_name: '',
    category: '',
    rate: 0,
    rate_type: 'per project',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.skill_name || !newSkill.category) return;

    await addSkill(newSkill);
    setNewSkill({
      skill_name: '',
      category: '',
      rate: 0,
      rate_type: 'per project',
      description: ''
    });
    setShowForm(false);
  };

  const handleDelete = async (skillId: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      await deleteSkill(skillId);
    }
  };

  return (
    <Card className="glass border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">My Skills</CardTitle>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-skrypto-purple hover:bg-skrypto-purple/90"
            size="sm"
          >
            <Plus size={16} className="mr-2" />
            Add Skill
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {userSkills.length === 0 ? (
          <p className="text-white/60 text-center py-8">
            No skills added yet. Click "Add Skill" to get started.
          </p>
        ) : (
          <div className="space-y-4">
            {userSkills.map((skill) => (
              <div key={skill.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{skill.skill_name}</h3>
                    <Badge variant="outline" className="mt-1 border-white/20 text-white/70">
                      {skill.category}
                    </Badge>
                    <div className="mt-2">
                      <span className="text-skrypto-green font-bold">${skill.rate}</span>
                      <span className="text-white/60 ml-2">{skill.rate_type}</span>
                    </div>
                    {skill.description && (
                      <p className="text-white/70 text-sm mt-2">{skill.description}</p>
                    )}
                  </div>
                  <Button
                    onClick={() => handleDelete(skill.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="mt-6 p-4 bg-white/5 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="skill_name" className="text-white">Skill Name</Label>
                <Input
                  id="skill_name"
                  value={newSkill.skill_name}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, skill_name: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="e.g., React Development"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-white">Category</Label>
                <Select
                  value={newSkill.category}
                  onValueChange={(value) => setNewSkill(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillCategories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rate" className="text-white">Rate ($)</Label>
                  <Input
                    id="rate"
                    type="number"
                    value={newSkill.rate}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, rate: parseFloat(e.target.value) || 0 }))}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="50"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <Label htmlFor="rate_type" className="text-white">Rate Type</Label>
                  <Select
                    value={newSkill.rate_type}
                    onValueChange={(value) => setNewSkill(prev => ({ ...prev, rate_type: value }))}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="per project">Per Project</SelectItem>
                      <SelectItem value="per hour">Per Hour</SelectItem>
                      <SelectItem value="per day">Per Day</SelectItem>
                      <SelectItem value="per week">Per Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-white">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={newSkill.description}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Describe your expertise and what you can deliver..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-skrypto-green hover:bg-skrypto-green/90"
                >
                  Add Skill
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="border-white/20 text-white hover:bg-white/5"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsManager;
