import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function UserProfile({ name, avatarUrl, bio, info }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const AddModal = useDisclosure();
  const [editableKey, setEditableKey] = useState("");
  const [editableValue, setEditableValue] = useState("");
  const [newKey, setNewKey] = useState("");
  const [profileInfo, setProfileInfo] = useState({});
  const [newValue, setNewValue] = useState("");
  const handleAdd = () => {
    setNewKey("");
    setNewValue("");
    AddModal.onOpen();
  };
  useEffect(() => {
    setProfileInfo(info);
  }, [info]);
  const handleSaveNew = () => {
    const updatedProfileInfo = {
      ...profileInfo,
      [newKey]: newValue,
    };
    setProfileInfo(updatedProfileInfo);
    // TODO: Update the user's profile information
    AddModal.onClose();
  };

  const handleEdit = (key, value) => {
    setEditableKey(key);
    setEditableValue(value);
    onOpen();
  };

  const handleSave = () => {
    const updatedProfileInfo = {
      ...profileInfo,
      [editableKey]: editableValue,
    };
    setProfileInfo(updatedProfileInfo);
    // TODO: Update the user's profile information
    onClose();
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Flex align="center" mb={4}>
        <Avatar src={avatarUrl} size="lg" mr={4} />
        <Box>
          <Heading size="md">{name}</Heading>
          <Text fontSize="sm" color="gray.500">
            {bio}
          </Text>
        </Box>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Key</Th>
            <Th>Value</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {profileInfo &&
            Object.entries(profileInfo).map(([key, value]) => (
              <Tr key={key}>
                <Td fontWeight="bold">{key}</Td>
                <Td>{value}</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => handleEdit(key, value)}
                    variant="outline"
                  >
                    Edit
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <Button onClick={() => handleAdd()} colorScheme="blue" mb={4}>
        Add new
      </Button>
      <Button onClick={() => {}} colorScheme="blue" mb={4}>
        Save Changes
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {editableKey}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2}>{editableKey}</Text>
            <input
              type="text"
              value={editableValue}
              onChange={(e) => setEditableValue(e.target.value)}
              className="form-control"
            />
          </ModalBody>
          <Box p={4} textAlign="right">
            <Button mr={2} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </ModalContent>
      </Modal>
      <Modal isOpen={AddModal.isOpen} onClose={AddModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={2}>
              <Text mb={2}>Key:</Text>
              <input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="form-control"
              />
            </Box>
            <Box>
              <Text mb={2}>Value:</Text>
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="form-control"
              />
            </Box>
          </ModalBody>
          <Box p={4} textAlign="right">
            <Button mr={2} onClick={AddModal.onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSaveNew}>
              Save
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default UserProfile;
