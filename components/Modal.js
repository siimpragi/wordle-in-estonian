const Modal = ({ children, handleClose }) => {
  const overlayStyle = {
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.25)",
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: 9999999999,
  };
  const containerStyle = {
    overflowY: "auto",
    maxWidth: 500,
    background: "white",
    height: "90%",
    margin: "0 auto",
    position: "relative",
    padding: "50px 10px 10px",
  };
  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
  };
  return (
    <div style={overlayStyle}>
      <div style={containerStyle}>
        <button onClick={handleClose} style={closeButtonStyle}>
          close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
