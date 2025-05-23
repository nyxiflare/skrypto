
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileUp, Check } from 'lucide-react';
import { useProfile } from '@/contexts/ProfileContext';
import { useToast } from "@/components/ui/use-toast";

type OnboardingIdVerificationProps = {
  onNext: () => void;
  onSkip: () => void;
};

const OnboardingIdVerification = ({ onNext, onSkip }: OnboardingIdVerificationProps) => {
  const { updateProfile } = useProfile();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleUpload = () => {
    if (!file) return;
    
    setUploading(true);
    
    // Mock upload delay
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
      updateProfile({ idVerified: true });
      toast({
        title: "ID Uploaded",
        description: "Your ID has been uploaded for verification.",
      });
    }, 2000);
  };
  
  const handleContinue = () => {
    onNext();
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">Identity Verification</h2>
      <p className="text-white/70 text-center mb-8">
        Upload a government-issued ID for verification. This step is optional but helps build trust.
      </p>
      
      <div className="bg-white/5 p-6 rounded-xl border border-dashed border-white/20 text-center mb-6">
        {uploaded ? (
          <div className="flex flex-col items-center">
            <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Check className="text-green-500" size={32} />
            </div>
            <p className="text-white font-medium">ID uploaded successfully</p>
            <p className="text-white/60 text-sm mt-2">Your ID is pending verification</p>
          </div>
        ) : (
          <>
            <FileUp className="mx-auto text-white/60 mb-4" size={40} />
            <p className="text-white mb-2">Drop your ID here or click to browse</p>
            <p className="text-white/60 text-sm mb-4">Supported formats: JPG, PNG, PDF</p>
            
            <input
              type="file"
              id="id-upload"
              className="hidden"
              onChange={handleFileChange}
              accept="image/jpeg,image/png,application/pdf"
            />
            <label htmlFor="id-upload">
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => document.getElementById('id-upload')?.click()}
              >
                Select File
              </Button>
            </label>
            
            {file && (
              <div className="mt-4">
                <p className="text-white text-sm">{file.name}</p>
                <Button 
                  onClick={handleUpload}
                  disabled={uploading}
                  className="mt-2 bg-skrypto-purple hover:bg-skrypto-purple/90"
                >
                  {uploading ? "Uploading..." : "Upload ID"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="ghost" 
          onClick={onSkip}
          className="text-white/60 hover:text-white hover:bg-white/10"
        >
          Skip for now
        </Button>
        
        <Button 
          onClick={handleContinue}
          disabled={!uploaded}
          className="bg-skrypto-blue hover:bg-skrypto-blue/90"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default OnboardingIdVerification;
