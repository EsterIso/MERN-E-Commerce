import { Container, HStack, useColorModeValue, useToast, Box, Heading, 
  Text, Button, VStack, Divider, Flex, IconButton, Image, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cart";
import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons";

const CartPage = () => {
// State management for cart data
const { 
 cart, 
 fetchCart, 
 removeFromCart, 
 updateItemQuantity,
 clearCart 
} = useCartStore();

const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
const [isLoading, setIsLoading] = useState(true);

const toast = useToast();
const navigate = useNavigate();

const bgColor = useColorModeValue("white", "gray.800");
const borderColor = useColorModeValue("gray.200", "gray.700");

// Fetch cart on component mount
useEffect(() => {
 const loadCart = async () => {
     setIsLoading(true);
     try {
         const { success, message } = await fetchCart();
         if (!success) {
             toast({
                 title: "Error",
                 description: message,
                 status: "error",
                 duration: 3000,
                 isClosable: true,
             });
         }
     } catch (error) {
         console.error("Error loading cart:", error);
         toast({
             title: "Error",
             description: "Failed to load cart",
             status: "error",
             duration: 3000,
             isClosable: true,
         });
     } finally {
         setIsLoading(false);
     }
 };
 
 loadCart();
}, [fetchCart, toast]);

const handleRemoveItem = async (itemId) => {
 const { success, message } = await removeFromCart(itemId);
 if (!success) {
     toast({
         title: "Error",
         description: message,
         status: "error",
         duration: 3000,
         isClosable: true,
     });
 } else {
     toast({
         title: "Success",
         description: message,
         status: "success",
         duration: 3000,
         isClosable: true,
     });
 }
};

const handleUpdateQuantity = async (itemId, quantity) => {
 if (quantity < 1) return;

 const { success, message } = await updateItemQuantity(itemId, quantity);
 if (!success) {
     toast({
         title: "Error",
         description: message,
         status: "error",
         duration: 3000,
         isClosable: true,
     });
 }
};

const handleClearCart = async () => {
 const { success, message } = await clearCart();
 if (!success) {
     toast({
         title: "Error",
         description: message,
         status: "error",
         duration: 3000,
         isClosable: true,
     });
 } else {
     toast({
         title: "Success",
         description: message,
         status: "success",
         duration: 3000,
         isClosable: true,
     });
 }
};

const handleCheckout = async () => {
 setIsCheckoutLoading(true);
 try {
     const response = await fetch('/api/stripe/create-checkout-session', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
     });
     
     const data = await response.json();
     
     if (data.success) {
         // Redirect to Stripe Checkout
         window.location.href = data.url;
     } else {
         throw new Error(data.message || 'Failed to create checkout session');
     }
 } catch (error) {
     toast({
         title: "Checkout Error",
         description: error.message,
         status: "error",
         duration: 3000,
         isClosable: true,
     });
 } finally {
     setIsCheckoutLoading(false);
 }
};

const handleContinueShopping = () => {
 navigate('/'); // Adjust to your product listing route
};

// Render loading state
if (isLoading) {
 return (
     <Container maxW="container.xl" py={10}>
         <Flex justify="center" align="center" h="50vh">
             <Spinner size="xl" />
             <Text ml={4}>Loading your cart...</Text>
         </Flex>
     </Container>
 );
}

// Render empty cart state
if (!cart.items || cart.items.length === 0) {
 return (
     <Container maxW="container.xl" py={10}>
         <Box 
             p={8} 
             bg={bgColor} 
             borderRadius="lg" 
             boxShadow="md" 
             borderWidth="1px" 
             borderColor={borderColor}
         >
             <VStack spacing={6} align="center">
                 <Heading size="xl">Your Cart is Empty</Heading>
                 <Text>Looks like you haven't added any items to your cart yet.</Text>
                 <Button 
                     colorScheme="blue" 
                     size="lg" 
                     onClick={handleContinueShopping}
                 >
                     Continue Shopping
                 </Button>
             </VStack>
         </Box>
     </Container>
 );
}

return (
 <Container maxW="container.xl" py={10}>
     <Heading mb={6}>Your Shopping Cart</Heading>
     
     <Flex direction={{ base: "column", lg: "row" }} gap={8}>
         {/* Cart Items Section */}
         <Box 
             flex="3" 
             p={6} 
             bg={bgColor} 
             borderRadius="lg" 
             boxShadow="md" 
             borderWidth="1px" 
             borderColor={borderColor}
         >
             <VStack spacing={4} align="stretch">
                 {cart.items.map((item) => (
                     <Box key={item._id} p={4} borderWidth="1px" borderRadius="md">
                         <Flex justify="space-between" align="center">
                             <Box flex="1">
                              <Image src={ item.image } alt={`Product ${item.name}`} h={20} w='auto' objectFit='cover'/> 
                              <Text fontWeight="bold">Product: {item.name}</Text>
                              <Text fontWeight="bold">ProductID: {item.productID}</Text>
                              <Text color="gray.600">${item.price.toFixed(2)}</Text>
                             </Box>
                             
                             <HStack spacing={3}>
                                 <IconButton
                                     icon={<MinusIcon />}
                                     size="sm"
                                     onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                                     isDisabled={item.quantity <= 1}
                                     aria-label="Decrease quantity"
                                 />
                                 <Text fontWeight="medium" w="30px" textAlign="center">
                                     {item.quantity}
                                 </Text>
                                 <IconButton
                                     icon={<AddIcon />}
                                     size="sm"
                                     onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                                     aria-label="Increase quantity"
                                 />
                                 
                                 <IconButton
                                     icon={<DeleteIcon />}
                                     colorScheme="red"
                                     variant="ghost"
                                     onClick={() => handleRemoveItem(item._id)}
                                     aria-label="Remove item"
                                 />
                             </HStack>
                             
                             <Text fontWeight="bold" ml={4} w="100px" textAlign="right">
                                 ${(item.price * item.quantity).toFixed(2)}
                             </Text>
                         </Flex>
                     </Box>
                 ))}
             </VStack>
             
             <Button
                 mt={6}
                 colorScheme="red"
                 variant="outline"
                 onClick={handleClearCart}
                 size="sm"
             >
                 Clear Cart
             </Button>
         </Box>
         
         {/* Order Summary Section */}
         <Box 
             flex="1" 
             p={6}
             bg={bgColor} 
             borderRadius="lg" 
             boxShadow="md"
             borderWidth="1px" 
             borderColor={borderColor}
             h="fit-content"
         >
             <Heading size="md" mb={4}>Order Summary</Heading>
             
             <VStack spacing={4} align="stretch">
                 <Flex justify="space-between">
                     <Text>Subtotal</Text>
                     <Text fontWeight="bold">${cart.totalPrice.toFixed(2)}</Text>
                 </Flex>
                 
                 <Divider />
                 
                 <Flex justify="space-between">
                     <Text fontWeight="bold">Total</Text>
                     <Text fontWeight="bold" fontSize="xl">${cart.totalPrice.toFixed(2)}</Text>
                 </Flex>
                 
                 <Button
                     colorScheme="blue"
                     size="lg"
                     mt={4}
                     w="100%"
                     isLoading={isCheckoutLoading}
                     loadingText="Processing"
                     onClick={handleCheckout}
                 >
                     Proceed to Checkout
                 </Button>
                 
                 <Button
                     variant="outline"
                     size="md"
                     w="100%"
                     onClick={handleContinueShopping}
                 >
                     Continue Shopping
                 </Button>
             </VStack>
         </Box>
     </Flex>
 </Container>
);
};

export default CartPage;