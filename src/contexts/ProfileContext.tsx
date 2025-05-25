
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useWallet } from './WalletContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";

export type SkillCategory = {
  name: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Websites, IT & Software",
    skills: ["Web Development", "Software Engineering", "DevOps", "Database Administration", "UI/UX Design"]
  },
  {
    name: "Writing & Content",
    skills: ["Copywriting", "Content Creation", "Technical Writing", "Editing", "Proofreading"]
  },
  {
    name: "Design, Media & Architecture",
    skills: ["Graphic Design", "Video Production", "3D Modeling", "Animation", "Architecture"]
  },
  {
    name: "Data Entry & Admin",
    skills: ["Data Entry", "Virtual Assistant", "Administrative Support", "Transcription", "Customer Support"]
  },
  {
    name: "Engineering & Science",
    skills: ["Mechanical Engineering", "Electrical Engineering", "Scientific Research", "Chemistry", "Physics"]
  },
  {
    name: "Sales & Marketing",
    skills: ["Digital Marketing", "SEO", "Social Media Marketing", "Email Marketing", "Sales Strategy"]
  },
  {
    name: "Artificial Intelligence",
    skills: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision", "AI Ethics"]
  }
];

export type UserProfile = {
  id?: string;
  username: string;
  email: string;
  emailVerified: boolean;
  idVerified: boolean;
  skills: string[];
  profileType: "hire" | "earn" | "fun" | null;
  bio: string;
  profileImage: string | null;
  subscription: {
    active: boolean;
    plan: "3months" | "9months" | "18months" | null;
    expiresAt: string | null;
  };
};

export type UserSkill = {
  id: string;
  skill_name: string;
  category: string;
  rate: number;
  rate_type: string;
  description: string;
};

interface ProfileContextType {
  profile: UserProfile | null;
  userSkills: UserSkill[];
  isProfileComplete: boolean;
  isOnboarding: boolean;
  isLoading: boolean;
  setProfile: (profile: UserProfile | null) => void;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  startOnboarding: (type: "hire" | "earn" | "fun") => void;
  completeOnboarding: () => void;
  loadUserData: () => Promise<void>;
  addSkill: (skill: Omit<UserSkill, 'id'>) => Promise<void>;
  deleteSkill: (skillId: string) => Promise<void>;
  updateMembership: (plan: "3months" | "9months" | "18months") => Promise<void>;
  cancelMembership: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { isConnected, address } = useWallet();
  const { toast } = useToast();
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load user data on wallet connection
  useEffect(() => {
    if (isConnected && address) {
      loadUserData();
    } else {
      // Clear data when wallet disconnected
      setProfileState(null);
      setUserSkills([]);
    }
  }, [isConnected, address]);

