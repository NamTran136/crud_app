import { AddIcon } from "@chakra-ui/icons";
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
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";

const ProductSkeleton = () => {
  return (
    <Box shadow={"md"} rounded={"md"} m={32}>
      <Flex
        px={5}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={5}
      >
        <Heading>
          <Skeleton>Product List</Skeleton>
        </Heading>
        <Button colorScheme="blue" leftIcon={<AddIcon />}>
          <Skeleton>Add List</Skeleton>
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>
                <Skeleton>ID</Skeleton>
              </Th>
              <Th>
                <Skeleton>Name</Skeleton>
              </Th>
              <Th>
                <Skeleton>Description</Skeleton>
              </Th>
              <Th>
                <Skeleton>Is In Store</Skeleton>
              </Th>
              <Th isNumeric>
                <Skeleton>Price</Skeleton>
              </Th>
              <Th>
                <Skeleton>Actions</Skeleton>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <Tr key={index}>
                <Td>
                  <Skeleton>01</Skeleton>
                </Td>
                <Td>
                  <HStack>
                    <SkeletonCircle>
                      <Avatar size={"sm"} name={"AD"} />
                    </SkeletonCircle>
                    <Text>
                      <Skeleton>Product Name</Skeleton>
                    </Text>
                  </HStack>
                </Td>
                <Td>
                  <Skeleton>Product Description</Skeleton>
                </Td>
                <Td>
                  <Skeleton>Yes</Skeleton>
                </Td>
                <Td isNumeric>
                  <Skeleton>25.5</Skeleton>
                </Td>
                <Td>
                  <HStack>
                    <SkeletonCircle>1</SkeletonCircle>
                    <SkeletonCircle>1</SkeletonCircle>
                    <SkeletonCircle>1</SkeletonCircle>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductSkeleton;
