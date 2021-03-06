import ScaleText from "react-scale-text";

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
  tileOptions,
}) => {
  const disableColour = hexToRgb(disabledColor || null) || "225, 235, 226";
  // trim the value to be always 4 characters long
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="roboto"
      style={{
        position: "relative",
        height: tileOptions.height,
        width: tileOptions.width,
        background: disabled ? `rgba(${disableColour}, 0.25)` : user.color,
        boxShadow: disabled ? "" : "0px 4px 4px rgba(0, 0, 0, 0.35)",
        borderRadius: 10,
        fontWeight: 900,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: disabled ? "rgba(0, 0, 0, 0.35)" : "#000000",
      }}
    >
      <div className="parent" style={{ width: "90%", height: "90%", textAlign: "center" }}>
        <ScaleText>{value}</ScaleText>
      </div>
    </div>
  );
};

export default UserDisplaySection;
