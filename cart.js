document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const orderSuccess = document.getElementById('order-success');

    // Retrieve cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to render cart items
    function renderCartItems() {
        cartItemsContainer.innerHTML = ''; // Clear existing items
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalElement.textContent = '0';
            return;
        }

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Size: ${item.size}</p>
                    <p>Price: ₹${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = total.toFixed(2);
    }

    // Clear cart function
    function clearCart() {
        localStorage.removeItem('cart');
        cart = [];
        renderCartItems(); // Refresh the cart display
    }

    // Place order function
    function placeOrder() {
        localStorage.removeItem('cart');
        cart = [];
        renderCartItems(); // Refresh the cart display

        // Show success message with animation
        orderSuccess.style.display = 'block';
        orderSuccess.classList.add('animate');
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            orderSuccess.classList.remove('animate');
            orderSuccess.style.display = 'none';
        }, 8000);
    }

    // Attach event listener to clear cart button
    clearCartBtn.addEventListener('click', clearCart);

    // Attach event listener to place order button
    placeOrderBtn.addEventListener('click', placeOrder);

    // Render cart items on page load
    renderCartItems();
});
