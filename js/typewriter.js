// Typewriter Animation
document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    typewriterElement.classList.add('typing');
    
    let i = 0;
    const typeSpeed = 150; // Speed in milliseconds
    
    function typeWriter() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            // Remove typing class when animation is complete
            setTimeout(() => {
                typewriterElement.classList.remove('typing');
            }, 1000);
        }
    }
    
    // Start the typewriter animation after a short delay
    setTimeout(typeWriter, 500);
});

// Stats counter animation
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isPercentage = finalValue.includes('%');
                const isPlus = finalValue.includes('+');
                
                // Extract numeric value
                const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
                
                animateCounter(target, 0, numericValue, isPercentage, isPlus);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
    
    function animateCounter(element, start, end, isPercentage, isPlus) {
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(start + (end - start) * easeOutQuart);
            
            let displayValue = currentValue;
            if (isPercentage) displayValue += '%';
            if (isPlus) displayValue += '+';
            
            element.textContent = displayValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
}); 