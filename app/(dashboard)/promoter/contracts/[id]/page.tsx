import { mockContracts } from "@/lib/mock-data"
import { ContractDetailClient } from "@/app/(dashboard)/artist/contracts/[id]/contract-detail-client"

export default async function PromoterContractDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const contract = mockContracts.find((c) => c.id === id) || mockContracts[0]

  return <ContractDetailClient contract={contract} userRole="promoter" />
}
