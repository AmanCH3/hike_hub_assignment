
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { GroupsList } from "../components/grouplist"
import { Link } from "lucide-react"

export const metadata = {
  title: "Hiking Groups - HikeHub",
  description: "Join existing hiking groups or create your own to connect with fellow hikers",
}

export default function GroupsPage() {
  return (
    <main className="container mx-auto pt-5 pb-13 p-20">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Hiking Groups</h1>
            <p className="text-muted-foreground">Join existing hiking groups or create your own</p>
          </div>
          <Button asChild>
            <Link href="/groups/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Group
            </Link>
          </Button>
        </div>

        <GroupsList />
      </div>
    </main>
  )
}
