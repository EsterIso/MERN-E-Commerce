import React, { useEffect } from "react";
import { Container, Box, Heading, Text, Button, VStack, Icon, useColorModeValue, Flex} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cart";

const CheckoutSuccessPage = () => {
    const navigate = useNavigate();
    
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    
    const clearCart = useCartStore(state => state.clearCart);

    const handleContinueShopping = () => {
        navigate('/');
    };
    
    // Clear the cart when the component mounts
    useEffect(() => {
        // Call the clearCart function that makes a DELETE request to /api/cart
        clearCart()
        .then(result => {
            if (result.success) {
            console.log("Cart cleared successfully after purchase");
            } else {
            console.warn("Failed to clear cart:", result.message);
            }
        })
        .catch(error => {
            console.error("Error clearing cart:", error);
        });
    }, [clearCart]);

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
                <Icon as={CheckCircleIcon} w={20} h={20} color="green.500" />
                
                <Heading size="xl" textAlign="center">Payment Successful!</Heading>
                
                <Text fontSize="lg" textAlign="center">
                Thank you for your purchase. Your order has been received and is now being processed.
                </Text>
                
                <Box 
                p={4} 
                bg={useColorModeValue("gray.50", "gray.700")} 
                borderRadius="md" 
                w="100%"
                textAlign="center"
                >
                <Text fontSize="sm" color="gray.500">ORDER NUMBER</Text>
                <Text fontSize="xl" fontWeight="bold">ORD-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</Text>
                </Box>
                
                <Text textAlign="center">
                A confirmation email will be sent to your registered email address.
                </Text>
                
                <Box w="100%" pt={6}>
                <Button 
                    colorScheme="blue" 
                    size="lg" 
                    w="100%"
                    onClick={handleContinueShopping}
                >
                    Continue Shopping
                </Button>
                </Box>
            </VStack>
            </Box>
        </Flex>
        </Container>
    );
    };

export default CheckoutSuccessPage;