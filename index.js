document.addEventListener('DOMContentLoaded', function() {
    const coverageButtons = document.querySelectorAll('.btn-more');
    
    coverageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            
            // Rolagem suave para o card específico
            document.getElementById(`coverage-${serviceType}`).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
});