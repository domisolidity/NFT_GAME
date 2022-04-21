const Tier = () => {
  return (
    <box>
      <h6 className="title">Tier</h6>
      <table className="tier_table">
        <thead>
          <tr className="benefit">
            {/* db1d7c */}
            <th>BENEFITS</th>
            <th id="red">RED</th>
            <th id="green">GREEN</th>
            <th id="purple">PURPLE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="subject">Daily 게임 참여 횟수</td>
            <td>30</td>
            <td>40</td>
            <td>50</td>
          </tr>
          <tr>
            <td className="subject">Daily 미션 할당량</td>
            <td>1 </td>
            <td>2 </td>
            <td>3 </td>
          </tr>
          <tr>
            <td className="subject">스테이킹 보상</td>
            <td>1% </td>
            <td>2% </td>
            <td>3% </td>
          </tr>
          <tr>
            <td className="subject">Nft Number Start</td>
            <td>1 </td>
            <td>61 </td>
            <td>91 </td>
          </tr>
          <tr>
            <td className="subject">Nft Number End</td>
            <td>60 </td>
            <td>90 </td>
            <td>100 </td>
          </tr>
        </tbody>
      </table>
      <style jsx>{`
        h6 {
          font-size: 35px;
          margin-bottom: 30px;
          width: 80px;
          background: linear-gradient(#f1f1f1 23%, #818181 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-weight: 900;
        }
        .tier_table {
          width: 450px;
        }
        td {
          min-width: 4vw;
          color: #e7cfdb;
          border-top: 1px solid #516d92;
          border-bottom: 1px solid #516d92;
          border-left: 1px solid #516d92;
          padding: 15px;
          text-align: center;
          font-weight: bold;
        }
        th:first-child,
        td:first-child {
          border-left: none;
        }
        .benefit {
          color: #471d52;
          text-shadow: -1px 0 #8988ca, 0 1px #8988ca, 1px 0 #8988ca,
            0 -1px #8988ca, 0 0 52px #ffffff;
          font-size: 30px;
          font-weight: bold;
        }
        .subject {
          text-align: left;
          padding-right: 0px;
        }
        #red,
        #green,
        #purple {
          font-size: 20px;
        }
        #red {
          text-shadow: -1px 0 #cc8d8d, 0 1px #cc8d8d, 1px 0 #cc8d8d,
            0 -1px #cc8d8d;
        }
        #green {
          text-shadow: -1px 0 #8fcc8d, 0 1px #8fcc8d, 1px 0 #8fcc8d,
            0 -1px #8fcc8d;
        }
        #purple {
          text-shadow: -1px 0 #b78bd1, 0 1px #b78bd1, 1px 0 #b78bd1,
            0 -1px #b78bd1;
        }
      `}</style>
    </box>
  );
};

export default Tier;
