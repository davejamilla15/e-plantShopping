import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

// CartItem component displays all items in the shopping cart
// and allows users to update quantities or remove items
const CartItem = ({ onContinueShopping }) => {

    // Get cart items from Redux store
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Calculate the total amount for all items in the cart
    const calculateTotalAmount = () => {
        let total = 0;

        cart.forEach((item) => {
            const price = parseFloat(item.cost.substring(1)); // Convert "$xx" → number
            total += price * item.quantity; // Multiply price by quantity
        });

        return total.toFixed(2); // Format to 2 decimal places
    };

    // Handle navigation back to product list
    const handleContinueShopping = (e) => {
        onContinueShopping(e);
    };

    // Temporary checkout handler (placeholder functionality)
    const handleCheckoutShopping = () => {
        alert(`Proceeding to checkout.\nTotal: $${calculateTotalAmount()}`);
    };

    // Increase item quantity by 1
    const handleIncrement = (item) => {
        dispatch(
            updateQuantity({
                name: item.name,
                quantity: item.quantity + 1,
            })
        );
    };

    // Decrease item quantity by 1
    // If quantity becomes 0, remove item from cart
    const handleDecrement = (item) => {
        if (item.quantity <= 1) {
            dispatch(removeItem(item.name)); // Remove item completely
        } else {
            dispatch(
                updateQuantity({
                    name: item.name,
                    quantity: item.quantity - 1,
                })
            );
        }
    };

    // Remove item from cart regardless of quantity
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    // Calculate subtotal for a single cart item
    const calculateTotalCost = (item) => {
        const price = parseFloat(item.cost.substring(1));
        return (price * item.quantity).toFixed(2);
    };

    return (
        <div className="cart-container">

            {/* Display total cart amount */}
            <h2 style={{ color: 'black' }}>
                Total Cart Amount: ${calculateTotalAmount()}
            </h2>

            {/* Render all cart items */}
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        
                        {/* Product image */}
                        <img
                            className="cart-item-image"
                            src={item.image}
                            alt={item.name}
                        />

                        <div className="cart-item-details">

                            {/* Product name and price */}
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>

                            {/* Quantity controls */}
                            <div className="cart-item-quantity">
                                <button
                                    className="cart-item-button cart-item-button-dec"
                                    onClick={() => handleDecrement(item)}
                                >
                                    -
                                </button>

                                <span className="cart-item-quantity-value">
                                    {item.quantity}
                                </span>

                                <button
                                    className="cart-item-button cart-item-button-inc"
                                    onClick={() => handleIncrement(item)}
                                >
                                    +
                                </button>
                            </div>

                            {/* Subtotal for this item */}
                            <div className="cart-item-total">
                                Total: ${calculateTotalCost(item)}
                            </div>

                            {/* Remove item button */}
                            <button
                                className="cart-item-delete"
                                onClick={() => handleRemove(item)}
                            >
                                Delete
                            </button>

                        </div>
                    </div>
                ))}
            </div>

            {/* Action buttons */}
            <div className="continue_shopping_btn">
                <button
                    className="get-started-button"
                    onClick={(e) => handleContinueShopping(e)}
                >
                    Continue Shopping
                </button>

                <br />

                <button
                    className="get-started-button1"
                    onClick={handleCheckoutShopping}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartItem;