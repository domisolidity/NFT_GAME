import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button, Flex, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { severLogout } from "../redux/actions/userLogActions";
import { disconnectWallet } from "../../../redux/blockchain/blockchainActions";

const AccountModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const txtColor = useColorModeValue("orange.400", "orange.400");

  // const userLog = useSelector((state) => state.userLog);
  // const metamask = useSelector((state) => state.metamask);
  // console.log(userLog);
  // console.log(metamask);

  // const { account } = metamask;
  const { account } = blockchain;
  // const { auth } = userLog;

  // const [scan, setScan] = useState("");

  const getDisConnectWallet = () => {
    dispatch(disconnectWallet());
    onClose();
  };
  const getServerLogout = () => {
    dispatch(severLogout());
  };

  useEffect(() => {
    if (!account) return;
    // setScan(account);
  }, [account]);

  return (
    <Flex flexDirection={"column"}>
      <Button borderRadius={"22px"} h={"44px"} p={"0 22px"} m={1}>
        <Link href={`https://bscscan.com/address/${account}`}>
          <a target="_blank">
            {account && account.slice(0, 6) + "..." + account.slice(-4)}
            <ExternalLinkIcon color={txtColor} ml={2} />
          </a>
        </Link>
      </Button>
      <Button
        borderRadius={"22px"}
        h={"44px"}
        p={"0 22px"}
        m={1}
        onClick={getDisConnectWallet}
      >
        Log out
      </Button>
    </Flex>
  );
};
export default AccountModal;
