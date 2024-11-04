import React, { useState, useEffect } from "react";
import "./Cart.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import Divider from "../../components/Divider/Divider";
import Swal from "sweetalert2";
import empty from "../../assets/Images/theme/Empty-cuate.png";
import FormField from "../../components/FormField/FormField";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoTotal, setPromoTotal] = useState("");
  const [promoCodeError, setPromoCodeError] = useState("");
  const [subTotal, setSubtotal] = useState("");
  const [isPromoCode, setIsPromoCode] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [total, setTotal] = useState("");
  const [userId, setUserId] = useState("");
  const baseurl = import.meta.env.VITE_API_BACKEND_URL;
  const port = import.meta.env.VITE_API_PORT;
  const API_URL = `${baseurl}`;

  const promoStyle = {
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
  };

  useEffect(() => {
    const storedArray = localStorage.getItem("cart");
    if (storedArray) {
      const parsedCart = JSON.parse(storedArray);
      setCart(parsedCart);

      //get user_id
      setUserId(localStorage.getItem("userId"));
      //set inital quantities
      const initialQuantities = parsedCart.reduce((acc, item) => {
        acc[item.food_id] = item.quantity || 0; // Set initial quantity from cart
        return acc;
      }, {});
      setQuantities(initialQuantities);

      //set inital subtotal
      const initialSubTotal = parsedCart.reduce((acc, item) => {
        acc += item.price * item.quantity || 0;
        return acc;
      }, 0);
      setSubtotal(initialSubTotal);

      //set Delivery Fee
      setDeliveryFee(5);

      //set initial total
      setTotal(Number(initialSubTotal) + Number(5));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));

      //set subtotal when quantity of an item changes
      const changedSubTotal = cart.reduce((acc, item) => {
        acc += item.price * item.quantity || 0;
        return acc;
      }, 0);
      setSubtotal(changedSubTotal);

      //set Delivery Fee
      setDeliveryFee(5);

      if (isPromoCode) {
        //apply promo code
        const calculatedPromo = (Number(changedSubTotal) * 20) / 100;
        setPromoTotal(calculatedPromo);

        //set Total
        setTotal(Number(changedSubTotal) + Number(5) - Number(calculatedPromo));
      } else {
        //set total when quantity of an item changes
        setTotal(Number(changedSubTotal) + Number(5));
      }
    } else {
      setPromoCode("");
      setPromoCodeError("");
      setPromoTotal("");
      setIsPromoCode(false);

      setTotal(0);
      setSubtotal(0);
      setDeliveryFee(0);
    }
  }, [cart]);

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
            const curCart = prevCart.filter(
              (item) => item.food_id !== food.food_id
            );
            curCart.length === 0
              ? localStorage.setItem("cart", JSON.stringify([]))
              : false;
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
      !updatedCart.length
        ? localStorage.setItem("cart", JSON.stringify([]))
        : false;

      return updatedCart;
    });
  };

  const handlePromoCode = (e) => {
    setPromoCodeError("");
    setPromoCode(e.target.value);
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode) {
      if (promoCode === "YUMBITES20") {
        setIsPromoCode(true);
        setPromoCode("");

        //apply promo code
        const calculatedPromo = (Number(subTotal) * 20) / 100;
        setPromoTotal(calculatedPromo);

        //set Total
        setTotal(Number(subTotal) + Number(5) - Number(calculatedPromo));
      } else {
        setIsPromoCode(false);
        setPromoCode("");
        Swal.fire({
          icon: "warning",
          text: "Invalid Promo code. Please enter the valid code!",
          customClass: {
            title: "swal2-custom",
            text: "swal2-custom",
            htmlContainer: "swal2-custom",
            confirmButton: "swal2-custom swal2-custom__confirm",
          },
          confirmButtonText: "OK",
        });
      }
    } else {
      setPromoCodeError("Enter the promo code to avail the offer");
    }
  };

  useEffect(() => {
    !isPromoCode ? (setPromoCode(""), setPromoTotal("")) : false;
  }, [isPromoCode]);

  const handleRemovePromo = () => {
    //re-set the total
    setTotal(total + promoTotal);
    setIsPromoCode(false);
  };

  const handleProceedtoCheckout = (e) => {
    e.preventDefault();

    if (cart.length > 0) {
      const addOrder = async () => {
        try {
          const response = await axios.post(`${API_URL}/api/cart`, {
            user_id: userId,
            total_items: cart.length,
            total_amount: total,
            status: "pending",
            payment: 0,
            promocode: isPromoCode,
          });

          // Optional: Show success message after the order is placed
          Swal.fire({
            icon: "success",
            text: "Your order has been placed successfully!",
            customClass: {
              title: "swal2-custom",
              text: "swal2-custom",
              htmlContainer: "swal2-custom",
              confirmButton: "swal2-custom swal2-custom__confirm",
            },
            confirmButtonText: "OK",
          }).then(() => {
            let invoiceFailed = false;

            const orderId = response.data.order_id;
            console.log("Order ID for invoices:", orderId);
            localStorage.setItem("orderId", orderId);
            cart.forEach((item) => {
              try {
                addInvoice(orderId, item);
              } catch (error) {
                invoiceFailed = true;
                return;
              }
            });

            if (invoiceFailed) {
              rollbackOrder(orderId);
              Swal.fire({
                icon: "error",
                text: "Something went wrong while processing your order. Your order has been cancelled.",
                customClass: {
                  title: "swal2-custom",
                  text: "swal2-custom",
                  htmlContainer: "swal2-custom",
                  confirmButton: "swal2-custom swal2-custom__confirm",
                },
                confirmButtonText: "OK",
              });
            } else {
              localStorage.setItem(
                "total",
                JSON.stringify([
                  {
                    subtotal: subTotal,
                    deliveryFee: deliveryFee,
                    promoTotal: promoTotal,
                    total: total,
                    isPromoCode: isPromoCode,
                  },
                ])
              );
              navigate("/OrderPay");
            }
          });
        } catch (error) {
          // Handle any errors that occur during the order placement
          Swal.fire({
            icon: "error",
            text: "Something went wrong while placing the order. Please try again.",
            customClass: {
              title: "swal2-custom",
              text: "swal2-custom",
              htmlContainer: "swal2-custom",
              confirmButton: "swal2-custom swal2-custom__confirm",
            },
            confirmButtonText: "OK",
          });
          console.error("Error placing order:", error);
        }
      };

      addOrder();
    } else {
      Swal.fire({
        icon: "warning",
        text: "Cannot proceed further! Your cart is empty!",
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

  // Define the addInvoice function
  const addInvoice = async (orderId, item) => {
    try {
      await axios.post(`${API_URL}/api/cart/invoice`, {
        user_id: userId,
        order_id: orderId,
        food_id: item.food_id,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
        active: 1,
      });

      console.log(`Invoice for item ${item.food_id} created successfully!`);
    } catch (error) {
      console.error(`Error creating invoice for item ${item.food_id}:`, error);
    }
  };

  const rollbackOrder = async (orderId) => {
    try {
      await axios.delete(`${API_URL}/api/cart/${orderId}`);
      console.log(`Order ${orderId} has been rolled back successfully.`);
    } catch (error) {
      console.error(`Error rolling back order ${orderId}:`, error);
    }
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
                      className="cart__Minus-btn"
                      title="minus"
                      onClick={() => handleRemoveCart(item)}
                    >
                      <FontAwesomeIcon icon={faMinus} className="cart__Minus" />
                    </button>
                    <p className="cart__quantity">
                      {quantities[item.food_id] !== undefined
                        ? quantities[item.food_id]
                        : item.quantity}
                    </p>
                    <button
                      className="cart__Plus-btn"
                      title="plus"
                      onClick={() => handleAddCart(item)}
                    >
                      <FontAwesomeIcon icon={faPlus} className="cart__Plus" />
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
      <form className="cart__payment" onSubmit={handleProceedtoCheckout}>
        <div className="cart__total">
          <p className="cart__total-title">Cart Total</p>
          <div className="cart__detail">
            <p className="cart__detail-info cart__detail-info--color">
              Subtotal
            </p>
            <p className="cart__detail-info cart__detail-info--color">
              ${subTotal}
            </p>
          </div>
          <Divider />
          {isPromoCode && (
            <React.Fragment>
              <div className="cart__detail">
                <p className="cart__detail-info cart__detail-info--color">
                  Promo
                </p>
                <p className="cart__detail-info cart__detail-info--color">
                  -${promoTotal}
                </p>
              </div>
              <Divider />
            </React.Fragment>
          )}

          <div className="cart__detail">
            <p className="cart__detail-info cart__detail-info--color">
              Delivery Fee
            </p>
            <p className="cart__detail-info cart__detail-info--color">
              ${deliveryFee}
            </p>
          </div>
          <Divider />
          <div className="cart__detail">
            <p className="cart__detail-info ">Total</p>
            <p className="cart__detail-info ">${total}</p>
          </div>
          <button
            className="cart__total-button"
            title="Proceed to Checkout"
            type="submit"
          >
            Proceed to Checkout
          </button>
        </div>
        <div className="cart__promo">
          <p className="cart__promo-title">Promo Code</p>
          <p className="cart__promo-description">
            If you have a promo code, Enter it here
          </p>
          <div className="cart__promo-details">
            <FormField
              labelText="promo code"
              fieldType="input"
              inputType="text"
              name="promoCode"
              id="promoCode"
              placeholder="promo code"
              value={promoCode}
              onChange={handlePromoCode}
              style={promoStyle}
              errorMessage={promoCodeError}
            />

            <button
              className="cart__promo-button"
              title="Submit"
              onClick={handleApplyPromo}
            >
              Apply
            </button>
            {isPromoCode && (
              <button
                className="cart__item cart__promo-remove"
                title="delete"
                onClick={handleRemovePromo}
              >
                <FontAwesomeIcon
                  icon={faX}
                  fade
                  className="cart__promo-item cart__promo-removeIcon"
                />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Cart;
