import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  HStack,
  Avatar,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Product } from "../types/product";

type ViewDetailProps = {
  isOpen: boolean;
  onClose: () => void;
  currentData: Product;
};

const ViewDetail = ({ isOpen, onClose, currentData }: ViewDetailProps) => {
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>View Detail: {currentData.name}</DrawerHeader>

          <DrawerBody>
            <HStack>
              <Avatar size={"sm"} name={currentData.name} />
              <VStack alignItems={"self-start"}>
                <Heading fontSize={16}>{currentData.name}</Heading>
                <Heading fontSize={20}>{currentData.price}</Heading>
                <Text>{currentData.description}</Text>
              </VStack>
            </HStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ViewDetail;
