const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : null;
};

const UserDisplaySection = ({
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  disabledColor,
  disabled,
  value,
  user,
}) => {
  const disableColour = hexToRgb(disabledColor || null) || "225, 235, 226";
  // trim the value to be always 4 characters long
  const valueTrimmed =
    value.length > 4 ? value.toString().substring(0, 4) : value;
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="roboto"
      style={{
        height: 70,
        width: 70,
        backgroundColor: "red",
        background: disabled ? `rgba(${disableColour}, 0.25)` : user.color,
        boxShadow: disabled ? "" : "0px 4px 4px rgba(0, 0, 0, 0.35)",
        borderRadius: 10,
        fontSize: 26,
        fontWeight: 900,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: disabled ? "rgba(0, 0, 0, 0.35)" : "#000000",
      }}
    >
      {valueTrimmed}
    </div>
  );
};

export default UserDisplaySection;
