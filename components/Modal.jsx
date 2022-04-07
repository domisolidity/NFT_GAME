const Modal = (props) => {
  const closeicon = () => (
    <i
      className="bx bx-x"
      onClick={props.closeModal}
      style={{
        margin: "1rem",
        cursor: "pointer",
        position: "absolute",
        top: "0.2rem",
        right: "5rem",
        fontSize: "2rem",
        color: "white",
        zIndex: 1000,
      }}
    />
  );

  return (
    <div className="overlay">
      <div className="content">
        {closeicon()}
        {props.children}
      </div>
      <style jsx>{`
        .overlay {
          position: fixed;
          display: block;
          overflow: auto;
          width: 100%;
          height: 100%;
          margin: 0;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }
        .content {
          margin: 12% auto;
          /* background-color: #3b406e; */
          border-radius: 0.25rem;
          width: 50vw;
          /* padding: 3rem; */
          position: relative;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Modal;
