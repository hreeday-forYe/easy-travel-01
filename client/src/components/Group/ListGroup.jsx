import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, User, AlertCircle } from "lucide-react";
import { useGetGroupQuery } from "@/app/slices/groupApiSlice";
import { Link } from "react-router-dom";

function ListGroup() {
  const { data } = useGetGroupQuery();
  const group = Array.isArray(data?.data) ? data.data : [];
  const getData = [...group].reverse();

  return (
    <> 
    <h1 className="text-xl font-semibold  pb-5 mx-10">My Groups</h1>
    <ScrollArea className="h-[calc(100vh-130px)] ">
      
      <div className="min-h-screen bg-gray-50 gap-1  ">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
          {/* Expense List */}
          <div className="bg-white  shadow overflow-hidden sm:rounded-md  ">
            <ul className="divide-y-4 divide-red-100 ">
              {getData.map((expense) => (
                <li key={expense._id} className="">
                  <Link
                    to={`/groups/${expense._id}`}
                    className="px-4 py-4 sm:px-6  "
                  >
                    <div className="px-4 py-4 sm:px-6  ">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="">
                            <h3 className="text-lg font-medium text-gray-900">
                              {expense.name.charAt(0).toUpperCase() +
                                expense.name.slice(1)}
                            </h3>
                            <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <User className="flex-shrink-0 mr-1.5 h-4 w-4" />
                                <p>Created by : {expense.creator.name}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                            {expense.budget} {expense.currency}
                          </span>
                          <span className="bg-blue-100 rounded-lg p-1 text-sm font-light">
                            {expense.trip.destination}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex space-x-6">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-green-400" />
                            {new Date(
                              expense.trip.startDate
                            ).toLocaleDateString()}
                          </div>

                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-amber-500" />
                            {new Date(
                              expense.trip.endDate
                            ).toLocaleDateString()}
                          </div>
                        </div>
                        {expense.notes && (
                          <div className="mt-2 sm:mt-0 text-sm text-gray-500">
                            <AlertCircle className="flex-shrink-0 mr-1.5 h-4 w-4" />
                            {expense.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </ScrollArea>
    </>

  );
}

export default ListGroup;
