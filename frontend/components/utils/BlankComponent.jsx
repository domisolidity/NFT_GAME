import React from "react";
import { useEffect } from "react";

const BlankComponent = ({ receivedText }) => {
  const neonEffect = () => {
    const styleBox = document.querySelector(".blank-box");
    function setRandomAnimationDuration() {
      styleBox.style.animationDuration =
        Math.floor(Math.random() * 3 + 1) + "s";
    }
    styleBox.addEventListener("animationiteration", setRandomAnimationDuration);
  };

  useEffect(() => {
    if (receivedText) {
      neonEffect();
    }
  }, [receivedText]);

  return (
    <>
      <div className="blank-box">
        {receivedText &&
          receivedText.map((text) => (
            <span className="blank-text">{text}</span>
          ))}
      </div>
      <style jsx>{`
        .blank-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          width: 100%;
          font-size: 30px;
          color: transparent;
          text-shadow: 0 0 20px #d1d2d0;
          animation: buzz 1s infinite alternate;
          -webkit-text-stroke-width: 0.2px;
          -webkit-text-stroke-color: white;
        }
        .blank-text {
          background-image: linear-gradient(90deg, #c0f080, #76e4f7, #38b2ac);
          -webkit-background-clip: text;
        }

        @-webkit-keyframes buzz {
          70% {
            opacity: 0.8;
          }
        }

        @keyframes buzz {
          70% {
            opacity: 0.8;
          }
        }
        @-webkit-keyframes blink {
          40% {
            opacity: 1;
          }
          42% {
            opacity: 0.8;
          }
          43% {
            opacity: 1;
          }
          45% {
            opacity: 0.2;
          }
          46% {
            opacity: 1;
          }
        }
        @keyframes blink {
          40% {
            opacity: 1;
          }
          42% {
            opacity: 0.8;
          }
          43% {
            opacity: 1;
          }
          45% {
            opacity: 0.2;
          }
          46% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default BlankComponent;
