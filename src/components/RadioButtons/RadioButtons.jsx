import "./RadioButtons.scss";

export default function RadioButtons({ onChange, status }) {
  return (
    <div className="radio-buttons">
      <h3 className="radio-buttons__title">Payment Method</h3>
      <div className="radio-buttons__column">
        <div className="radio-buttons__button">
          <input
            type="radio"
            id="cod"
            name="payment"
            value="cod"
            onChange={onChange}
            className="radio-buttons__radio"
            checked={status ? (status === "cod" ? true : false) : true}
          />
          <label htmlFor="cod" className="radio-buttons__label">
            <span className="radio-buttons__custom-radio"></span>
            COD (Cash on delivery)
          </label>
        </div>
        <div className="radio-buttons__button">
          <input
            type="radio"
            id="credit"
            name="payment"
            value="creditDebit"
            onChange={onChange}
            className="radio-buttons__radio"
            checked={status ? (status === "creditDebit" ? true : false) : false}
          />
          <label htmlFor="credit" className="radio-buttons__label">
            <span className="radio-buttons__custom-radio"></span>
            Credit/Debit
          </label>
        </div>
      </div>
    </div>
  );
}
