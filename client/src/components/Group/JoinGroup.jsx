import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {  Key, Users2 } from "lucide-react";

const JoinGroup = () => {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the code verification
    console.log("Submitted code:", code);
    setOpen(false); // Close dialog after submission
    setCode(""); // Reset code
  };

  return (
    <div className="  bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Users2 /> Join Group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white rounded-xl shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center">
                <Key className="mr-3 text-blue-600" /> Group Access
              </DialogTitle>
              <DialogDescription className="text-center text-gray-600">
                Enter your 6-digit group invitation code
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 p-4">
              <div className="flex flex-col items-center space-y-4">
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={(value) => setCode(value)}
                  className="w-full"
                >
                  <InputOTPGroup className="flex justify-center space-x-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="w-12 h-16 text-2xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                <p className="text-sm text-gray-500 text-center italic">
                  Tip: Paste or type your 6-character code
                </p>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={code.length !== 6}
              >
                Join Group
              </Button>
            </form>
    {/* {groupInfo ? ( */}

              {/* <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold">
                    {groupStatus === "already"
                      ? "Already in Group"
                      : "Group Details"}
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground mt-2">
                    {groupStatus === "already"
                      ? "You are already a member of this group"
                      : "Review the group details before joining"}
                  </DialogDescription>
                </DialogHeader>
 
                <div className="grid gap-6 py-6">
                  <Card className="border-none shadow-none">
                    <CardContent className="space-y-6 p-0">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Group Name
                        </Label>
                        <div className="rounded-lg border bg-muted/50 p-3">
                          <p className="text-base font-medium">
                            {groupInfo.name}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">
                            Members
                          </Label>
                          <div className="rounded-lg border bg-muted/50 p-3 flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <p className="text-base font-medium">
                              {groupInfo.members}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-muted-foreground">
                            Status
                          </Label>
                          <div className="rounded-lg border bg-muted/50 p-3 flex items-center gap-2">
                            <Badge
                              variant={
                                groupStatus === "already"
                                  ? "secondary"
                                  : "default"
                              }
                            >
                              {groupStatus === "already"
                                ? "Member"
                                : "Not Joined"}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Description
                        </Label>
                        <div className="rounded-lg border bg-muted/50 p-3">
                          <p className="text-base text-muted-foreground leading-relaxed">
                            {groupInfo.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <DialogFooter className="flex justify-end gap-2 pt-2">
                    {groupStatus === "new" && (
                      <Button
                        onClick={handleJoin}
                        className="bg-primary hover:bg-primary/90"
                        size="lg"
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Join Group
                      </Button>
                    )}
                    <Button onClick={handleCancel} variant="outline" size="lg">
                      {groupStatus === "already" ? "Close" : "Cancel"}
                    </Button>
                  </DialogFooter>
                </div>
              </> */}
            {/* )} */}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default JoinGroup;
