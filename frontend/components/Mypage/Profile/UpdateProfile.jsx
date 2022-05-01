import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import ImageUpload from "./ImageUpload";

const UpdateProfile = ({
  onSubmit,
  imgFile,
  userName,
  getBeforeUserName,
  beforeUserName,
  beforeImages,
  update,
}) => {
  return (
    <Stack
      px={4}
      py={5}
      bg={useColorModeValue("white", "gray.700")}
      spacing={6}
      p={{ sm: 6 }}
      borderRadius="15px"
    >
      <Text fontSize={"20px"} align="center" fontWeight={"bold"}>
        Change profile
      </Text>
      <FormControl>
        {/* <FormLabel
                fontSize="sm"
                fontWeight="md"
                color={useColorModeValue("gray.700", "gray.50")}
                textAlign="center"
              >
                Cover photo
              </FormLabel> */}
        <form onSubmit={onSubmit}>
          <ImageUpload refreshImg={imgFile} beforeImages={beforeImages} />
          <InputGroup align="center" justify="center" w={"50%"} m={"25px auto"}>
            <InputLeftAddon
              bg={useColorModeValue("gray.50", "gray.600")}
              color={useColorModeValue("gray.500", "gay.50")}
              rounded="15px"
            >
              Nick Name
            </InputLeftAddon>
            <Input
              defaultValue={userName ? userName : "player"}
              focusBorderColor="brand.400"
              rounded="15px"
              onChange={getBeforeUserName}
              value={beforeUserName}
            />
          </InputGroup>
          <Button
            type="button"
            ml={5}
            variant="outline"
            size="sm"
            fontWeight="medium"
            _focus={{ shadow: "none" }}
            onClick={(e) => update(e)}
          >
            Change
          </Button>
        </form>
      </FormControl>
    </Stack>
  );
};

export default UpdateProfile;
