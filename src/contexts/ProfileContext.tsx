
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useWallet } from './WalletContext';

// Define the skills categories and their skills
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
    plan: "monthly" | "9months" | "18months" | null;
    expiresAt: string | null;
  };
};

interface ProfileContextType {
  profile: UserProfile | null;
  isProfileComplete: boolean;
  isOnboarding: boolean;
  setProfile: (profile: UserProfile | null) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  startOnboarding: (type: "hire" | "earn" | "fun") => void;
  completeOnboarding: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { isConnected, address } = useWallet();
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [isOnboarding, setIsOnboarding] = useState(false);
  
  // Check if profile exists in localStorage on mount
  useEffect(() => {
    if (isConnected && address) {
      const storedProfile = localStorage.getItem(`profile_${address}`);
      if (storedProfile) {
        setProfileState(JSON.parse(storedProfile));
      }
    }
  }, [isConnected, address]);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (profile && address) {
      localStorage.setItem(`profile_${address}`, JSON.stringify(profile));
    }
  }, [profile, address]);

  // Calculate if profile is complete
  const isProfileComplete = Boolean(
    profile && 
    profile.username && 
    profile.email && 
    profile.emailVerified &&
    profile.skills.length > 0
  );

  const setProfile = (newProfile: UserProfile | null) => {
    setProfileState(newProfile);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (profile) {
      const updatedProfile = { ...profile, ...updates };
      setProfileState(updatedProfile);
    }
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
        isProfileComplete, 
        isOnboarding, 
        setProfile, 
        updateProfile, 
        startOnboarding,
        completeOnboarding
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
