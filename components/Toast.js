const Toast = ({ message }) => {
  if (message === null) {
    return null;
  }
  const toastStyle = {
    position: "absolute",
    top: "10%",
    left: "50%",
    zIndex: "5318008",
    padding: "10px",
    color: "white",
    background: "rgba(0,0,0,0.5)",
  };
  return <div style={toastStyle}>{message}</div>;
};

export default Toast;
