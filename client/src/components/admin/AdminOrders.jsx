import React, { useState } from "react";
import {
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  ShoppingCart,
  PackageCheck,
  RefreshCw,
} from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-12345",
      customer: "John Doe",
      status: "Pending",
      total: 249.98,
      date: "2024-03-15",
      email: "john.doe@example.com",
      items: 3,
    },
    {
      id: "ORD-12346",
      customer: "Jane Smith",
      status: "Shipped",
      total: 149.99,
      date: "2024-03-14",
      email: "jane.smith@example.com",
      items: 2,
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const getStatusIcon = (status) => {
    const statusIcons = {
      Pending: <Clock className="text-yellow-500 w-5 h-5" />,
      Shipped: <PackageCheck className="text-green-500 w-5 h-5" />,
      Cancelled: <XCircle className="text-red-500 w-5 h-5" />,
      Completed: <CheckCircle className="text-blue-500 w-5 h-5" />,
    };
    return (
      statusIcons[status] || <ShoppingCart className="text-gray-500 w-5 h-5" />
    );
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setEditModalOpen(true);
  };

  const handleDeleteOrder = (order) => {
    setSelectedOrder(order);
    setDeleteModalOpen(true);
  };

  const updateOrderStatus = (newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      )
    );
    setEditModalOpen(false);
  };

  const deleteOrder = () => {
    setOrders(orders.filter((order) => order.id !== selectedOrder.id));
    setDeleteModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="flex justify-between items-center bg-gray-50 p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <ShoppingCart className="mr-3 text-blue-600" />
            Orders Management
          </h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center">
            <RefreshCw className="mr-2 w-4 h-4" /> Refresh Orders
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-gray-600">Order ID</th>
                <th className="p-4 text-gray-600">Customer</th>
                <th className="p-4 text-gray-600">Status</th>
                <th className="p-4 text-gray-600">Total</th>
                <th className="p-4 text-gray-600">Date</th>
                <th className="p-4 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <div className="font-semibold">{order.customer}</div>
                        <div className="text-xs text-gray-500">
                          {order.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span className="ml-2">{order.status}</span>
                    </div>
                  </td>
                  <td className="p-4 font-semibold">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="p-4 text-gray-600">{order.date}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditOrder(order)}
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded-full"
                        title="Edit Order"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                        title="Delete Order"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Edit Order Modal */}
      {editModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Edit Order</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Order Status
                </label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["Pending", "Shipped", "Completed", "Cancelled"].map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() => updateOrderStatus(status)}
                        className={`py-2 rounded-lg flex items-center justify-center ${
                          selectedOrder.status === status
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {getStatusIcon(status)}
                        <span className="ml-2">{status}</span>
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96">
            <h3 className="text-xl font-bold mb-4 text-red-600">
              Delete Order
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete order {selectedOrder.id}?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={deleteOrder}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
