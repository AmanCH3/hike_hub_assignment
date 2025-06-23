
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { GroupsList } from "../components/grouplist"
import { Link } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GroupChat } from "../components/admin/group_management/group_chat"
import { GroupDetails } from "../components/admin/group_management/group_detail"

export const metadata = {
  title: "Hiking Groups - HikeHub",
  description: "Join existing hiking groups or create your own to connect with fellow hikers",
}

export default function GroupsPage() {
  return (
   <main className="container mx-auto pt-24 pb-16">
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="details">Group Details</TabsTrigger>
            <TabsTrigger value="chat">Group Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <GroupDetails groupId={params.id} />
          </TabsContent>

          <TabsContent value="chat">
            <GroupChat groupId={params.id} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
