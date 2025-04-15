import { ContractAnalysis } from '@/interfaces/contract.interface';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'; // Ensure this is the correct library for SortingState
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import UploadModel from '@/components/models/upload-model';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { get } from 'http';

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

  const table = useReactTable({
    data: contracts || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const totalContracts = contracts?.length || 0;
  const averageScore =
    totalContracts > 0
      ? (contracts?.reduce(
          (sum, contract) => sum + (contract.overallScore ?? 0),
          0
        ) ?? 0) / totalContracts
      : 0;

  const highRiskContracts =
    contracts?.filter((contract) =>
      contract.risks.some((risk) => risk.severity === 'high')
    ).length ?? 0;

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
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold '>{averageScore.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              High Risk Contracts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold '>{highRiskContracts}</div>
          </CardContent>
        </Card>
      </div>
      <div className='rounded-mc border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No contracts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4 '>
        <Button
          variant={'outline'}
          size={'sm'}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant={'outline'}
          size={'sm'}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <UploadModel
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={() => setIsUploadModalOpen(true)}
      />
    </div>
  );
}

async function fetchUserContracts(): Promise<ContractAnalysis[]> {
  const response = await api.get('/contracts/user-contracts');
  return response.data;
}
