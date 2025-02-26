import React from "react";
import { 
  Container, 
  Box, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  Icon, 
  useColorModeValue,
  Flex
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const CheckoutCancelPage = () => {
  const navigate = useNavigate();
  
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  
  const handleReturnToCart = () => {
    navigate('/cart');
  };
  
  return (
    <Container maxW="container.xl" py={10}>
      <Flex justify="center">
        <Box 
          p={8} 
          bg={bgColor} 
          borderRadius="lg" 
          boxShadow="md" 
          borderWidth="1px" 
          borderColor={borderColor}
          maxW="700px"
          w="100%"
        >
          <VStack spacing={8} align="center">
            <Icon as={WarningIcon} w={20} h={20} color="orange.500" />
            
            <Heading size="xl" textAlign="center">Checkout Cancelled</Heading>
            
            <Text fontSize="lg" textAlign="center">
              Your payment was not completed and no charges were made.
              Your items are still saved in your cart.
            </Text>
            
            <Box w="100%" pt={6}>
              <Button 
                colorScheme="blue" 
                size="lg" 
                w="100%"
                onClick={handleReturnToCart}
              >
                Return to Cart
              </Button>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default CheckoutCancelPage;