import React, { useEffect, useState } from "react";
import SimpleStorageContract from "../../contracts/SimpleStorage.json";
import getWeb3 from "../../getWeb3";



import "./layout.css";
import Sidebar from "./sidebar/Sidebar";
import TopNav from "./topnav/TopNav";
import AllRoutes from "../../pages/AllRoutes";

const Layout = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");

  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = SimpleStorageContract.networks[networkId];
    if (networkData) {
      const abi = SimpleStorageContract.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      return contract;
    }
  };

  const loadWeb3Account = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    if (accounts) {
      setAccount(accounts[0]);
    }
  };

  useEffect(async () => {
    const web3 = await getWeb3();
    await loadWeb3Account(web3);
    await loadWeb3Contract(web3);
  }, []);

  const initialization = { contract, account };

  return (
    <div className="layout">
        {console.log("Layout.js 렌더")}
        <Sidebar />
        <div className="layout__content">
          <TopNav initialization={initialization} />
          <div className="layout__content-main">
            <AllRoutes initialization={initialization} />
          </div>
        </div>
      </div>
  );
};

export default Layout;
