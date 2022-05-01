import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Separator } from "../../Separator/Separator";
import WalletList from "./WalletList";

const ConnectWallet = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let bgButton = useColorModeValue("gray.100", "gray.800");
  let colorButton = "white";
  const txtColor = useColorModeValue("#f47820 ", "orange.500");

  return (
    <>
      <Button
        bg={bgButton}
        // color={colorButton}
        fontSize="xs"
        onClick={onOpen}
        // variant="no-hover"
        border={"1px solid"}
        borderRadius="35px"
        px="30px"
        display={{
          sm: "none",
          lg: "flex",
        }}
        h={"44px"}
        p={"0 22px"}
        color={txtColor}
        boxShadow={"0 2px 10px rgb(0 0 0 / 15%)"}
      >
        Connect to a Wallet
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect To A Wallet</ModalHeader>
          <Separator />
          <ModalCloseButton />
          <ModalBody>
            <WalletList onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConnectWallet;
