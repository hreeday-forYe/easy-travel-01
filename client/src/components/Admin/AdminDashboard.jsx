import {
  ChevronRight,
  Banknote,
  User,
  Users2,
  MapPinned,
  NotebookPen,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import {
  useGetUsersQuery,
  useGetJournalsQuery,
  useGetSettlementsQuery,
  useGetGroupsQuery,
} from "@/app/slices/adminApiSlice";

function AdminDashboard() {
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      processing: { color: "bg-blue-100 text-blue-800", label: "Processing" },
      shipped: { color: "bg-purple-100 text-purple-800", label: "Shipped" },
      delivered: { color: "bg-green-100 text-green-800", label: "Delivered" },
      rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
    };

    const config = statusConfig[status.toLowerCase()] || statusConfig.pending;

    return (
      <Badge className={`${config.color} hover:${config.color}`}>
        {config.label}
      </Badge>
    );
  };

  const navigate = useNavigate();
  const { data: userData } = useGetUsersQuery();
  const users = Array.isArray(userData?.users) ? userData.users : [];
  const filteredUsers = [...users].reverse().slice(0, 4);

  const { data: journalData } = useGetJournalsQuery();
  const journals = Array.isArray(journalData?.journals)
    ? journalData.journals
    : [];
  const filteredJournals = [...journals].reverse().slice(0, 4);

  const { data: groupData } = useGetGroupsQuery();
  const groups = Array.isArray(groupData?.groups) ? groupData.groups : [];

  const activeGroups = groups.filter(
    (group) => group.trip?.endDate && new Date(group.trip.endDate) > new Date()
  );

  const filteredGroups = [...activeGroups]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const { data: settlementData } = useGetSettlementsQuery();
  const settlements = Array.isArray(settlementData?.settlements)
    ? settlementData.settlements
    : [];
  const filteredSettlements = [...settlements].reverse().slice(0, 4);

  return (
    <ScrollArea className="flex-1 h-[calc(100vh-1px)]  ">
      <div>
        {/* Main Content */}
        <div className="m-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-1">
                Dashboard Overview
              </h2>
              <p className="text-gray-600">
                Welcome back, Admin! Here's what's happening today.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Total Users",
                value: users?.length,
                isPositive: true,
                icon: Users2,
                color: "blue",
              },
              {
                title: "Total Groups",
                value: groups?.length,
                change: "+8.2%",
                isPositive: true,
                icon: MapPinned,
                color: "green",
              },
              {
                title: "Total Journals",
                value: journals?.length,
                change: "-2.4%",
                isPositive: false,
                icon: NotebookPen,
                color: "yellow",
              },
              {
                title: "Total Settlements",
                value: settlements?.length,
                change: "-18.3%",
                isPositive: true,
                icon: Banknote,
                color: "red",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="stat-card border p-4 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <stat.icon className={`h-6 w-6 text-${stat.color}-500`} />
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">
                  {stat.title}
                </h3>
                <p className="text-3xl font-semibold text-gray-800">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Recent Activity and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent journals  */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Recent Journals
                </h3>
                <button
                  className="text-yellow-600 text-sm hover:text-yellow-700 font-medium flex items-center gap-1"
                  onClick={() => navigate("/admin/all-journals")}
                >
                  View All
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                {filteredJournals.map((journal, index) => {
                  return (
                    <div key={index} className="activity-item">
                      <div className="flex-1">
                        <div className="flex gap-4">
                          <h4 className="text-sm font-semibold text-gray-800 mb-0.5">
                            Journal #{journal._id.slice(-5).toUpperCase()}
                          </h4>
                          <span>-{journal.author.name}</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {journal.orderItems.length} item
                          {journal.orderItems.length !== 1 ? "s" : ""} • Total:
                          Rs. {journal.totalPrice.toFixed(2)}
                        </p>
                      </div>
                      {getStatusBadge(journal.status)}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Recent Settlements
                </h3>
                <button
                  className="text-yellow-600 text-sm hover:text-yellow-700 font-medium flex items-center gap-1"
                  onClick={() => navigate("/admin/settlements")}
                >
                  View All
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                {/* {recentPayments.map((payment) => (
                  <div
                    key={payment._id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{payment.paidBy.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Appointment Id:{" "}
                        <strong className="text-green-800">
                          {payment.appointment}
                        </strong>
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(payment.createdAt).toLocaleDateString()}
                        <CreditCard className="h-4 w-4 ml-2" />
                        {payment.paymentMethod}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        Rs.{payment.amount}
                      </p>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))} */}
              </div>
            </Card>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Recent Active Travel Groups
                </h3>
                <button
                  className="text-yellow-600 text-sm hover:text-yellow-700 font-medium flex items-center gap-1"
                  onClick={() => navigate("/admin/all-groups")}
                >
                  View All
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                {/* {recentPayments.map((payment) => (
                  <div
                    key={payment._id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{payment.paidBy.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Appointment Id:{" "}
                        <strong className="text-green-800">
                          {payment.appointment}
                        </strong>
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(payment.createdAt).toLocaleDateString()}
                        <CreditCard className="h-4 w-4 ml-2" />
                        {payment.paymentMethod}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        Rs.{payment.amount}
                      </p>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

export default AdminDashboard;
