import { SideBar } from ".."
import AddGroup from "./AddGroup"

const Group = () => {
  return (
   <>
  <div className="flex min-h-screen bg-background">
        <SideBar />
        <div className=" px-10 py-8">
        <AddGroup/>
        </div>
      </div>
   </>
  )
}

export default Group