import { Container, HStack, useColorModeValue, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cart";


const CartPage = () => {
    // State management for cart data
    const { 
        cart, 
        fetchCart, 
        removeFromCart, 
        updateItemQuantity,
        clearCart 
      } = useCartStore();
    
    const toast = useToast();
    const navigate = useNavigate();

    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");

    //Fetch cart on component mount
    useEffect(() => {
        const loadCart = async () => {
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
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
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
            })
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
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
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

}

export default CartPage;