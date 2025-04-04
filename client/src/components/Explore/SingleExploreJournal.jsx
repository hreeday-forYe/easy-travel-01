import { useParams } from "react-router-dom";
import { useGetPublicJournalQuery } from "@/app/slices/journalApiSlice";
import { useSelector } from "react-redux";
import JournalList from "../JournalLIst"; // Your new reusable component

function SingleExploreJournal() {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);

  const { data, isLoading, error } = useGetPublicJournalQuery();

  const journal = data?.allJournals?.find((j) => j._id === id);
  const isOwner = user?.id === journal?.userId;

  return (
    <JournalList
      journal={journal}
      isOwner={isOwner}
      isLoading={isLoading}
      error={!!error}
      backLink="/journals"
    />
  );
}

export default SingleExploreJournal;
