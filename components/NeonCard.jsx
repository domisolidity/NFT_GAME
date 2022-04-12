import React from "react";
import {useRouter } from "next/router";

const NeonCard = (props) => {
  const router = useRouter();
  console.log(router.query)
  const {type, text} = router.query
  return (
    <div className="neon">
      {props.type == 1 ? (
        <span className="type__first">{props.text}</span>
      ) : (
        <span className="type__second">{props.text}</span>
      )}
      <style jsx>{`
          .neon {
      display: flex;
    }

    .neon .type__first {
      color: #ffd9e2;
      text-shadow: 0 0 0 transparent, 0 0 10px #ee05f2,
        0 0 20px rgba(255, 0, 60, 0.5), 0 0 40px #ee05f2, 0 0 100px #ee05f2,
        0 0 200px #ee05f2, 0 0 300px #ee05f2, 0 0 500px #ee05f2, 0 0 1000px #ee05f2;
      animation: buzz 5s infinite alternate;
    }
    .neon .type__second {
      /* font-size: 10vw; */
      color: #d4eaff;
      text-shadow: 0 0 0 transparent, 0 0 10px #2695ff,
        0 0 20px rgba(38, 149, 255, 0.5), 0 0 40px #2695ff, 0 0 100px #2695ff,
        0 0 200px #2695ff, 0 0 300px #2695ff, 0 0 500px #2695ff;
      animation: buzz 5s infinite alternate;
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

    /* @media screen and (min-width: 1000px) {
      .neon {
        width: 400px;
        font-size: 3rem;
      }

      .neon .type__second {
        font-size: 3rem;
      }
    } */
      `}</style>
    </div>
  );
};

export default NeonCard;
