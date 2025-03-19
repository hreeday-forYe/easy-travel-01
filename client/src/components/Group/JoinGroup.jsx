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
import {
  ArrowBigLeft,
  Calendar,
  Clock,
  Crown,
  Key,
  MapPin,
  Users,
  Users2,
  Wallet,
  Receipt,
} from "lucide-react";
// import {
//   MapPin,
//   Clock,
//   Users,
//   Calendar,
//   Crown,
//   Users2,
//   ArrowBigLeft,
// } from 'lucide-react';

import {
  useGetGroupQuery,
  useJoinGroupMutation,
  useVerifyCodeMutation,
} from "@/app/slices/groupApiSlice";

import { toast } from "react-toastify";
import { Badge } from "../ui/badge";

const JoinGroup = () => {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [groupInfo, setGroupInfo] = useState({});

  const [verifyCode, { isError: verifyError, isLoading: verifyLoading }] =
    useVerifyCodeMutation();
  const [joinGroup, { isLoading: joinLoading }] = useJoinGroupMutation();
  const { refetch } = useGetGroupQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyCode({ joinCode: code }).unwrap();
      console.log(res);
      if (res.success) {
        setGroupInfo({
          ...res.group,
          groupStatus: res.isMember,
        });
      }
    } catch (error) {
      toast.error(error.data?.message || "Failed to verify code");
    }
  };

  const joinGroupHandler = async (groupId) => {
    try {
      const res = await joinGroup({ groupId }).unwrap();
      console.log(res);
      if (res.success) {
        setGroupInfo((prevState) => ({
          ...prevState,
          groupStatus: true,
        }));
        setOpen(false);
        toast.success("Successfully joined the group!");
      }
    } catch (error) {
      toast.error(error.data?.message || "Failed to join group");
    } finally {
      refetch();
    }
  };

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      setGroupInfo({});
      setCode("");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <div>
              <Button>
                <Users2 className="mr-2" /> Join Group
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-[650px] h-full bg-white rounded-xl shadow-2xl">
            {Object.keys(groupInfo).length === 0 ? (
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center">
                  <Key className="mr-3 text-blue-600" /> Group Access
                </DialogTitle>
                <DialogDescription className="text-center text-gray-600">
                  Enter your 6-digit group invitation code
                </DialogDescription>
              </DialogHeader>
            ) : (
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center ">
                  <Users className="mr-3 text-blue-600" /> Group Details
                </DialogTitle>
              </DialogHeader>
            )}

            {Object.keys(groupInfo).length === 0 ? (
              <form onSubmit={handleSubmit} className="space-y-3 p-4">
                <div className="flex flex-col items-center space-y-4">
                  <InputOTP
                    maxLength={10}
                    value={code}
                    onChange={(value) => setCode(value)}
                    className="w-full"
                    disabled={verifyLoading || joinLoading}
                  >
                    <InputOTPGroup className="flex justify-center space-x-2">
                      {Array.from({ length: 10 }).map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="w-12 h-16 text-2xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                  <p className="text-sm text-gray-500 text-center italic">
                    Tip: Paste or type your 10-character code
                  </p>
                </div>
                {verifyError && (
                  <div className="text-center py-4 text-red-600">
                    <p>Invalid or Expired Join code</p>
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={code.length !== 10 || verifyLoading || joinLoading}
                >
                  {verifyLoading ? "Verifying..." : "Verify Code"}
                </Button>
              </form>
            ) : (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 ">
                <div className="max-w-4xl mx-auto">
                  {/* Header Card */}
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="mb-6 md:mb-0">
                          <h1 className="text-3xl font-bold text-white mb-3">
                            {groupInfo.name}
                          </h1>
                          <div className="flex items-center space-x-2 text-blue-100">
                            <MapPin className="h-5 w-5" />
                            <span className="text-lg">
                              {groupInfo.trip.destination}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-3">
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                            <div className="flex items-center space-x-2 text-blue-100 mb-1">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                JOIN CODE
                              </span>
                            </div>
                            <p className="text-2xl font-mono font-bold text-white tracking-wider">
                              {groupInfo.joinCode}
                            </p>
                          </div>
                          <span
                            className={`px-4 py-1 rounded-full text-sm font-medium ${
                              groupInfo.groupStatus
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {groupInfo.groupStatus ? "Member" : "Not Joined"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 transform hover:scale-105 transition-transform duration-200">
                        <h3 className="text-blue-600 font-medium mb-2">
                          Budget
                        </h3>
                        <p className="text-2xl font-bold text-blue-900">
                          {groupInfo.currency}{" "}
                          {groupInfo.budget.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 transform hover:scale-105 transition-transform duration-200">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-indigo-600 font-medium">
                            Members
                          </h3>
                          <Users className="h-5 w-5 text-indigo-600" />
                        </div>
                        <p className="text-2xl font-bold text-indigo-900">
                          {groupInfo.members?.length}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 transform hover:scale-105 transition-transform duration-200">
                        <h3 className="text-purple-600 font-medium mb-2">
                          Total Expenses
                        </h3>
                        <p className="text-2xl font-bold text-purple-900">
                          {groupInfo.currency}{" "}
                          {groupInfo.totalExpenses.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Trip Details Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <div className="flex items-center space-x-2 mb-6">
                      <Calendar className="h-6 w-6 text-blue-600" />
                      <h2 className="text-xl font-bold text-gray-900">
                        Trip Duration
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                      <div className="bg-blue-50 rounded-xl p-4">
                        <p className="text-sm text-blue-600 font-medium mb-1">
                          Start Date
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {formatDate(groupInfo.trip?.startDate)}
                        </p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-4">
                        <p className="text-sm text-blue-600 font-medium mb-1">
                          End Date
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {formatDate(groupInfo.trip?.endDate)}
                        </p>
                      </div>
                    </div>
                    <button
                      className={`w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200 ${
                        (verifyLoading || joinLoading) &&
                        "opacity-75 cursor-not-allowed"
                      }`}
                      disabled={verifyLoading || joinLoading}
                      onClick={() =>
                        !groupInfo.groupStatus &&
                        joinGroupHandler(groupInfo._id)
                      }
                    >
                      {groupInfo.groupStatus ? (
                        <>
                          <ArrowBigLeft className="h-5 w-5" />
                          <span>Back to Dashboard</span>
                        </>
                      ) : (
                        <>
                          <Users2 className="h-5 w-5" />
                          <span>Join Group</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Members List Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center space-x-2 mb-6">
                      <Users className="h-6 w-6 text-blue-600" />
                      <h2 className="text-xl font-bold text-gray-900">
                        Group Members
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {groupInfo.members?.map((member, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 rounded-full p-2">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-semibold text-gray-900">
                                  User {member.user.slice(-6)}
                                </p>
                                {member.role === "admin" && (
                                  <Crown className="h-4 w-4 text-yellow-500" />
                                )}
                              </div>
                              <p className="text-sm text-gray-500">
                                Joined{" "}
                                {new Date(member.joinedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-4 py-1 rounded-full text-sm font-medium ${
                              member.role === "admin"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {member.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default JoinGroup;
