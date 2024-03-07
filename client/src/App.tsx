import axios from "axios";
import { useEffect, useState } from "react";
import { AddIcon, EditIcon, ViewIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Flex,
  Heading,
  Button,
  HStack,
  Avatar,
  Text,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  useToast,
} from "@chakra-ui/react";
import { BASE_URL } from "./constant";
import { Product } from "./types/product";
import ProductSkeleton from "./components/ProductSkeleton";
import ProductForm from "./components/ProductForm";
import ViewDetail from "./components/ViewDetail";

function App() {
  const toast = useToast();
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<Product>({} as Product);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: viewDialogOpen,
    onClose: viewDialogClose,
    onOpen: onViewDialogOpen,
  } = useDisclosure();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(BASE_URL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getProduct = (id: number) => {
    axios
      .get<Product>(BASE_URL + "/" + id)
      .then((res) => {
        setCurrentData(res.data);
        onOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdd = () => {
    setCurrentData({} as Product);
    onOpen();
  };

  const onDeleteHandle = (id: number) => {
    axios
      .delete(BASE_URL + "/" + id)
      .then(() => {
        toast({
          title: "Product Deleted",
          description: "Product Deleted Successfully",
          isClosable: true,
          duration: 1000,
        });
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleViewDetail = (id: number) => {
    axios
      .get<Product>(BASE_URL + "/" + id)
      .then((res) => {
        setCurrentData(res.data);
        onViewDialogOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (isLoading) return <ProductSkeleton />;
  return (
    <Box shadow={"md"} rounded={"md"} m={32}>
      <Flex
        px={5}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={5}
      >
        <Heading fontSize={20}>Product List</Heading>
        <Button onClick={handleAdd} colorScheme="blue" leftIcon={<AddIcon />}>
          Add Product
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Is In Store</Th>
              <Th isNumeric>Price</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((product: Product) => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>
                  <HStack>
                    <Avatar size={"sm"} name={product.name} />
                    <Text>{product.name}</Text>
                  </HStack>
                </Td>
                <Td>{product.description}</Td>
                <Td>{product.isInStore ? "Yes" : "No"}</Td>
                <Td isNumeric>{product.price}</Td>
                <Td>
                  <HStack gap={3}>
                    <EditIcon
                      onClick={() => getProduct(product.id)}
                      boxSize={22}
                      color={"blue"}
                    />
                    <Popover>
                      <PopoverTrigger>
                        <DeleteIcon boxSize={22} color={"red"} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Confirmation!</PopoverHeader>
                        <PopoverBody>Are you sure to delete this?</PopoverBody>
                        <PopoverFooter>
                          <Button
                            colorScheme="red"
                            float={"right"}
                            onClick={() => onDeleteHandle(product.id)}
                          >
                            Delete
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>

                    <ViewIcon
                      onClick={() => handleViewDetail(product.id)}
                      boxSize={22}
                      color={"green"}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {data.length === 0 && (
        <Heading p="5" fontSize={14} textAlign={"center"}>
          No Data
        </Heading>
      )}

      {isOpen && (
        <ProductForm
          currentData={currentData}
          fetchProduct={fetchData}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
      {viewDialogOpen && (
        <ViewDetail
          currentData={currentData}
          isOpen={viewDialogOpen}
          onClose={viewDialogClose}
        />
      )}
    </Box>
  );
}

export default App;
