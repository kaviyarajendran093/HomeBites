import React, { useState, useEffect } from "react";
import "./foodList.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../../components/Loading/Loading";
import Divider from "../../components/Divider/Divider";
import Swal from "sweetalert2";
import { ModalPopUp } from "../../components/ModalPopUp/ModalPopUp";
import Cart from "../Cart/Cart";
import { useNavigate } from "react-router-dom";

const FoodList = ({ chef_id, category_id }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const baseurl = import.meta.env.VITE_API_BACKEND_URL;
  const port = import.meta.env.VITE_API_PORT;
  const API_URL = `${baseurl}:${port}`;

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  async function getFoodList() {
    try {
      const endpoint = category_id
        ? `${API_URL}/api/order/list/${chef_id}/${category_id}`
        : `${API_URL}/api/order/list/${chef_id}`;

      const { data } = await axios.get(endpoint);
      setFoodList(data);

      // Initialize quantities for each food item to 0
      const initialQuantities = {};
      data.forEach((food) => {
        initialQuantities[food.food_id] = 0;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.log("Error fetching food list:", error);
    }
  }

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

  const handlePlaceOrder = () => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
      navigate(`/Cart`);
    } else {
      Swal.fire({
        icon: "warning",
        text: "Cart is empty, Please add items",
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

  useEffect(() => {
    getFoodList();
  }, [chef_id, category_id]);

  if (!foodList.length) {
    return <Loading />;
  }

  return (
    <div className="foodList">
      <Divider />
      {foodList
        .reduce((acc, food) => {
          if (
            acc.length === 0 ||
            acc[acc.length - 1].category !== food.category
          ) {
            acc.push({
              category: food.category,
              items: [food],
            });
          } else {
            acc[acc.length - 1].items.push(food);
          }
          return acc;
        }, [])
        .map((group, index) => (
          <div key={index}>
            <div className="foodList__title">{group.category}</div>
            {group.items.map((food) => (
              <div className="foodList__wrap" key={food.food_id}>
                <div className="foodList__image-wrap">
                  <img
                    className="foodList__image"
                    src={`${baseurl}:${port}/images/${food.image_url}`}
                    alt={food.name}
                  />
                </div>
                <div className="foodList__content">
                  <div className="foodList__content-wrap">
                    <p className="foodList__name">{food.name}</p>
                    <p className="foodList__description">{food.description}</p>
                    <p className="foodList__price">${food.price}</p>
                  </div>
                  <div className="foodList__order-wrap">
                    <div className="foodList__rating-wrap">
                      <p className="foodList__rating">
                        {parseFloat(parseFloat(food.rating).toFixed(1))}/5
                      </p>
                      <FontAwesomeIcon
                        icon={faStar}
                        className="foodList__star"
                      />
                    </div>
                    <div className="foodList__order">
                      <button
                        className="foodList__Plus-btn"
                        title="plus"
                        onClick={() => handleAddCart(food)}
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="foodList__Plus"
                        />
                      </button>
                      <p className="foodList__quantity">
                        {quantities[food.food_id]}
                      </p>
                      <button
                        className="foodList__Minus-btn"
                        title="minus"
                        onClick={() => handleRemoveCart(food)}
                      >
                        <FontAwesomeIcon
                          icon={faMinus}
                          className="foodList__Minus"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

      <div className="foodList__button-wrap">
        <button
          className="foodList__button"
          title="place order"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
      {isOpen && <ModalPopUp close={closeModal} Content={Cart} />}
    </div>
  );
};

export default FoodList;
