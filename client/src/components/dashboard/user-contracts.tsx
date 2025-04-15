import { ContractAnalysis } from "@/interfaces/contract.interface"
import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";
import { ColumnDef, SortingState } from "@tanstack/react-table"; // Ensure this is the correct library for SortingState
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function UserContracts() {
    const {} = useQuery<ContractAnalysis[]>({
        queryKey: ["user-contracts"],
        queryFn:()=>fetchUserContracts(),

    });
    const [sorting,setSorting] = useState<SortingState>([]);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const columns: ColumnDef<ContractAnalysis>[] = [
        {
            accessorKey:"_id",
            header:({column}) =>{
                return(
                    <Button>Contract ID</Button>
                )
            },
            cell:({row})=>(
                <div className="font-medium">
                    {row.getValue<string>("_id")}
                </div>
            ),
        },
        {
            accessorKey:"overallScore",
            header:({column}) =>{
                return(
                    <Button>Overall Score</Button>
                )
            },
            cell: ({ row }) => {
                const score = parseFloat(row.getValue("overallScore"));
                return <Badge>
                    {score.toFixed(2)} Overall Score
                </Badge>
            },
        },
    ];
    return <div className="container mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">User Contracts</h1>
        </div>
    </div>
}

async function fetchUserContracts():Promise<ContractAnalysis[]> {
    const response = await api.get("/contract/user-contracts")
    return response.data
}