document.addEventListener('DOMContentLoaded', function() {
    // Código existente para os botões de cobertura
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

    // Código existente para o formulário principal
    function sendToWhatsApp() {
        // Coletando os dados do formulário
        const tutorName = document.getElementById('tutorName').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const city = document.getElementById('city').value;
        const petName = document.getElementById('petName').value;
        const species = document.getElementById('species').value;
        const age = document.getElementById('age').value;
        const petCount = document.getElementById('petCount').value;
        const plan = document.getElementById('plan').value;
        const message = document.getElementById('message').value;

        // Validar campos obrigatórios
        if (!tutorName || !phone || !petName || !species || !plan) {
            alert('Por favor, preencha todos os campos obrigatórios (marcados com *)');
            return;
        }

        // Criar a mensagem para o WhatsApp
        let whatsappMessage = `Olá, gostaria de contratar um plano para meu pet!\n\n`;
        whatsappMessage += `*Nome do tutor:* ${tutorName}\n`;
        whatsappMessage += `*Telefone:* ${phone}\n`;
        if (email) whatsappMessage += `*Email:* ${email}\n`;
        if (city) whatsappMessage += `*Cidade:* ${city}\n`;
        whatsappMessage += `*Nome do pet:* ${petName}\n`;
        whatsappMessage += `*Espécie:* ${species}\n`;
        if (age) whatsappMessage += `*Idade:* ${age}\n`;
        whatsappMessage += `*Quantidade de animais:* ${petCount}\n`;
        whatsappMessage += `*Plano de interesse:* ${plan}\n`;
        if (message) whatsappMessage += `\n*Mensagem adicional:*\n${message}`;

        // Codificar a mensagem para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Substitua pelo número de WhatsApp desejado (apenas números, sem espaços ou caracteres especiais)
        const whatsappNumber = "5511999999999"; // Exemplo: 55 (Brasil) + 11 (DDD) + 999999999 (número)

        // Criar o link do WhatsApp
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Abrir o WhatsApp em uma nova aba
        window.open(whatsappUrl, '_blank');
    }

    // Código existente para o formulário de dúvidas
    function sendDoubtsToWhatsApp() {
        // Coletando os dados do formulário de dúvidas
        const name = document.getElementById('doubtsName').value;
        const phone = document.getElementById('doubtsPhone').value;
        const email = document.getElementById('doubtsEmail').value;
        const message = document.getElementById('doubtsMessage').value;

        // Validar campos obrigatórios
        if (!name || !phone || !message) {
            alert('Por favor, preencha pelo menos o nome, telefone e sua dúvida');
            return;
        }

        // Criar a mensagem para o WhatsApp
        let whatsappMessage = `Olá, tenho uma dúvida sobre os planos veterinários!\n\n`;
        whatsappMessage += `*Nome:* ${name}\n`;
        whatsappMessage += `*Telefone:* ${phone}\n`;
        if (email) whatsappMessage += `*Email:* ${email}\n`;
        whatsappMessage += `\n*Minha dúvida:*\n${message}`;

        // Codificar a mensagem para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Use o mesmo número do formulário principal ou um diferente se preferir
        const whatsappNumber = "5511999999999"; // Substitua pelo número real

        // Criar o link do WhatsApp
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Abrir o WhatsApp em uma nova aba
        window.open(whatsappUrl, '_blank');
    }

    // Novo código para o FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = question.nextElementSibling;
            
            // Fecha todas as outras respostas
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = '0';
                    item.querySelector('.faq-answer').style.padding = '0 20px';
                }
            });
            
            // Alterna a resposta atual
            faqItem.classList.toggle('active');
            
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '0 20px';
            } else {
                answer.style.maxHeight = '0';
                answer.style.padding = '0 20px';
            }
        });
    });

    // Adicionando os event listeners para os botões de envio
    if (document.querySelector('.form-submit')) {
        document.querySelector('.form-submit').addEventListener('click', sendToWhatsApp);
    }
    
    if (document.querySelector('.doubts-submit')) {
        document.querySelector('.doubts-submit').addEventListener('click', sendDoubtsToWhatsApp);
    }
});