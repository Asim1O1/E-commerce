import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from "lucide-react";
import Swal from "sweetalert2";

// Dummy Product Data
const dummyCartProducts = [
  {
    productId: {
      _id: "1",
      name: "Classic White T-Shirt",
      description: "Soft cotton crew neck t-shirt",
      price: 29.99,
      imageUrl: "/api/placeholder/300/300",
    },
    quantity: 2,
  },
  {
    productId: {
      _id: "2",
      name: "Denim Jeans",
      description: "Slim fit blue denim jeans",
      price: 79.99,
      imageUrl: "/api/placeholder/300/300",
    },
    quantity: 1,
  },
  {
    productId: {
      _id: "3",
      name: "Leather Sneakers",
      description: "Comfortable white leather sneakers",
      price: 99.99,
      imageUrl: "/api/placeholder/300/300",
    },
    quantity: 1,
  },
];

const CartPage = () => {
  const [cart, setCart] = useState({
    products: dummyCartProducts,
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartTotal = cart.products.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );
    setTotal(cartTotal);
  }, [cart]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) return;

    const updatedCart = {
      products: cart.products.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ),
    };

    setCart(updatedCart);
  };

  const handleRemoveProduct = (productId) => {
    Swal.fire({
      title: "Remove from Cart?",
      text: "This item will be deleted from your cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = {
          products: cart.products.filter(
            (item) => item.productId._id !== productId
          ),
        };

        setCart(updatedCart);

        Swal.fire({
          title: "Removed!",
          text: "Item has been removed from your cart.",
          icon: "success",
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="md:col-span-2 bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <ShoppingBag className="mr-3 text-blue-600" />
              Your Cart
            </h2>
            <span className="text-gray-500">{cart.products.length} Items</span>
          </div>

          {cart.products.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link
                to="/"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.products.map((item) => (
                <div
                  key={item.productId._id}
                  className="flex items-center justify-between border-b pb-4 hover:bg-gray-50 transition p-2 rounded"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.productId.imageUrl}
                      alt={item.productId.name}
                      className="w-24 h-24 object-cover rounded-lg shadow-md"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">
                        {item.productId.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {item.productId.description}
                      </p>
                      <p className="text-blue-600 font-bold">
                        ${item.productId.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-full">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId._id,
                            item.quantity - 1
                          )
                        }
                        className="p-2 hover:bg-gray-100 rounded-l-full"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId._id,
                            item.quantity + 1
                          )
                        }
                        className="p-2 hover:bg-gray-100 rounded-r-full"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <span className="font-bold text-lg">
                      ${(item.productId.price * item.quantity).toFixed(2)}
                    </span>

                    <button
                      onClick={() => handleRemoveProduct(item.productId._id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 h-fit">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <CreditCard className="mr-3 text-blue-600" />
            Order Summary
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="mt-6 w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
