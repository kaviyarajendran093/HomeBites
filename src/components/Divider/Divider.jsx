import "./Divider.scss";

export default function Divider(props) {
  return (
    <>
      <hr
        className={
          props.from === "upload"
            ? "horizontalLines uploadDivider"
            : "horizontalLines"
        }
      />
    </>
  );
}
