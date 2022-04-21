import { useSelector } from "react-redux";
import Link from "next/link";
import { SettingsIcon } from "@chakra-ui/icons";
// import {
//     connectWallet,
//     disconnectWallet,
//     reconnect,
//   } from "../../redux/blockchain/blockchainActions";

const Adminbar = () => {
  // const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;
  const owner = process.env.NEXT_PUBLIC_OWNER;

  return (
    <>
      {account == owner ? (
        <Link href="/admin">
          <a>
            <SettingsIcon ml="3" w="5" h="5" />
          </a>
        </Link>
      ) : null}
    </>
  );
};

export default Adminbar;
