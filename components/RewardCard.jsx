const RewardCard = () => {
  return (
    <div className="cards__list">
      <div className="card__item card__item--pointer">
        <div className="card__item__header reward__card__header">
          <div className="card__item__header__actions">
            <div className="card__item__header__actions__block"></div>
            <div className="flex flex-column">
              <div className="card__item__header__actions__block mb-3">
                <div role="button" className="reward__card__craft">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M474.1 398.2L229.8 167.8s8.8-57.7 26.2-71.8c17.5-14.2 48-32 48-32V32c-32 0-58.8 8.3-96.9 27.3-38 18.9-66.8 47.8-74.4 55.4-7.6 7.6-18.1 19.5-24.7 28.9s-5.3 20.1-5.3 20.1l-19.7 17-4-4c-2.3-2.3-6.2-2.3-8.5 0l-36.8 36.8c-2.3 2.3-2.3 6.2 0 8.5l59.4 59.4c2.3 2.3 6.2 2.3 8.5 0l36.8-36.8c2.3-2.3 2.3-6.2 0-8.5l-10.3-10.3 14.6-14.3c6.8-3.7 25.4-8.9 39.1-5.1l214.9 267.3c8.1 8.2 20.3 8.2 28.5 0l46.8-47.1c10.3-8 10.3-22.3 2.1-28.4z"></path>
                  </svg>
                </div>
              </div>
              <div className="reward__card__count">x0</div>
            </div>
          </div>
          <div className="card__item__header__media">
            <video
              width="100%"
              loop=""
              preload="none"
              poster="https://storage.googleapis.com/zapper-fi-assets/rewards/preview/6.png"
            >
              <source
                src="https://storage.googleapis.com/zapper-fi-assets/rewards/webm/6.webm"
                type="video/webm"
              />
            </video>
          </div>
          <div className="card__item__header__text reward__card__header__block">
            <div>
              <div className="card__item__header__text__title">Zaphrodite</div>
              <div className="card__item__header__text__id">
                Requires 1,000 V
              </div>
            </div>
          </div>
        </div>
        <div className="card__item__body">
          <div className="flex flex-between">
            <p className="reward__card__meta">GEN 2 - 1</p>
            <p className="reward__card__meta">Supply: 10479</p>
          </div>
          <p className="text-alt italic mb-0">
            Zaphrodite is the daughter of Zapeus, and therefore heir to great
            power in the Zapperverse.
          </p>
        </div>
      </div>
      <style jsx>{`
        /* @media (max-width: 800px) .cards__list {
          grid-template-columns: repeat(1, 1fr);
        }

        @media (max-width: 1200px) .cards__list {
          grid-template-columns: repeat(2, 1fr);
        } */
        .cards__list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 24px 12px;
        }

        .card__item--pointer {
          border: 1px solid #2c3a43;
          cursor: pointer;
        }

        .card__item--pointer:hover {
          box-shadow: 0 0 0 4px #2c3a43;
        }

        .card__item {
          display: flex;

          flex-direction: column;
          border-radius: 16px;
          overflow: hidden;
          box-sizing: border-box;
          transition: 0.3s;
        }

        .reward__card__header {
          max-height: 250px;
        }
        .card__item__header {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          overflow: hidden;
        }
        .card__item__header__actions {
          position: absolute;
          padding: 12px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          width: calc(100% - 24px);
          height: calc(100% - 24px);
          z-index: 1;
        }
        .card__item__header__actions__block {
          display: grid;
          grid-auto-flow: column;
          justify-content: center;
          align-items: center;
          grid-gap: 8px;
        }
        .flex-column {
          flex-direction: column;
        }
        .flex {
          display: flex;
          align-items: center;
        }
        .mb-3 {
          margin-bottom: 8px !important;
        }
        .reward__card__craft {
          padding: 8px;
          background: #784ffe;
          color: #fff;
          border-radius: 16px;
          display: flex;
          align-items: center;
          transition: 0.3s;
        }

        .reward__card__craft:hover {
          box-shadow: 0 0 0 4px rgb(120 79 254 / 50%);
        }

        .reward__card__count {
          background: #202a30;
          padding: 8px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          font-weight: 600;
          font-size: 12px;
          align-self: flex-end;
        }
        .card__item__header__media {
          display: flex;
        }
        .reward__card__header__block {
          height: 90px;
        }
        .card__item__header__text {
          position: absolute;
          padding: 12px;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          width: calc(100% - 24px);
          height: calc(100% - 24px);
          bottom: 0;
          background: linear-gradient(0deg, #141a1e, rgba(20, 26, 30, 0));
        }
        .card__item__header__text__title {
          text-align: left;
          color: #fff;
          font-size: 20px;
          font-weight: 600;
        }
        .card__item__header__text__id {
          font-size: 14px;
          font-weight: 400;
          color: #c7d2da;
        }

        .card__item__body {
          border-top: 1px solid #2c3a43;
        }
        .card__item__body {
          flex-grow: 1;
          padding: 12px;
        }
        .flex-between {
          justify-content: space-between;
        }
        .flex {
          display: flex;

          align-items: center;
        }
        .text-alt {
          color: #c7d2da;
          font-size: 14px;
        }
        .mb-0 {
          margin-bottom: 0 !important;
        }
        .italic {
          font-style: italic;
        }
        p {
          margin: 1em 0;
        }
      `}</style>
    </div>
  );
};

export default RewardCard;
