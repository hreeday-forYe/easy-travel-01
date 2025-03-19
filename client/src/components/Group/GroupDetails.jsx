import { useState } from "react";
import { useGetGroupQuery } from "@/app/slices/groupApiSlice";
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

const GroupDetails = ({ isView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const { data, isLoading, isError } = useGetGroupQuery();

  // Process the query data
  const group = Array.isArray(data?.data) ? data.data : [];
  const getData = [...group].reverse();

  // Handle loading state
  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (isError || getData.length === 0) {
    return <div className="p-6">No budget data available</div>;
  }

  // Function to handle opening the sheet with a specific budget
  const handleViewDetails = () => {
    // setSelectedBudget(budget);
    setIsOpen(true);
  };

  return (
    <div>
      <div>
        {Array.isArray(isView) && isView.length > 0 && (
          <div>
            <Button onClick={() => handleViewDetails(isView[0])}>
              View Details
            </Button>
          </div>
        )}
      </div>

      {/* Sheet for selected budget details */}
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <SheetContent className="w-full sm:max-w-md">
          {selectedBudget && (
            <>
              <SheetHeader>
                <SheetTitle>Trip Budget Details</SheetTitle>
                <SheetDescription>
                  View and manage the budget for your trip to{" "}
                  {selectedBudget.trip.destination}.
                </SheetDescription>
              </SheetHeader>

              {/* Budget Overview */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Total Budget
                  </span>
                  <span className="text-lg font-semibold">
                    {selectedBudget.currency} {selectedBudget.budget}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Total Expenses
                  </span>
                  <span className="text-lg font-semibold">
                    {selectedBudget.currency} {selectedBudget.totalExpenses}
                  </span>
                </div>
              </div>

              {/* Trip Details */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Trip Details</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Destination</span>
                    <span className="text-sm font-medium">
                      {selectedBudget.trip.destination}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Start Date</span>
                    <span className="text-sm font-medium">
                      {new Date(
                        selectedBudget.trip.startDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">End Date</span>
                    <span className="text-sm font-medium">
                      {new Date(
                        selectedBudget.trip.endDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <Badge
                      variant={
                        selectedBudget.trip.status === "planning"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {selectedBudget.trip.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Members List */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Members</h3>
                <div className="mt-2 space-y-2">
                  {selectedBudget.members.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.user.avatar} />
                          <AvatarFallback>
                            {member.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {member.user.name}
                        </span>
                      </div>
                      <Badge
                        variant={
                          member.role === "admin" ? "default" : "outline"
                        }
                      >
                        {member.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default GroupDetails;
