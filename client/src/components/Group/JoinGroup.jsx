import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Key, UserPlus, Users2 } from "lucide-react";
import { useVerifyCodeMutation } from "@/app/slices/groupApiSlice";
import { AlertDialogFooter } from "../ui/alert-dialog";
import { Label } from "../ui/label";

const JoinGroup = () => {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [detail, setDetail] = useState(false);

  const [verifyCode, { isError, isLoading }] = useVerifyCodeMutation();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyCode({ joinCode: code }).unwrap();
      console.log(res);
      if (res.success) {
        setDetail(true);
        // setGeneratedCode(res.data.code);
      }
    } catch (error) {
      console.log(error);
    }
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
          <DialogContent className="max-w-[650px] bg-white rounded-xl shadow-2xl">
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
                  maxLength={10}
                  value={code}
                  onChange={(value) => setCode(value)}
                  className="w-full"
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
                  Tip: Paste or type your 6-character code
                </p>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={code.length !== 10}
              >
                Join Group
              </Button>
            </form>

          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default JoinGroup;
