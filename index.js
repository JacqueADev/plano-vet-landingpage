document.addEventListener('DOMContentLoaded', function() {
    const coverageButtons = document.querySelectorAll('.btn-more');
    
    coverageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            
            document.getElementById('coverage').scrollIntoView({
                behavior: 'smooth'
            });
            
            // Esconde todos os cards
            document.querySelectorAll('.coverage-card').forEach(card => {
                card.style.display = 'none';
            });
            
            // Mostra apenas o card correspondente
            document.getElementById(`coverage-${serviceType}`).style.display = 'block';
        });
    });
});