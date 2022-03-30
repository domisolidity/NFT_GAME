const Modal = (props) => {
  const closeicon = () => (
    <i
      class="bx bx-x"
      onClick={props.closeModal}
      style={{
        margin: "0.5rem",
        cursor: "pointer",
        position: "absolute",
        top: "0.1rem",
        right: "0.1rem",
        fontSize: "2rem",
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
          margin: 15% auto;
          background-color: grey;
          border-radius: 0.25rem;
          width: 50vw;
          padding: 2rem;
          position: relative;
          color: black;
        }
      `}</style>
    </div>
  );
};

export default Modal;
