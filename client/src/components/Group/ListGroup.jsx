import { Calendar, Tag, User, CreditCard, FileText, AlertCircle } from 'lucide-react';

const getStatusColor = (status) => {
  switch (status) {
    case 'settled':
      return 'bg-green-100 text-green-800';
    case 'disputed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-yellow-100 text-yellow-800';
  }
};

const ListGroup = ({ expenses }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {expenses.map((expense) => (
          <li key={expense._id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={expense.paidBy.user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'}
                      alt={expense.paidBy.user.name}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{expense.description}</h3>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="flex-shrink-0 mr-1.5 h-4 w-4" />
                        <p>Paid by {expense.paidBy.user.name}</p>
                      </div>
                      {expense.paidBy.paymentMethod && (
                        <div className="flex items-center">
                          <CreditCard className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          <p className="capitalize">{expense.paidBy.paymentMethod}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {expense.amount.value} {expense.amount.currency}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                    {expense.status}
                  </span>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex space-x-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <Tag className="flex-shrink-0 mr-1.5 h-4 w-4" />
                    <span className="capitalize">{expense.category}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4" />
                    {new Date(expense.date).toLocaleDateString()}
                  </div>
                  {expense.receipt?.url && (
                    <div className="flex items-center text-sm text-indigo-600 hover:text-indigo-500">
                      <FileText className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      <a href={expense.receipt.url} target="_blank" rel="noopener noreferrer">
                        View Receipt
                      </a>
                    </div>
                  )}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <div className="flex -space-x-1 overflow-hidden">
                    {expense.splitBetween.map((split) => (
                      <img
                        key={split.user._id}
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                        src={`https://images.unsplash.com/photo-${split.user._id}?w=50&h=50&fit=crop`}
                        alt={split.user.name}
                      />
                    ))}
                  </div>
                  <span className="ml-2">Split between {expense.splitBetween.length} people</span>
                </div>
              </div>
              {expense.notes && (
                <div className="mt-2 flex items-start text-sm text-gray-500">
                  <AlertCircle className="flex-shrink-0 mr-1.5 h-4 w-4 mt-0.5" />
                  <p>{expense.notes}</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListGroup;