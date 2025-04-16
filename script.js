// iPad Activity View - Dark Mode Interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Simulating action click effects
    const actions = document.querySelectorAll('.action');
    actions.forEach(action => {
        action.addEventListener('click', function() {
            // Add active class
            this.classList.add('action-active');
            
            // Remove active class after short delay
            setTimeout(() => {
                this.classList.remove('action-active');
            }, 200);
        });
    });
    
    // Close button functionality
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            const activityView = document.querySelector('.activity-view');
            
            // Add closing animation
            activityView.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            activityView.style.transform = 'translate(-50%, -50%) scale(0.9)';
            activityView.style.opacity = '0';
            
            // Reset after animation
            setTimeout(() => {
                activityView.style.display = 'none';
                
                // Show it again after 1 second for demo purposes
                setTimeout(() => {
                    activityView.style.display = 'flex';
                    activityView.style.opacity = '0';
                    activityView.style.transform = 'translate(-50%, -50%) scale(0.9)';
                    
                    // Animate back in
                    setTimeout(() => {
                        activityView.style.opacity = '1';
                        activityView.style.transform = 'translate(-50%, -50%) scale(1)';
                    }, 50);
                }, 1000);
            }, 300);
        });
    }
    
    // Add custom pill indicator for touch feedback
    function createRippleEffect(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        
        ripple.classList.add('active');
        
        setTimeout(() => {
            ripple.remove();
        }, 500);
    }
    
    // Apply ripple effect to actions
    actions.forEach(action => {
        action.addEventListener('mousedown', createRippleEffect);
    });
    
    // Add CSS for the active states and ripple
    const style = document.createElement('style');
    style.textContent = `
        .action-active {
            background-color: rgba(60, 60, 60, 0.5) !important;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.2);
            transform: scale(0);
            animation: ripple-animation 0.5s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .action {
            position: relative;
            overflow: hidden;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .action:active {
            background-color: rgba(60, 60, 60, 0.5);
        }
        
        .close-button {
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .close-button:hover {
            background-color: rgba(60, 60, 60, 0.7);
        }
        
        .edit-actions {
            cursor: pointer;
            transition: opacity 0.2s;
        }
        
        .edit-actions:hover {
            opacity: 0.7;
        }
        
        /* Dark mode specific hover effects */
        .contact:hover .contact-name,
        .app:hover .app-name {
            color: var(--dark-accent);
        }
        
        /* Add some glow effect to app icons on hover */
        .app-icon:hover {
            box-shadow: 0 0 10px rgba(10, 132, 255, 0.3);
        }
        
        /* Add smooth transitions */
        .activity-view {
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
    `;
    
    document.head.appendChild(style);
});
