import "./DeliveryInfo.scss";
import React, { useEffect, useState } from "react";
import FormField from "../../components/FormField/FormField";
import Divider from "../../components/Divider/Divider";
import RadioButtons from "../../components/RadioButtons/RadioButtons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const DeliveryInfo = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [street, setStreet] = useState("");
  const [streetError, setStreetError] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [state, setState] = useState("");
  const [stateError, setStateError] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [total, setTotal] = useState("0");
  const [subTotal, setSubtotal] = useState("0");
  const [promoTotal, setPromoTotal] = useState("0");
  const [isPromoCode, setIsPromoCode] = useState(false);
  const [payment, setPayment] = useState("cod");
  const [paymentError, setPaymentError] = useState("");
  const [orderId, setOrderId] = useState(0);
  const [userId, setUserId] = useState("");
  const baseurl = import.meta.env.VITE_API_BACKEND_URL;
  const port = import.meta.env.VITE_API_PORT;
  const API_URL = `${baseurl}:${port}`;

  const handleFirstName = (e) => {
    setFirstNameError("");
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastNameError("");
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmailError("");
    setEmail(e.target.value);
  };

  const handleStreet = (e) => {
    setStreetError("");
    setStreet(e.target.value);
  };

  const handleCity = (e) => {
    setCityError("");
    setCity(e.target.value);
  };

  const handleState = (e) => {
    setStateError("");
    setState(e.target.value);
  };

  const handleZipCode = (e) => {
    setZipCodeError("");
    setZipCode(e.target.value);
  };

  const handleCountry = (e) => {
    setCountryError("");
    setCountry(e.target.value);
  };

  const handlePhone = (e) => {
    setPhoneError("");
    setPhone(e.target.value);
  };

  const handlePayment = (e) => {
    console.log(e.target.value);
    setPaymentError("");
    setPayment(e.target.value);
  };

  useEffect(() => {
    const totalArray = JSON.parse(localStorage.getItem("total"));
    console.log(localStorage.getItem("orderId"));
    setOrderId(localStorage.getItem("orderId"));
    setUserId(localStorage.getItem("userId"));

    if (totalArray) {
      setSubtotal(totalArray[0].subtotal);
      setDeliveryFee(totalArray[0].deliveryFee);
      setPromoTotal(totalArray[0].promoTotal);
      setTotal(totalArray[0].total);
      setIsPromoCode(totalArray[0].isPromoCode);
    }
  }, []);

  const isFormValid = () => {
    let error;
    if (!firstName) {
      error = true;
      setFirstNameError("First name is required");
    }
    if (!lastName) {
      error = true;
      setLastNameError("Last name is required");
    }
    if (!email) {
      error = true;
      setEmailError("Email is required");
    } else {
      // regex from https://stackoverflow.com/a/13975255
      const checkEmail = /\S+@\S+\.\S+/;
      if (!checkEmail.test(email)) {
        error = true;
        setContactEmailError("Email is invalid");
      }
    }
    if (!street) {
      error = true;
      setStreetError("Street is required");
    }
    if (!city) {
      error = true;
      setCityError("City is required");
    }
    if (!state) {
      error = true;
      setStateError("State is required");
    }

    if (!zipCode) {
      error = true;
      setZipCodeError("Zip code is required");
    }

    if (!phone) {
      error = true;
      setPhoneError("phone Number is required");
    } else if (phone.length === 10) {
      setPhone(
        "+1 (" +
          phone.slice(0, 3) +
          ") " +
          phone.slice(3, 6) +
          "-" +
          phone.slice(6, phone.length)
      );
    } else {
      const checkPhoneNo = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;
      if (!checkPhoneNo.test(phone)) {
        error = true;
        setPhoneError("Phone number is invalid");
      }
    }

    if (!country) {
      error = true;
      setCountryError("Country is required");
    }

    if (error) {
      return false;
    } else {
      return true;
    }
  };

  const handleProceedtoPay = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      let formattedPhoneNum =
        "+1 (" +
        phone.slice(0, 3) +
        ") " +
        phone.slice(3, 6) +
        "-" +
        phone.slice(6, phone.length);

      const addDelivery = async () => {
        try {
          const response = await axios.post(
            `${API_URL}/api/trackOrder`,
            {
              user_id: userId,
              order_id: orderId,
              first_name: firstName,
              last_name: lastName,
              email: email,
              phone_no: formattedPhoneNum,
              street: street,
              city: city,
              province: state,
              country: country,
              zipcode: zipCode,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          Swal.fire({
            icon: "success",
            text: "Payment made successfully!",
            customClass: {
              title: "swal2-custom",
              text: "swal2-custom",
              htmlContainer: "swal2-custom",
              confirmButton: "swal2-custom swal2-custom__confirm",
            },
            confirmButtonText: "OK",
          }).then(() => {
            let updateFailed = false;
            try {
              updateOrder(orderId);
            } catch (error) {
              console.log("order update failed");
              rollbackDeliveryInfo(response.data.delivery_id);
              cancelOrder(orderId);
              return;
            }
            if (updateFailed) {
              Swal.fire({
                icon: "error",
                text: "Something went wrong while processing your deliveryInfo. Your order has been cancelled.",
                customClass: {
                  title: "swal2-custom",
                  text: "swal2-custom",
                  htmlContainer: "swal2-custom",
                  confirmButton: "swal2-custom swal2-custom__confirm",
                },
                confirmButtonText: "OK",
              });
            } else {
              console.log("Payment made and order updated");

              navigate("/TrackOrder");
            }
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            text: "Payment failed. Please try again.",
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

      addDelivery();
    }
  };

  const rollbackDeliveryInfo = async (orderId) => {
    try {
      await axios.delete(`${API_URL}/api/trackOrder/${orderId}`);
      console.log(`Order ${orderId} has been rolled back successfully.`);
    } catch (error) {
      console.error(`Error rolling back order ${orderId}:`, error);
    }
  };

  const updateOrder = async (orderId) => {
    try {
      await axios.patch(`${API_URL}/api/trackOrder/order/${orderId}`, {
        status: "Processing",
        payment: true,
        payment_metod: payment,
      });
      console.log(`order for id ${orderId} updated successfully!`);
    } catch (error) {
      console.error(`Error updating order for id ${orderId}:`, error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await axios.patch(`${API_URL}/api/trackOrder/order/${orderId}`, {
        status: "Cancelled",
      });
      console.log(`order for id ${orderId} updated successfully!`);
    } catch (error) {
      console.error(`Error updating order for id ${orderId}:`, error);
    }
  };

  return (
    <form className="placeOrder" onSubmit={handleProceedtoPay}>
      <div className="placeOrder__deliveryInfo">
        <p className="placeOrder__deliveryInfo-title">Delivery Information</p>
        <div className="placeOrder__form">
          <div className="placeOrder__fields">
            <FormField
              fieldType="input"
              inputType="text"
              name="firstName"
              id="firstName"
              placeholder="First name"
              value={firstName}
              onChange={handleFirstName}
              errorMessage={firstNameError}
            />
            <FormField
              fieldType="input"
              inputType="text"
              name="lastName"
              id="lastName"
              placeholder="Last name"
              value={lastName}
              onChange={handleLastName}
              errorMessage={lastNameError}
            />
          </div>
          <FormField
            fieldType="input"
            inputType="email"
            name="email"
            id="email"
            placeholder="Email address"
            value={email}
            onChange={handleEmail}
            errorMessage={emailError}
          />
          <FormField
            fieldType="input"
            inputType="text"
            name="street"
            id="street"
            placeholder="Street"
            value={street}
            onChange={handleStreet}
            errorMessage={streetError}
          />
          <div className="placeOrder__fields">
            <FormField
              fieldType="input"
              inputType="text"
              name="city"
              id="city"
              placeholder="City"
              value={city}
              onChange={handleCity}
              errorMessage={cityError}
            />
            <FormField
              fieldType="input"
              inputType="text"
              name="state"
              id="state"
              placeholder="Province"
              value={state}
              onChange={handleState}
              errorMessage={stateError}
            />
          </div>

          <div className="placeOrder__fields">
            <FormField
              fieldType="input"
              inputType="text"
              name="zipCode"
              id="zipCode"
              placeholder="Zip code"
              value={zipCode}
              onChange={handleZipCode}
              errorMessage={zipCodeError}
            />
            <FormField
              fieldType="input"
              inputType="text"
              name="country"
              id="country"
              placeholder="Country"
              value={country}
              onChange={handleCountry}
              errorMessage={countryError}
            />
          </div>
          <FormField
            fieldType="input"
            inputType="text"
            name="phone"
            id="phone"
            placeholder="Phone"
            value={phone}
            onChange={handlePhone}
            errorMessage={phoneError}
          />
        </div>
      </div>
      <div className="placeOrder__cart">
        <div className="placeOrder__total">
          <p className="placeOrder__total-title">Cart Total</p>
          <div className="placeOrder__detail">
            <p className="placeOrder__detail-info placeOrder__detail-info--color">
              Subtotal
            </p>
            <p className="placeOrder__detail-info placeOrder__detail-info--color">
              ${subTotal}
            </p>
          </div>
          <Divider />
          {isPromoCode && (
            <React.Fragment>
              <div className="placeOrder__detail">
                <p className="placeOrder__detail-info placeOrder__detail-info--color">
                  Promo
                </p>
                <p className="placeOrder__detail-info placeOrder__detail-info--color">
                  -${promoTotal}
                </p>
              </div>
              <Divider />
            </React.Fragment>
          )}

          <div className="placeOrder__detail">
            <p className="placeOrder__detail-info placeOrder__detail-info--color">
              Delivery Fee
            </p>
            <p className="placeOrder__detail-info placeOrder__detail-info--color">
              ${deliveryFee}
            </p>
          </div>
          <Divider />
          <div className="placeOrder__detail">
            <p className="placeOrder__detail-info ">Total</p>
            <p className="placeOrder__detail-info ">${total}</p>
          </div>
          <div className="payment">
            <RadioButtons onChange={handlePayment} status={payment} />
          </div>
          <button
            className="placeOrder__total-button"
            title="Proceed to pay"
            type="submit"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </form>
  );
};

export default DeliveryInfo;
