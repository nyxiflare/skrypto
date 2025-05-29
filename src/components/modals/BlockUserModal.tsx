
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
import { Shield } from 'lucide-react';

interface BlockUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBlock: (reason?: string) => void;
  username: string;
}

const BlockUserModal: React.FC<BlockUserModalProps> = ({
  isOpen,
  onClose,
  onBlock,
  username
}) => {
  const [reason, setReason] = useState('');

  const handleBlock = () => {
    onBlock(reason.trim() || undefined);
    setReason('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-skrypto-dark border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Shield size={20} />
            Block {username}
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Are you sure you want to block this user? They will no longer be able to send you messages.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="reason" className="text-white">
              Reason (optional)
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why are you blocking this user?"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 mt-1"
              rows={3}
            />
          </div>
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
            onClick={handleBlock}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Block User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BlockUserModal;
