import { useState } from "react";
import { useAddOrRemoveMembersMutation } from "@/app/slices/groupApiSlice";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const GroupDetails = ({ isView }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const { data: groupData, isLoading, isError } = useGetGroupQuery();
  const [removeMembers, { isLoading, isError }] =
    useAddOrRemoveMembersMutation();

  // Ensure data is available before proceeding
  // if (isLoading) {
  //   return <div className="p-6">Loading...</div>;
  // }

  // if (isError || !groupData || groupData.length === 0) {
  //   return <div className="p-6">No group data available</div>;
  // }

  // Function to handle opening the sheet
  const handleViewDetails = () => {
    setIsOpen(true);
  };
  console.log(isView);
  const userdata = useSelector((state) => state.auth?.user?._id);

  const handleRemoveMembers = async (groupId, userId) => {
    // API call
    try {
      const response = await removeMembers({ groupId, userId }).unwrap();
      if (response.success) {
        toast.success("Member removed sucessfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      {isView.length != 0 && (
        <Button onClick={handleViewDetails}>View Details</Button>
      )}

      {/* Sheet for selected group details */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Group Details</SheetTitle>
            <SheetDescription>
              View and manage group details below.
            </SheetDescription>
          </SheetHeader>

          {console.log(isView)}
          {/* Members List */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Members</h3>
            <div className="mt-2 space-y-2">
              {isView?.group?.members.map((member) => (
                <div className="flex items-center gap-2" key={member.user._id}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="{member.user?.avatar?.url}">
                      {" "}
                    </AvatarImage>
                    <AvatarFallback>
                      {member.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {member.user.name}
                  </span>

                  {/* {member.user?.role === "admin" && (
                    <Button variant="destructive">Remove User</Button>
                  )} */}
                  {isView?.group?.creator._id.toString() ===
                    userdata.toString() &&
                    member.role !== "admin" && (
                      <Button
                        variant="destructive"
                        onClick={() =>
                          handleRemoveMembers(
                            isView?.group?._id,
                            member.user._id
                          )
                        }
                      >
                        Remove User
                      </Button>
                    )}
                  <Badge
                    variant={member.role === "admin" ? "default" : "outline"}
                  >
                    {member.role}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default GroupDetails;
