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
  const txtColor = useColorModeValue("#f47820 ", "orange.500");
  const { isOpen, onOpen, onClose } = useDisclosure();
  let bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  let colorButton = "white";

  return (
    <>
      <Button
        bg={bgButton}
        color={colorButton}
        fontSize="xs"
        onClick={onOpen}
        // variant="no-hover"
        borderRadius="35px"
        px="30px"
        display={{
          sm: "none",
          lg: "flex",
        }}
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
