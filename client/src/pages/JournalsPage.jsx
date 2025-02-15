import { SideBar, AddJournal,JournalList  } from "../components/index";

const JournalsPage = () => {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="w-full ">
        <AddJournal />
        <JournalList/>
        </div>
      </div>
    </>
  );
};

export default JournalsPage;
