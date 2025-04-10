'use client';

import UploadModel from '@/components/models/upload-model';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className='flex flex-col items-center justify-center'>
      <Button onClick={() => setIsUploadModalOpen(true)}>
        <Upload className='mr-2 h-4 w-4' />
        Upload Contract
      </Button>

      <UploadModel
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
}
