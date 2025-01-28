import JournalList from "./journal_list";
import AddJournal from "./AddJournal";
import SideBar from "../SideBar";

const JournalPage = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <SideBar />
      <div className=" px-10 py-8">
        <AddJournal />
        <JournalList />
      </div>
    </div>
  );
};

export default JournalPage;