  const loadUserData = async () => {
    if (!address) return;
    
    setIsLoading(true);
    try {
      // Load user profile
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', address)
        .single();

      if (userError && userError.code !== 'PGRST116') {
        throw userError;
      }

      if (userData) {
        // Load membership data
        const { data: membershipData } = await supabase
          .from('memberships')
          .select('*')
          .eq('user_id', userData.id)
          .eq('status', 'active')
          .single();

        // Load skills data
        const { data: skillsData } = await supabase
          .from('skills')
          .select('*')
          .eq('user_id', userData.id);

        const userProfile: UserProfile = {
          id: userData.id,
          username: userData.username || '',
          email: userData.email || '',
          emailVerified: userData.email_verified || false,
          idVerified: false, // Not implemented yet
          skills: skillsData?.map(skill => skill.skill_name) || [],
          profileType: userData.profile_type as "hire" | "earn" | "fun" | null,
          bio: userData.bio || '',
          profileImage: userData.profile_image,
          subscription: {
            active: !!membershipData && new Date(membershipData.end_date) > new Date(),
            plan: membershipData?.plan as "3months" | "9months" | "18months" | null,
            expiresAt: membershipData?.end_date || null
          }
        };

        setProfileState(userProfile);
        setUserSkills(skillsData || []);
        
        // Store in localStorage for persistence
        localStorage.setItem(`profile_${address}`, JSON.stringify(userProfile));
      } else {
        // Try to load from localStorage if no DB data
        const storedProfile = localStorage.getItem(`profile_${address}`);
        if (storedProfile) {
          setProfileState(JSON.parse(storedProfile));
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        variant: "destructive",
        title: "Failed to Load Profile",
        description: "There was an error loading your profile data.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile || !address) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({
          username: updates.username,
          email: updates.email,
          email_verified: updates.emailVerified,
          profile_type: updates.profileType,
          bio: updates.bio,
          profile_image: updates.profileImage
        })
        .eq('wallet_address', address);

      if (error) throw error;

      const updatedProfile = { ...profile, ...updates };
      setProfileState(updatedProfile);
      localStorage.setItem(`profile_${address}`, JSON.stringify(updatedProfile));

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Failed to update your profile. Please try again.",
      });
    }
  };

  const addSkill = async (skill: Omit<UserSkill, 'id'>) => {
    if (!profile?.id) return;

    try {
      const { data, error } = await supabase
        .from('skills')
        .insert([{ ...skill, user_id: profile.id }])
        .select()
        .single();

      if (error) throw error;

      setUserSkills(prev => [...prev, data]);
      
      // Update profile skills array
      const updatedSkills = [...profile.skills, skill.skill_name];
      await updateProfile({ skills: updatedSkills });

      toast({
        title: "Skill Added",
        description: "Your skill has been added successfully.",
      });
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        variant: "destructive",
        title: "Failed to Add Skill",
        description: "There was an error adding your skill.",
      });
    }
  };

  const deleteSkill = async (skillId: string) => {
    if (!profile) return;

    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId);

      if (error) throw error;

      const skillToDelete = userSkills.find(s => s.id === skillId);
      setUserSkills(prev => prev.filter(skill => skill.id !== skillId));
      
      // Update profile skills array
      if (skillToDelete) {
        const updatedSkills = profile.skills.filter(s => s !== skillToDelete.skill_name);
        await updateProfile({ skills: updatedSkills });
      }

      toast({
        title: "Skill Deleted",
        description: "Your skill has been removed successfully.",
      });
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast({
        variant: "destructive",
        title: "Failed to Delete Skill",
        description: "There was an error removing your skill.",
      });
    }
  };

  const updateMembership = async (plan: "3months" | "9months" | "18months") => {
    if (!profile?.id) return;

    try {
      const startDate = new Date();
      const endDate = new Date();
      
      // Calculate end date based on plan
      switch (plan) {
        case '3months':
          endDate.setMonth(endDate.getMonth() + 3);
          break;
        case '9months':
          endDate.setMonth(endDate.getMonth() + 9);
          break;
        case '18months':
          endDate.setMonth(endDate.getMonth() + 18);
          break;
      }

      const { error } = await supabase
        .from('memberships')
        .upsert([{
          user_id: profile.id,
          plan,
          status: 'active',
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString()
        }]);

      if (error) throw error;

      // Update local state
      const updatedProfile = {
        ...profile,
        subscription: {
          active: true,
          plan,
          expiresAt: endDate.toISOString()
        }
      };
      
      setProfileState(updatedProfile);
      localStorage.setItem(`profile_${address}`, JSON.stringify(updatedProfile));

      toast({
        title: "Membership Updated",
        description: "Your membership has been activated successfully.",
      });
    } catch (error) {
      console.error('Error updating membership:', error);
      toast({
        variant: "destructive",
        title: "Membership Update Failed",
        description: "There was an error updating your membership.",
      });
    }
  };

  const cancelMembership = async () => {
    if (!profile?.id) return;

    try {
      const { error } = await supabase
        .from('memberships')
        .update({ status: 'cancelled' })
        .eq('user_id', profile.id)
        .eq('status', 'active');

      if (error) throw error;

      // Update local state
      const updatedProfile = {
        ...profile,
        subscription: {
          active: false,
          plan: null,
          expiresAt: null
        }
      };
      
      setProfileState(updatedProfile);
      localStorage.setItem(`profile_${address}`, JSON.stringify(updatedProfile));

      toast({
        title: "Membership Cancelled",
        description: "Your membership has been cancelled. You can renew anytime.",
      });
    } catch (error) {
      console.error('Error cancelling membership:', error);
      toast({
        variant: "destructive",
        title: "Cancellation Failed",
        description: "There was an error cancelling your membership.",
      });
    }
  };

  // Calculate if profile is complete
  const isProfileComplete = Boolean(
    profile && 
    profile.username && 
    profile.email && 
    profile.emailVerified &&
    profile.profileType
  );

  const setProfile = (newProfile: UserProfile | null) => {
    setProfileState(newProfile);
  };

  const startOnboarding = (type: "hire" | "earn" | "fun") => {
    setIsOnboarding(true);
    setProfileState({
      username: '',
      email: '',
      emailVerified: false,
      idVerified: false,
      skills: [],
      profileType: type,
      bio: '',
      profileImage: null,
      subscription: {
        active: false,
        plan: null,
        expiresAt: null
      }
    });
  };

  const completeOnboarding = () => {
    setIsOnboarding(false);
  };

  return (
    <ProfileContext.Provider 
      value={{ 
        profile, 
        userSkills,
        isProfileComplete, 
        isOnboarding,
        isLoading,
        setProfile, 
        updateProfile, 
        startOnboarding,
        completeOnboarding,
        loadUserData,
        addSkill,
        deleteSkill,
        updateMembership,
        cancelMembership
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
