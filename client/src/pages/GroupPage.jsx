import { ListGroup, SideBar, AddGroup } from "../components/index";

const GroupListPage = () => {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="w-full">
          <AddGroup />
          <ListGroup />
        </div>
      </div>
    </>
  );
};

export default GroupListPage;
