import { Box } from "@chakra-ui/react";
import Tier from "../../components/nft/Tier";
import NftMint from "../../components/nft/NftMint";
import { useSelector, useDispatch } from "react-redux";
import SideBarScreen from "../../components/Layout/Frame/SideBarScreen";
const Nft = () => {
  return (

    <Box align="center" pb={20} pt={{ base: "120px", md: "75px" }}>
      <Tier />
      <NftMint />
      <style jsx>{`
        span {
          font-size: 35px;
          background: linear-gradient(#f1f1f1 23%, #818181 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-weight: 900;
        }

        .small {
          font-size: 20px;
        }
      `}</style>
    </Box>
  );
};

export default Nft;

// getLayout property
Nft.getLayout = function getLayout(page) {
  return <SideBarScreen>{page}</SideBarScreen>;
};
