import React from "react";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to our E-commerce Platform!</h1>
      <p>Please choose from the options below:</p>
      <ul>
        <li>
          <a href="/products">Products</a>
        </li>
        <li>
          <a href="/cart">Cart</a>
        </li>
        <li>
          <a href="/checkout">Checkout</a>
        </li>
      </ul>
      <h1>This is the Home page</h1>
    </div>
  );
};

export default HomePage;
