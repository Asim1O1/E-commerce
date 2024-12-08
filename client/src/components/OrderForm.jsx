import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../features/order/orderSlice";

const OrderForm = () => {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");

  const dispatch = useDispatch();
  const { isLoading, error, order } = useSelector((state) => state.order);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    const orderDetails = {
      items: [{ productId: "123", quantity }], // Replace with dynamic product ID
      paymentMethod,
      notes,
    };

    dispatch(createOrder({ orderDetails }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Complete Your Order
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Quantity Adjustment */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Quantity</label>
          <div className="flex items-center">
            <button
              type="button"
              className="bg-gray-200 px-3 py-1 rounded-l hover:bg-gray-300 transition-colors"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="w-16 text-center border py-1 bg-gray-50"
            />
            <button
              type="button"
              className="bg-gray-200 px-3 py-1 rounded-r hover:bg-gray-300 transition-colors"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Payment Method</label>
          <div className="grid grid-cols-3 gap-2">
            {["Credit Card", "PayPal", "Cash"].map((method) => (
              <button
                key={method}
                type="button"
                className={`flex items-center justify-center p-3 rounded-lg ${
                  paymentMethod === method
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition-colors`}
                onClick={() => setPaymentMethod(method)}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Notes */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-200 transition-all"
            rows={3}
            placeholder="Add any special instructions"
          />
        </div>

        {/* Order Summary */}
        <div className="mb-4 bg-gray-100 p-4 rounded">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${quantity * 49.99}</span>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span>Total:</span>
            <span>${quantity * 49.99}</span>
          </div>
        </div>

        {/* Error or Success Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {order && (
          <p className="text-green-500 mb-4">Order placed successfully!</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-6 py-3 rounded-lg transition-colors ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          {isLoading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
