import { useParams, useNavigate } from "react-router-dom";
import {
  useGetJournalQuery,
  useDeleteJournalMutation,
} from "@/app/slices/journalApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import JournalList from "../JournalLIst"; // Your new reusable component

function SingleJournalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const { data, isLoading, error, refetch } = useGetJournalQuery();
  const [deleteJournal, { isLoading: isDeleting }] = useDeleteJournalMutation();

  const journal = data?.allJournals?.find((j) => j._id === id);
  const isOwner = user?.id === journal?.userId;

  const handleDelete = async () => {
    try {
      await deleteJournal(id).unwrap();
      refetch();
      toast.success("Journal deleted successfully");
      navigate("/journal");
    } catch (error) {
      toast.error("Failed to delete journal");
      console.error("Delete error:", error);
    }
  };

  return (
    <JournalList
      journal={journal}
      isOwner={isOwner}
      isLoading={isLoading}
      error={!!error}
      onDelete={handleDelete}
      isDeleting={isDeleting}
      backLink="/journal"
      editLink={isOwner ? `/journal/edit/${journal?._id}` : undefined}
    />
  );
}

export default SingleJournalDetail;
