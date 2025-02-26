import { create } from 'zustand'

export const useCartStore = create((set, get) => ({
  cart: { items: [], totalPrice: 0 },
  
  // Set the entire cart state
  setCart: (cart) => set({ cart }),
  
  createCart: async () => {
    try {
        const res = await fetch('/api/cart/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            throw new Error(`Failed to create cart: ${res.statusText}`);
        }

        const data = await res.json();
        return data; // Return cart data for further use

    } catch (error) {
        console.error("Error creating cart:", error);
        return null; // Return null or handle error in UI
    }
},


  // Fetch the user's cart from the backend
  fetchCart: async () => {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      
      if (data.success || data.message === 'Cart exists or was created') {
        // Handle both response formats from your controllers
        set({ cart: data.data || data.cart }); // Update Zustand store with fetched cart
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Failed to fetch cart' };
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      return { success: false, message: "Failed to fetch cart" };
    }
  },
  
  // Add an item to the cart
  addToCart: async (productId, name, image, quantity, price) => {
    try {
      const res = await fetch("/api/cart/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId, name, image, quantity, price })
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Update the local cart state
        set({ cart: data.cart });
        return { success: true, message: data.message || "Item added to cart" };
      } else {
        return { success: false, message: data.message || 'Failed to add item to cart' };
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      return { success: false, message: "Failed to add item to cart" };
    }
  },
  
  // Remove an item from the cart
  removeFromCart: async (itemId) => {
    try {
      const res = await fetch(`/api/cart/items/${itemId}`, {
        method: "DELETE"
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Update the local cart state immediately
        set({ cart: data.data });
        return { success: true, message: "Item removed from cart" };
      } else {
        return { success: false, message: data.message || 'Failed to remove item from cart' };
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      return { success: false, message: "Failed to remove item from cart" };
    }
  },
  
  // Update the quantity of an item in the cart
  updateItemQuantity: async (itemId, quantity) => {
    try {
      const res = await fetch(`/api/cart/items/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ quantity })
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Update the local cart state
        set({ cart: data.data });
        return { success: true, message: "Item quantity updated" };
      } else {
        return { success: false, message: data.message || 'Failed to update item quantity' };
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
      return { success: false, message: "Failed to update item quantity" };
    }
  },
  
  // Clear the entire cart
  clearCart: async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE"
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Reset the cart to empty
        set({ cart: { items: [], totalPrice: 0 } });
        return { success: true, message: "Cart cleared" };
      } else {
        return { success: false, message: data.message || 'Failed to clear cart' };
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      return { success: false, message: "Failed to clear cart" };
    }
  },
  
  // Utility functions for cart management
  getCartItemCount: () => {
    const { cart } = get();
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  },
  
  isItemInCart: (productId) => {
    const { cart } = get();
    return cart.items.some(item => item.productID === productId);
  }
}));