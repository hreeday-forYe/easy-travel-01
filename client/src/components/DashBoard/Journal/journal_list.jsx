import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  useGetJournalQuery,
  useDeleteJournalMutation,
} from "@/app/slices/journalSlice";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Pen, Trash2, Heart, MapPin, Tag } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";

export default function JournalList() {
  const user = useSelector((state) => state.auth.user);
  const { data, isLoading, error, refetch } = useGetJournalQuery();
  const [deleteJournal, { isLoading: isDeleting }] = useDeleteJournalMutation();

  const stripHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || ""; // Extract plain text from the HTML
  };
  const handleDelete = async (id) => {
    try {
      await deleteJournal(id).unwrap();
      refetch();
      toast.success("Journal deleted successfully");
    } catch (error) {
      toast.error("Failed to delete journal");
      console.error("Delete error:", error);
    }
  };
  // console.log(allJournals);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-xl font-semibold text-gray-700 dark:text-gray-300">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl font-semibold text-red-600 dark:text-red-400">
          Failed to load journals.
        </div>
      </div>
    );
  }

  const journals = Array.isArray(data?.allJournals) ? data.allJournals : [];

  if (journals.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-500">You have no journals yet.</p>
      </div>
    );
  }

  const reversedData = [...journals].reverse();

  return (
    <ScrollArea className="h-[calc(100vh-100px)]">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 p-6">
        {reversedData.map((journal) => {
          const isOwner = user?.id === journal.userId;

          return (
            <div
              className="w-full max-w-md mx-auto relative group"
              key={journal._id}
              style={{ animation: "fadeIn 0.5s ease-in-out" }}
            >
              <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 dark:bg-gray-900 dark:border dark:border-gray-700">
                <div className="relative">
                  <img
                    src={journal.images[0]?.url}
                    alt={journal.title}
                    width={600}
                    height={400}
                    className="w-full h-44 object-cover"
                    style={{ aspectRatio: "600/400", objectFit: "cover" }}
                  />
                  {/* Action Buttons Overlay - Only show for owner */}
                  {isOwner && (
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to={`/journal/edit/${journal._id}`}>
                        <Button
                          size="icon"
                          className="w-8 h-8 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-lg"
                          title="Edit Journal"
                        >
                          <Pen className="w-4 h-4" />
                        </Button>
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="destructive"
                            className="w-8 h-8 rounded-full shadow-lg"
                            title="Delete Journal"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your journal entry.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(journal._id)}
                              className="bg-red-600 hover:bg-red-700"
                              disabled={isDeleting}
                            >
                              {isDeleting ? "Deleting..." : "Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {journal.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {stripHtmlTags(journal.content.slice(0, 100))}...
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {journal.mood && (
                      <span className="inline-flex items-center px-3 py-1.5 bg-rose-50 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300 rounded-full">
                        <Heart className="w-4 h-4 mr-1.5" />
                        {journal.mood}
                      </span>
                    )}
                    {journal.location && (
                      <span className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-full">
                        <MapPin className="w-4 h-4 mr-1.5" />
                        {journal.location}
                      </span>
                    )}
                    {journal.tag && (
                      <span className="inline-flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 rounded-full">
                        <Tag className="w-4 h-4 mr-1.5" />
                        {journal.tag}
                      </span>
                    )}
                  </div>
                  <Link to={`/journal/${journal._id}`} className="block mt-4">
                    <Button className="w-full bg-[#FF9935] hover:bg-[#FF9935]/90 text-white dark:bg-indigo-500 dark:hover:bg-indigo-400">
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}