import { mockContracts } from "@/lib/mock-data"
import { ContractDetailClient } from "./contract-detail-client"
import { notFound } from "next/navigation"

export default async function ContractDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const contract = mockContracts.find((c) => c.id === id)

  if (!contract) {
    notFound()
  }

  return <ContractDetailClient contract={contract} />
}
