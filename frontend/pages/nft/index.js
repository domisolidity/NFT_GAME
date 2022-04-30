import { Box } from "@chakra-ui/react";
import NftMint from "../../components/nft/NftMint";
import SideBarScreen from "../../components/Layout/Frame/SideBarScreen";
const Nft = () => {
  return (
    <Box align="center" pt={{ base: "120px", md: "75px" }}>
      <NftMint />
    </Box>
  );
};

export default Nft;

// getLayout property
Nft.getLayout = function getLayout(page) {
  return <SideBarScreen>{page}</SideBarScreen>;
};
