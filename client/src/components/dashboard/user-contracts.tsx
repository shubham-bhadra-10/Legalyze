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
} from '@tanstack/react-table';
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
import {
  ArrowUpDown,
  FileText,
  AlertTriangle,
  PieChart,
  MoreHorizontal,
  Trash,
  Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

export default function UserContracts() {
  const { data: contracts } = useQuery<ContractAnalysis[]>({
    queryKey: ['user-contracts'],
    queryFn: () => fetchUserContracts(),
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const contractTypesColors: { [key: string]: string } = {
    Employment: 'bg-blue-100 text-blue-900',
    Service: 'bg-green-100 text-green-800',
    'Professional Services Agreement': 'bg-red-100 text-green-800',
    Sales: 'bg-yellow-100 text-yellow-800',
    Lease: 'bg-purple-100 text-purple-800',
    Loan: 'bg-red-100 text-red-800',
    Rental: 'bg-orange-100 text-orange-800',
    Partnership: 'bg-teal-100 text-teal-800',
    'Non-Disclosure': 'bg-pink-100 text-pink-800',
    'Non-Compete': 'bg-gray-100 text-gray-800',
    Other: 'bg-indigo-100 text-indigo-800',
  };

  const columns: ColumnDef<ContractAnalysis>[] = [
    {
      accessorKey: '_id',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='hover:bg-gray-100 font-medium'
          >
            Contract ID
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className='font-medium'>{row.getValue<string>('_id')}</div>
      ),
    },
    {
      accessorKey: 'overallScore',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='hover:bg-gray-100 font-medium'
          >
            Overall Score
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        const score = parseFloat(row.getValue('overallScore'));
        let badgeColor = 'bg-red-100 text-red-800';

        if (score >= 7) {
          badgeColor = 'bg-green-100 text-green-800';
        } else if (score >= 4) {
          badgeColor = 'bg-yellow-100 text-yellow-800';
        }

        return (
          <Badge className={`${badgeColor} font-semibold`}>
            {score.toFixed(2)}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'contractType',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='hover:bg-gray-100 font-medium'
          >
            Contract Type
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        const contractType = row.getValue<string>('contractType') as string;
        const colorClass =
          contractTypesColors[contractType] || contractTypesColors['Other'];
        return (
          <Badge className={cn('rounded-md', colorClass)}>{contractType}</Badge>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const contract = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='size-8 p-0 rounded-full hover:bg-gray-100 transition-colors'
              >
                <span className='sr-only'>Open Menu</span>
                <MoreHorizontal className='size-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='w-48 p-1 bg-white shadow-md border border-gray-200'
            >
              <DropdownMenuItem className='px-3 py-2 text-sm rounded-md hover:bg-blue-50 cursor-pointer'>
                <Link
                  href={`/dashboard/contract/${contract._id}`}
                  className='w-full text-gray-700 flex items-center'
                >
                  <Eye className='mr-2 h-4 w-4' />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className='h-px my-1 bg-gray-200' />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                    }}
                    className='px-3 py-2 text-sm rounded-md hover:bg-red-50 cursor-pointer'
                  >
                    <span className='text-red-600 flex items-center'>
                      <Trash className='mr-2 h-4 w-4' />
                      Delete Contract
                    </span>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent className='max-w-md rounded-lg border border-gray-200 p-6 shadow-lg bg-white'>
                  <AlertDialogHeader className='space-y-2'>
                    <AlertDialogTitle className='text-xl font-semibold text-gray-900'>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className='text-sm text-gray-600 leading-relaxed'>
                      This action cannot be undone. This will permanently delete
                      your contract and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className='mt-6 flex gap-3 justify-end'>
                    <AlertDialogCancel className='rounded-md px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-colors'>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction className='rounded-md px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors'>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        );
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
        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
          Your Contracts
        </h1>
        <Button className="bg-[#1a202c] text-white" onClick={() => setIsUploadModalOpen(true)}>New Contract</Button> 
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card className='overflow-hidden border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50 border-b'>
            <CardTitle className='text-sm font-medium text-gray-700'>
              Total Contracts
            </CardTitle>
            <FileText className='h-5 w-5 text-blue-500' />
          </CardHeader>
          <CardContent className='pt-6'>
            <div className='text-3xl font-bold text-gray-900'>
              {totalContracts}
            </div>
            <p className='text-sm text-gray-500 mt-2'>
              All contracts in your portfolio
            </p>
          </CardContent>
        </Card>

        <Card className='overflow-hidden border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50 border-b'>
            <CardTitle className='text-sm font-medium text-gray-700'>
              Average Score
            </CardTitle>
            <PieChart className='h-5 w-5 text-green-500' />
          </CardHeader>
          <CardContent className='pt-6'>
            <div className='text-3xl font-bold text-gray-900'>
              {averageScore.toFixed(2)}
            </div>
            <p className='text-sm text-gray-500 mt-2'>
              Overall portfolio health
            </p>
          </CardContent>
        </Card>

        <Card className='overflow-hidden border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50 border-b'>
            <CardTitle className='text-sm font-medium text-gray-700'>
              High Risk Contracts
            </CardTitle>
            <AlertTriangle className='h-5 w-5 text-red-500' />
          </CardHeader>
          <CardContent className='pt-6'>
            <div className='text-3xl font-bold text-gray-900'>
              {highRiskContracts}
            </div>
            <p className='text-sm text-gray-500 mt-2'>
              Contracts requiring attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='rounded-lg border border-gray-200 shadow-sm overflow-hidden'>
        <Table>
          <TableHeader className='bg-gray-50'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='border-b'>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className='py-3 px-4'>
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
                  className='hover:bg-gray-50 border-b transition-colors'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='py-3 px-4'>
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
                  className='h-24 text-center text-gray-500'
                >
                  No contracts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className='border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50'
        >
          Previous
        </Button>
        <div className='text-sm text-gray-600'>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className='border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50'
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
