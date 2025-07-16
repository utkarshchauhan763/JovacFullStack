document.addEventListener('DOMContentLoaded', function() {
    const instrumentCards = document.querySelectorAll('.instrument-card');
    
    instrumentCards.forEach(card => {
        const soundType = card.dataset.sound;
        const audioElement = document.getElementById(`${soundType}-audio`);
        
        if (audioElement) {
            audioElement.volume = 0.5;
            
            // Play on hover
            card.addEventListener('mouseenter', function() {
                card.classList.add('playing');
                audioElement.currentTime = 0;
                audioElement.play();
            });
            
            // Stop on mouse leave
            card.addEventListener('mouseleave', function() {
                card.classList.remove('playing');
                audioElement.pause();
                audioElement.currentTime = 0;
            });
        }
    });
});