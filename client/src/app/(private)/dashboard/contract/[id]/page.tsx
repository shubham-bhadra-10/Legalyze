import ContractResults from './_components/contract-results';


interface IContractResultsProps {
  params: {
    id: string;
  };
}

export default async function ContractPage({ params }: IContractResultsProps) {
  const { id } = await params
  return <ContractResults contractId={id} />;
}
