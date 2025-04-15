'use client';

import UserContracts from '@/components/dashboard/user-contracts';
import UploadModel from '@/components/models/upload-model';
import { Button } from '@/components/ui/button';
import { Upload, User } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div>
      <UserContracts />
      
    </div>
  );
}
