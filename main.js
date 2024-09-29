document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links ul');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Optional: Close the menu when clicking outside of it
    document.addEventListener('click', (event) => {
        if (!menuIcon.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Carousel functionality
    let currentSlide = 0;
    const slideDuration = 4000; // 4 seconds
    
    // Function to show the current slide
    function showSlide(index) {
        const slides = document.querySelectorAll('.slides');
        const totalSlides = slides.length;
    
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Reset index if it exceeds the total number of slides
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
    
        // Show the current slide
        slides[currentSlide].classList.add('active');
        slides[currentSlide].play();  // Play the video
    }
    
    // Function to change the slide based on direction
    function changeSlide(direction) {
        showSlide(currentSlide + direction);
    }
    
    // Automatically change the slide every 4 seconds
    setInterval(() => {
        changeSlide(1);
    }, slideDuration);
    
    // Event listeners for previous and next buttons
    document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
    document.querySelector('.next').addEventListener('click', () => changeSlide(1));
    
    // Initialize the first slide
    showSlide(0);

    // Add to Cart functionality
    function addToCart(button) {
        const box = button.closest('.box'); // Target the closest box to the button

        // Extract price and remove the currency symbol for correct parsing
        const priceText = box.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace('₹', '').replace('/-', '').trim());

        // Extract size and handle the case when no size is selected
        const size = box.querySelector('input[type="radio"]:checked')?.value || 'Not selected';

        if (size === 'Not selected') {
            alert('Please select a size');
            return;
        }

        // Create the item object
        const item = {
            name: box.querySelector('h3').textContent,
            price: price,
            size: size,
            image: box.querySelector('.item-image').src,
            quantity: 1 // Default quantity
        };

        // Retrieve existing cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the item already exists in the cart
        const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name && cartItem.size === item.size);
        
        if (existingItemIndex > -1) {
            // If item exists, update the quantity
            cart[existingItemIndex].quantity += 1;
        } else {
            // If item doesn't exist, add it to the cart
            cart.push(item);
        }

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`Added to cart:\n${item.name}\nPrice: ₹${price}\nSize: ${size}`);
    }
});
