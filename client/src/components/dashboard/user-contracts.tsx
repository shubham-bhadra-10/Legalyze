import { ContractAnalysis } from '@/interfaces/contract.interface';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ColumnDef, SortingState } from '@tanstack/react-table'; // Ensure this is the correct library for SortingState
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import UploadModel from '@/components/models/upload-model';

export default function UserContracts() {
  const { data: contracts } = useQuery<ContractAnalysis[]>({
    queryKey: ['user-contracts'],
    queryFn: () => fetchUserContracts(),
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const columns: ColumnDef<ContractAnalysis>[] = [
    {
      accessorKey: '_id',
      header: ({ column }) => {
        return <Button>Contract ID</Button>;
      },
      cell: ({ row }) => (
        <div className='font-medium'>{row.getValue<string>('_id')}</div>
      ),
    },
    {
      accessorKey: 'overallScore',
      header: ({ column }) => {
        return <Button>Overall Score</Button>;
      },
      cell: ({ row }) => {
        const score = parseFloat(row.getValue('overallScore'));
        return <Badge>{score.toFixed(2)} Overall Score</Badge>;
      },
    },
  ];

  const totalContracts = contracts?.length || 0;

  return (
    <div className='container mx-auto p-6 space-y-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Your Contracts</h1>
        <Button onClick={() => setIsUploadModalOpen(true)}>New Contract</Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Contracts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold '>{totalContracts}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

async function fetchUserContracts(): Promise<ContractAnalysis[]> {
  const response = await api.get('/contracts/user-contracts');
  return response.data;
}

{
  /* <UploadModel
isOpen={isUploadModalOpen}
onClose={() => setIsUploadModalOpen(false)}
onUploadComplete={() => setIsUploadModalOpen(true)}
/> */
}
