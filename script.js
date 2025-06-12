// ===== STICKY HEADER EFFECT =====
const mainHeader = document.querySelector('.main-header');

function handleScroll() {
    if (window.pageYOffset > 50) {
        mainHeader.classList.add('scrolled');
    } else {
        mainHeader.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

// ===== MOBILE NAVIGATION TOGGLE =====
const menuToggle = document.querySelector('.menu-toggle');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
const closeBtn = document.querySelector('.close-btn');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-overlay a');

// Open mobile menu
menuToggle.addEventListener('click', () => {
    mobileNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
});

// Close mobile menu
closeBtn.addEventListener('click', () => {
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close mobile menu when nav link is clicked
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
mobileNavOverlay.addEventListener('click', (e) => {
    if (e.target === mobileNavOverlay) {
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===== HERO SLIDESHOW =====
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Change slide every 5 seconds
setInterval(showNextSlide, 5000);

// ===== SMOOTH SCROLLING =====
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = mainHeader.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== CONTACT FORM HANDLING =====
// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

const contactForm = document.querySelector('.contact-form-element');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validate form data
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;
    
    // Prepare template parameters for EmailJS
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_name: 'Aarush Kumar' // Your name
    };
    
    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('Email sent successfully:', response.status, response.text);
            
            submitBtn.textContent = 'MESSAGE SENT!';
            submitBtn.style.backgroundColor = '#28a745';
            submitBtn.style.borderColor = '#28a745';
            
            // Reset form
            contactForm.reset();
            
            // Show success notification
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = 'transparent';
                submitBtn.style.borderColor = 'var(--accent-color)';
                submitBtn.disabled = false;
            }, 3000);
            
        }, function(error) {
            console.error('Email sending failed:', error);
            
            submitBtn.textContent = 'SEND FAILED';
            submitBtn.style.backgroundColor = '#dc3545';
            submitBtn.style.borderColor = '#dc3545';
            
            // Show error notification
            showNotification('Failed to send message. Please try again or contact me directly.', 'error');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = 'transparent';
                submitBtn.style.borderColor = 'var(--accent-color)';
                submitBtn.disabled = false;
            }, 3000);
        });
});

// ===== DYNAMIC GALLERY LOAD =====
// List of all images in ALL Photos (update this list if you add/remove files)
const galleryImageList = [
    "1000043261.jpg","1000040388.jpg","Concert1.jpeg","Concert2.jpeg","1000043174.jpg","Concert3.jpeg","1000043203.jpg","Concert5.jpeg","Concert4.jpeg","Concert6.jpeg","1000043278.jpg","1000043292.jpg","1000043750.jpg","1000043787.jpg","1000044265.jpg","1000044090.jpg","1000044271.jpg","1000047872.jpg","1000049148.jpg","1000055332.jpg","1000055375.jpg","1000055636.jpg","1000055657.jpg","1000055668.jpg","1000056531.jpg","1000056533.jpg",
    // ...add all other filenames from ALL Photos here...
    "20220520022637_IMG_9428-01.jpeg","20220520022807_IMG_9435-01.jpeg","20220616025659_IMG_9572-01.jpeg","20220616025817_IMG_9575-01.jpeg","20220714235003_IMG_9855-01.jpeg","20220714235607_IMG_9869-01-01.jpeg","20220715000302_IMG_9879-01.jpeg","20220715000616_IMG_9882-01.jpeg","20220722003153_IMG_9992-01.jpeg","20220722022954_IMG_0314-01.jpeg","20220727013159_IMG_9219-01.jpeg","20220727013209_IMG_9221-01.jpeg","20220727013337_IMG_9226-01.jpeg","20220804012643_IMG_9301-01.jpeg","20220804013300_IMG_9308-01.jpeg","20220804013329_IMG_9312-01.jpeg","20220807001023_IMG_9424-01.jpeg","20220807001052_IMG_9426-01.jpeg","20220807001114_IMG_9428-01.jpeg","20220807001753_IMG_9432-01.jpeg","20220807001815_IMG_9436-02.jpeg","20220807001857_IMG_9441-01.jpeg","20220807001937_IMG_9449-01.jpeg","20220807002201_IMG_9457-01.jpeg","20220807002201_IMG_9457-02.jpeg","20220807005025_IMG_9528-01.jpeg","20220807005318_IMG_9544-01.jpeg","20220807005318_IMG_9544-02.jpeg","20220930044518_IMG_0045-01.jpeg","20220930044616_IMG_0049-01.jpeg","20220930044711_IMG_0051-01.jpeg","20220930044734_IMG_0054-01.jpeg","20220930045106_IMG_0058-01.jpeg","20220930045749_IMG_0071-01.jpeg","20221004004224_IMG_0287-01.jpeg","20221004004519_IMG_0292-01.jpeg","20221013011852_IMG_0309-01.jpeg","20221013012306_IMG_0311-01.jpeg","20221031013526_IMG_0343-01.jpeg","20221031013609_IMG_0347-01.jpeg","20221205032243_IMG_0370-01.jpeg","20221205032812_IMG_0384-01.jpeg","20221205033101_IMG_0390-01.jpeg","20221205033749_IMG_0430-01.jpeg","20221205034536_IMG_0444-01.jpeg","20230425034556_IMG_1240-01.jpeg"
    // ...add more as needed
];

