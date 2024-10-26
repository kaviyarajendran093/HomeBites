import "./FormField.scss";
import error from "../../assets/Images/error/error.svg";

export default function FormField({
  fieldType,
  inputType,
  name,
  id,
  placeholder,
  value,
  onChange,
  style,
  errorMessage,
}) {
  return (
    <div className="form-field">
      {fieldType === "input" && (
        <>
          <input
            className={
              errorMessage
                ? "form-field__input form-field__input--invalid"
                : "form-field__input"
            }
            style={style ? style : {}}
            type={inputType}
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange ? onChange : ""}
          />
          {errorMessage && (
            <div className="form-field__error">
              <img src={error} alt="error" className="form-field__error-icon" />
              <p className="form-field__error-message">{errorMessage}</p>
            </div>
          )}
        </>
      )}
      {fieldType === "textarea" && (
        <>
          <textarea
            className={
              errorMessage
                ? "form-field__textarea form-field__textarea--invalid"
                : "form-field__textarea"
            }
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange ? onChange : ""}
          />
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
        </>
      )}
    </div>
  );
}
