import React, { useState, useEffect } from "react";
import "./Cart.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../components/Loading/Loading";
import Divider from "../../components/Divider/Divider";
import Swal from "sweetalert2";
import empty from "../../assets/Images/theme/Empty-cuate.png";

const Cart = () => {
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const baseurl = import.meta.env.VITE_API_BACKEND_URL;
  const port = import.meta.env.VITE_API_PORT;
  const API_URL = `${baseurl}:${port}`;

  useEffect(() => {
    const storedArray = localStorage.getItem("cart");
    if (storedArray) {
      const parsedCart = JSON.parse(storedArray);
      setCart(parsedCart);

      const initialQuantities = parsedCart.reduce((acc, item) => {
        acc[item.food_id] = item.quantity || 0; // Set initial quantity from cart
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, []);

  //   useEffect(() => {
  //     localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to local storage
  //   }, [cart]);

  const handleRemoveCart = (food) => {
    if (quantities[food.food_id] > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [food.food_id]: prevQuantities[food.food_id] - 1,
      }));

      setCart((prevCart) => {
        const itemInCart = prevCart.find(
          (item) => item.food_id === food.food_id
        );
        if (itemInCart) {
          if (itemInCart.quantity === 1) {
            return prevCart.filter((item) => item.food_id !== food.food_id);
          } else {
            return prevCart.map((item) =>
              item.food_id === food.food_id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
          }
        } else {
          return prevCart;
        }
      });
    }
  };

  const handleAddCart = (food) => {
    if (quantities[food.food_id] < 20) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [food.food_id]: prevQuantities[food.food_id] + 1,
      }));

      setCart((prevCart) => {
        const itemInCart = prevCart.find(
          (item) => item.food_id === food.food_id
        );
        if (itemInCart) {
          return prevCart.map((item) =>
            item.food_id === food.food_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCart, { ...food, quantity: 1 }];
        }
      });
    } else {
      Swal.fire({
        icon: "warning",
        text: "Maximum quantity reached for this item",
        customClass: {
          title: "swal2-custom",
          text: "swal2-custom",
          htmlContainer: "swal2-custom",
          confirmButton: "swal2-custom swal2-custom__confirm",
        },
        confirmButtonText: "OK",
      });
    }
  };

  const handleRemoveItem = (food) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item.food_id !== food.food_id
      );
      const updatedQuantities = { ...quantities };
      delete updatedQuantities[food.food_id];
      setQuantities(updatedQuantities);
      return updatedCart;
    });
  };

  return (
    <div className="cart">
      <div className="cart__title">Cart</div>
      {cart.length > 0 ? (
        <div className="cart__items">
          <div className="cart__header">
            <p className="cart__head-title">Title</p>
            <p className="cart__head-title">Item</p>
            <p className="cart__head-title">Price</p>
            <p className="cart__head-title">Quantity</p>
            <p className="cart__head-title">Total</p>
            <p className="cart__head-title">Remove</p>
          </div>
          <div className="cart__headDivider">
            <Divider />
          </div>

          {cart.map((item, index) => (
            <React.Fragment key={item.food_id}>
              <div className="cart__data-wrap" key={item.food_id}>
                <div className="cart__data">
                  <p className="cart__data-mhead">Item</p>
                  <img
                    className="cart__item cart__data-item"
                    src={`${baseurl}:${port}/images/${item.image_url}`}
                    alt={item.name}
                  />
                </div>
                <div className="cart__data">
                  <p className="cart__data-mhead">Title</p>
                  <p className="cart__item cart__data-title">{item.name}</p>
                </div>
                <div className="cart__data">
                  <p className="cart__data-mhead">Price</p>
                  <p className="cart__item cart__data-price">${item.price}</p>
                </div>
                <div className="cart__data">
                  <p className="cart__data-mhead">Quantity</p>

                  <div className="cart__order">
                    <button
                      className="cart__Plus-btn"
                      title="plus"
                      onClick={() => handleAddCart(item)}
                    >
                      <FontAwesomeIcon icon={faPlus} className="cart__Plus" />
                    </button>
                    <p className="cart__quantity">
                      {quantities[item.food_id] !== undefined
                        ? quantities[item.food_id]
                        : item.quantity}
                    </p>
                    <button
                      className="cart__Minus-btn"
                      title="minus"
                      onClick={() => handleRemoveCart(item)}
                    >
                      <FontAwesomeIcon icon={faMinus} className="cart__Minus" />
                    </button>
                  </div>
                </div>
                <div className="cart__data">
                  <p className="cart__data-mhead">Total</p>
                  <p className="cart__item cart__data-total">
                    $
                    {(
                      item.price *
                      (quantities[item.food_id] !== undefined
                        ? quantities[item.food_id]
                        : item.quantity)
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="cart__data">
                  <p className="cart__data-mhead">Remove</p>
                  <button
                    className="cart__item cart__data-remove"
                    title="delete"
                    onClick={() => handleRemoveItem(item)}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="cart__item cart__remove"
                    />
                  </button>
                </div>
              </div>
              {index < cart.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="cart__empty">
          <img className="cart__empty-img" src={empty} alt="empty" />
          <p className="cart__empty-content">Your cart is empty.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
