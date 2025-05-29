
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Flag } from 'lucide-react';

interface ReportUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReport: (reason: string) => void;
  username: string;
}

const reportReasons = [
  'Spam or unwanted messages',
  'Harassment or abuse',
  'Inappropriate content',
  'Fraud or scam',
  'Fake profile',
  'Other'
];

const ReportUserModal: React.FC<ReportUserModalProps> = ({
  isOpen,
  onClose,
  onReport,
  username
}) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const handleReport = () => {
    const reason = selectedReason === 'Other' ? customReason : selectedReason;
    if (reason.trim()) {
      onReport(reason.trim());
      setSelectedReason('');
      setCustomReason('');
    }
  };

  const isSubmitDisabled = !selectedReason || (selectedReason === 'Other' && !customReason.trim());

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-skrypto-dark border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Flag size={20} />
            Report {username}
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Help us understand what's happening. Your report will be reviewed by our team.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className="text-white">Reason for reporting</Label>
            <RadioGroup
              value={selectedReason}
              onValueChange={setSelectedReason}
              className="mt-2"
            >
              {reportReasons.map((reason) => (
                <div key={reason} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={reason}
                    id={reason}
                    className="border-white/30 text-skrypto-purple"
                  />
                  <Label htmlFor={reason} className="text-white/80 cursor-pointer">
                    {reason}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          {selectedReason === 'Other' && (
            <div>
              <Label htmlFor="custom-reason" className="text-white">
                Please describe the issue
              </Label>
              <Textarea
                id="custom-reason"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Describe what happened..."
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 mt-1"
                rows={3}
                required
              />
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/10 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleReport}
            disabled={isSubmitDisabled}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Submit Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportUserModal;
