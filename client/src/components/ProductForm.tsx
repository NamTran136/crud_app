import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Input,
  Textarea,
  Text,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant";
import { Product } from "../types/product";

type ProductFromProps = {
  isOpen: boolean;
  onClose: () => void;
  fetchProduct: () => void;
  currentData: Product;
};

const ProductForm = ({
  isOpen,
  onClose,
  fetchProduct,
  currentData,
}: ProductFromProps) => {
  const toast = useToast();
  const [product, setProduct] = useState({
    id: currentData?.id || 0,
    name: currentData?.name || "",
    description: currentData?.description || "",
    price: currentData?.price || 0,
    isInStore: currentData?.isInStore || false,
  });
  const onSave = () => {
    if (product.id !== 0) {
      editProduct();
    } else {
      addProduct();
    }
  };

  const addProduct = () => {
    axios
      .post(BASE_URL, product)
      .then(() => {
        onClose();
        fetchProduct();
        toast({
          title: "Product Added",
          description: "Product Added Successfully",
          isClosable: true,
          duration: 1000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editProduct = () => {
    axios
      .put(BASE_URL + "/" + currentData?.id, product)
      .then(() => {
        onClose();
        fetchProduct();
        toast({
          title: "Product Edited",
          description: "Product Edited Successfully",
          isClosable: true,
          duration: 1000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader shadow={"sm"}>
            {product.id !== 0 ? "Edit Product" : "Add Product"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={4} alignItems={"self-start"}>
              <Input
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                type="text"
                placeholder="Name"
              />
              <Textarea
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
                placeholder="Product Description"
              />
              <Input
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: parseInt(e.target.value) })
                }
                type="number"
                placeholder="Price"
              />
              <Text>Is In Store?</Text>
              <Switch
                isChecked={product.isInStore}
                onChange={(e) =>
                  setProduct({ ...product, isInStore: e.target.checked })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant={"ghost"} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={onSave} colorScheme="blue">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductForm;