function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';
    galleryImageList.forEach(filename => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        const img = document.createElement('img');
        img.src = `ALL Photos/${filename}`;
        img.alt = 'Photography';
        img.className = 'gallery-image';
        div.appendChild(img);
        galleryGrid.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', renderGallery);

// ===== GALLERY FUNCTIONALITY =====
// No progressive loading or show more button needed. All images are visible.

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial styles for gallery items
    galleryItems.forEach(item => {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
});

// Gallery lightbox functionality
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('.gallery-image');
        
        createLightbox(img.src, 'Photography', 'Aarush Kumar');
    });
});

function createLightbox(imageSrc, title, description) {
    // Remove existing lightbox
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }
    
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <div class="lightbox-close">&times;</div>
            <img src="${imageSrc}" alt="${title}" class="lightbox-image">
            <div class="lightbox-info">
                <h4>${title}</h4>
                <p>${description}</p>
            </div>
        </div>
    `;
    
    // Add lightbox styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    lightboxContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    `;
    
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    lightboxImage.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 8px;
    `;
    
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    lightboxClose.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
        transition: color 0.3s ease;
    `;
    
    const lightboxInfo = lightbox.querySelector('.lightbox-info');
    lightboxInfo.style.cssText = `
        color: white;
        margin-top: 1rem;
        font-family: 'Montserrat', sans-serif;
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 50);
    
    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // Close with Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// ===== LAZY LOADING FOR IMAGES =====
const images = document.querySelectorAll('.item-thumbnail, .gallery-image');

// Create intersection observer for lazy loading
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // Add fade-in effect
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            // Simulate loading effect
            setTimeout(() => {
                img.style.opacity = '1';
            }, 100);
            
            observer.unobserve(img);
        }
    });
});

// Observe all images
images.forEach(img => {
    imageObserver.observe(img);
});

// ===== GRID ITEM ANIMATIONS =====
const gridItems = document.querySelectorAll('.grid-item, .gallery-item');

// Create intersection observer for grid items
const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered animation delay
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1
});

// Set initial state and observe grid items
gridItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    gridObserver.observe(item);
});

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Set background color based on type
    let backgroundColor;
    switch(type) {
        case 'success':
            backgroundColor = '#28a745';
            break;
        case 'error':
            backgroundColor = '#dc3545';
            break;
        default:
            backgroundColor = '#007bff';
    }
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${backgroundColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        z-index: 2000;
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds (longer for error messages)
    const duration = type === 'error' ? 6000 : 4000;
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// ===== SCROLL PROGRESS INDICATOR =====
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-color), #ff6b35);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events for better performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll handler
window.removeEventListener('scroll', handleScroll);
window.addEventListener('scroll', throttle(handleScroll, 10));

// ===== INITIALIZE ON DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation to main content
    const main = document.querySelector('main');
    main.style.opacity = '0';
    main.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        main.style.opacity = '1';
    }, 100);
    
    console.log('Peter McKinnon website replica loaded successfully!');
});

// ===== HANDLE RESIZE EVENTS =====
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 992 && mobileNavOverlay.classList.contains('active')) {
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
