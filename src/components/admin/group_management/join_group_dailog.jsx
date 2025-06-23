"use client"


import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, AlertCircle, CheckCircle2 } from "lucide-react"

// interface JoinGroupDialogProps {
//   groupTitle?: string
//   currentSize?: number
//   maxSize?: number
//   difficulty?: string
//   requirements?: string[] //  <-- now optional
//   onJoin?: (message?: string) => void
//   children?: React.ReactNode //  <-- allow optional children
//   open?: boolean //  <-- external control (used by GroupCard)
//   setOpen?: (open: boolean) => void //  <-- setter from parent
// }

export function JoinGroupDialog({
  groupTitle,
  currentSize,
  maxSize,
  difficulty,
  requirements,
  onJoin,
  children,
  open,
  setOpen,
}) {
  const [internalOpen, setInternalOpen] = useState(open ?? false)

  // keep local state in sync with parent-controlled `open`
  useEffect(() => {
    if (open !== undefined) {
      setInternalOpen(open)
    }
  }, [open])

  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const safeRequirements = requirements ?? []
  const isGroupFull = (currentSize ?? 0) >= (maxSize ?? Number.MAX_SAFE_INTEGER)

  const handleJoin = async () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      onJoin?.(message)
      setIsLoading(false)
      setInternalOpen(false)
      setOpen?.(false)
      setMessage("")
    }, 1000)
  }

  return (
    <Dialog
      open={internalOpen}
      onOpenChange={(val) => {
        setInternalOpen(val)
        setOpen?.(val)
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Join Hiking Group
          </DialogTitle>
          <DialogDescription>You're about to join "{groupTitle ?? "this hike"}"</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Group Status */}
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <div className="font-medium">Group Status</div>
              <div className="text-sm text-muted-foreground">
                {currentSize ?? 0}/{maxSize ?? "?"} participants
              </div>
            </div>
            <Badge variant={isGroupFull ? "destructive" : "default"}>{isGroupFull ? "Full" : "Available"}</Badge>
          </div>

          {/* Difficulty Level */}
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <div className="font-medium">Difficulty Level</div>
              <div className="text-sm text-muted-foreground">Make sure you're prepared</div>
            </div>
            <Badge
              variant={difficulty === "Easy" ? "default" : difficulty === "Moderate" ? "secondary" : "destructive"}
            >
              {difficulty ?? "Unknown"}
            </Badge>
          </div>

          {/* Requirements */}
          {safeRequirements.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Requirements & Recommendations</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {safeRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Group Warning */}
          {isGroupFull && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This group is currently full. You'll be added to the waitlist and notified if a spot becomes available.
              </AlertDescription>
            </Alert>
          )}

          {/* Optional Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message to Group Leader {!isGroupFull && "(Optional)"}</Label>
            <Textarea
              id="message"
              placeholder={
                isGroupFull
                  ? "Tell the group leader why you'd like to join this hike..."
                  : "Introduce yourself or ask any questions..."
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setInternalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleJoin} disabled={isLoading}>
            {isLoading ? "Joining..." : isGroupFull ? "Join Waitlist" : "Join Group"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
