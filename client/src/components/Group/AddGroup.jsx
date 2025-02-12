import { useState } from "react";
import { useForm } from "react-hook-form";
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

import { PlusCircle } from "lucide-react";
import { toast } from "react-toastify";

import { useCreateGroupMutation } from "@/app/slices/groupApiSlice";
import { useGetGroupQuery } from "@/app/slices/groupApiSlice";
import GroupFormfield from "../GroupFormfield";

export default function AddGroup() {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [createGroup, { isLoading }] = useCreateGroupMutation();
  const { refetch } = useGetGroupQuery();

  const {
    control,
    getValues,
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    try {
      const addData = { ...data };
      const res = await createGroup(addData).unwrap();
      console.log("Group created:", res);
      refetch();
      toast.success("Group entry created successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error creating Group:", error);
      toast.error(error?.data?.message || "Failed to create Group entry");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-6">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Group
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[70vw] overflow-y-auto h-[520px]">
        <DialogHeader>
          <DialogTitle>Add New Group Entry</DialogTitle>
          <DialogDescription>
            Capture your thoughts, feelings, and moments. All fields help create
            a richer memory.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          encType="multipart/form-data"
        >
          <GroupFormfield
            control={control}
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />

          <DialogFooter>
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Group"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
