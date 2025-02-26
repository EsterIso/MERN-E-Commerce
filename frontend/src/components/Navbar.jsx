import { Container, Flex, HStack, Text, Button, useColorMode } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons"
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useState, useEffect } from 'react';

const Navbar = () => {
  const {colorMode, toggleColorMode } = useColorMode();
  const [isCartCreated, setIsCartCreated] = useState(false);

  const createCart = async () => {
    try {
      const res = await fetch('/api/cart/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to create cart');
      }

      const data = await res.json();
      setIsCartCreated(true); // Set cart as created when successful
    } catch (error) {
      console.error('Error creating cart:', error);
      setIsCartCreated(false); // Handle errors if cart creation fails
    }
  };

  useEffect(() => {
    if (isCartCreated) return; // Avoid re-creating the cart if it's already created
  }, [isCartCreated]);

  return <Container maxW={"1140px"} px={4} >
    <Flex
    h={16}
    alignItems={"center"}
    justifyContent={"space-between"}
    flexDirection={{
        base:"column",
        sm:'row'
    }}
    >

    <Text
	    fontSize={{ base: "22", sm: "28" }}
		fontWeight={"bold"}
		textTransform={"uppercase"}
		textAlign={"center"}
		bgGradient={"linear(to-r, cyan.400, blue.500)"}
		bgClip={"text"}
	>
		<Link to={"/"}>Product Store 🛒</Link>
	  </Text>
    <HStack spacing={2} alignItems={"center"}>
      <Link to={"/create"}>
        <Button>
          <PlusSquareIcon fontSize={20}/>
        </Button>
      </Link>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <IoMoon/> : <LuSun size="20"/>}
      </Button>
      <SignedOut>
        <Button>
          <SignInButton />
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
          {/* Call createCart if the user is signed in */}
          { !isCartCreated && createCart() }
      </SignedIn>
    </HStack>
  </Flex>
  </Container>
}

export default Navbar