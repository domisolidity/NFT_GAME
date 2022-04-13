import { createPortal } from "react-dom";

const Modal = ({ visible, toggle, children }) =>
  visible
    ? createPortal(
        <div className="modal mx-auto " style={{ maxWidth: "440px" }}>
          <div className="backdrop"></div>
          <div className="shell overflow-hidden anim-scale-in position-relative ">
            {children}
            <a className="position-absolute right-0 p-4 a icon-close-modal">
              <i
                className="bx bx-x"
                style={{
                  fontSize: "20px",
                  lineHeight: "20px",
                }}
                onClick={toggle}
              />
            </a>
          </div>
          <style global jsx>{`
            .modal,
            .modal .backdrop {
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
            }
            .modal {
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 10;
            }

            .backdrop {
              z-index: 99;
              background: rgba(0, 0, 0, 0.4);
            }

            .icon-close-modal {
              z-index: 1;
              cursor: pointer;
            }

            .icon-close-modal i {
              color: var(--text-color);
            }

            .shell {
              background-color: var(--panel-background);
              padding-left: 0 !important;
              padding-right: 0 !important;
              max-width: 810px;
            }

            .modal-body {
              flex: auto;
            }

            .shell {
              display: flex;
              flex-direction: column;
              z-index: 999;
              margin: 0 auto;
              width: 100%;
              max-height: 90%;
              border-radius: 25px;
            }

            @media (max-width: 767px) {
              .shell {
                margin: 0 15px !important;
              }
            }

            .shell .modal-body {
              text-align: initial;
              overflow-y: auto;
              overflow-x: hidden;
            }

            @media (max-width: 767px) {
              .shell .modal-body {
                padding: 0 !important;
                padding-top: 1rem !important;
              }
            }

            @media (max-width: 767px) {
              .modal-liquidity .shell {
                max-height: 100%;
                border-radius: 0;
                height: 100%;
                margin: 0 !important;
              }
            }
          `}</style>
        </div>,
        document.body
      )
    : null;

export default Modal;
