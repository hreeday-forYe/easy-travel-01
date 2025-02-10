import { useState } from "react";
import { useForm } from "react-hook-form";
import { Search, Plus } from "lucide-react";
import ItemCard from "./DmsCard";
import Nav from "./Nav";

const initialItems = [
  {
    id: 1,
    name: "Premium Electronics",
    category: "Electronics",
    status: "In Stock",
    quantity: 150,
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: 2,
    name: "Organic Food Package",
    category: "Food",
    status: "Low Stock",
    quantity: 50,
    image:
      "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&q=80&w=500",
  },
  {
    id: 3,
    name: "Fashion Apparels",
    category: "Clothing",
    status: "In Stock",
    quantity: 200,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=500",
  },
];

function AddDms() {
  const [items, setItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setItems([
      ...items,
      { ...data, id: items.length + 1, quantity: Number(data.quantity) },
    ]);
    setShowAddModal(false);
    reset();
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Nav />
      <div className="mt-20">
        {/* Hero Section */}
        <div className="relative text-white">
          <div className="absolute inset-0 overflow-hidden bg-gradient-to-r from-[#4c4fcd] to-[#4338CA]/100 mix-blend-multiply">
            <img
              src="https://img.freepik.com/free-photo/view-inside-new-warehouse-mezzanine-floor-looking-into-hall_181624-25949.jpg?t=st=1739170905~exp=1739174505~hmac=149ab3344c6955d9f15ea76c1a1ce493d60dbdc7a9058d7806a7f9614ad86f8f&w=1060"
              alt="Distribution"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Distribution Management System
            </h1>
            <p className="mt-6 text-xl max-w-3xl">
              Streamline your distribution process with our powerful management
              system.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search and Add */}
          <div className="flex justify-between items-center mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus size={20} /> Add New Item
            </button>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </div>
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                  {...register("name", { required: "Item name is required" })}
                  type="text"
                  placeholder="Item Name"
                  className="w-full p-2 border rounded"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}

                <input
                  {...register("category", {
                    required: "Category is required",
                  })}
                  type="text"
                  placeholder="Category"
                  className="w-full p-2 border rounded"
                />
                {errors.category && (
                  <p className="text-red-500">{errors.category.message}</p>
                )}

                <input
                  {...register("status", { required: "Status is required" })}
                  type="text"
                  placeholder="Status"
                  className="w-full p-2 border rounded"
                />
                {errors.status && (
                  <p className="text-red-500">{errors.status.message}</p>
                )}

                <input
                  {...register("quantity", {
                    required: "Quantity is required",
                    min: { value: 0, message: "Quantity must be Positive" },
                  })}
                  type="number"
                  min="0"
                  placeholder="Quantity"
                  className="w-full p-2 border rounded"
                />
                {errors.quantity && (
                  <p className="text-red-500">{errors.quantity.message}</p>
                )}

                <input
                  {...register("image")}
                  type="text"
                  placeholder="Image URL"
                  className="w-full p-2 border rounded"
                />

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AddDms;
