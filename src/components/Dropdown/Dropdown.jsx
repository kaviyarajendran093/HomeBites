import "./Dropdown.scss";

export default function FormField({
  id,
  options,
  onChange,
  value,
  errorMessage,
}) {
  return (
    <div className="dropdown">
      <select
        className={
          errorMessage
            ? "dropdown__select dropdown__select--invalid"
            : "dropdown__select"
        }
        name={id}
        id={id}
        onChange={onChange}
        defaultValue={value}
      >
        <option
          disabled
          key="default"
          value="default"
          className="dropdown__option"
        >
          Please select
        </option>
        {options &&
          options.map((option) => {
            return (
              <option key={option} value={option} className="dropdown__option">
                {option}
              </option>
            );
          })}
      </select>
      {errorMessage && (
        <div className="form-field__error">
          <img
            src="/src/assets/icons/error.svg"
            alt="error"
            className="form-field__error-icon"
          />
          <p className="form-field__error-message">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
