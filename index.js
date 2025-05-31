document.addEventListener('DOMContentLoaded', function() {
    // 1. Botões de navegação para as coberturas
    const coverageButtons = document.querySelectorAll('.btn-more');
    
    coverageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            
            document.getElementById(`coverage-${serviceType}`).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // 2. Função para enviar formulário principal para WhatsApp (ATUALIZADA)
    function sendToWhatsApp() {
        // Coletando TODOS os dados do formulário
        const formData = {
            tutorName: document.getElementById('tutorName').value,
            phone: document.getElementById('phone').value,
            cpf: document.getElementById('cpf').value,
            email: document.getElementById('email').value,
            adress: document.getElementById('adress').value,
            neighbor: document.getElementById('neighbor').value,
            city: document.getElementById('city').value,
            cep: document.getElementById('cep').value,
            petName: document.getElementById('petName').value,
            species: document.getElementById('species').value,
            gender: document.getElementById('gender').value,
            raca: document.getElementById('raca').value,
            age: document.getElementById('age').value,
            castrado: document.getElementById('castrado').value,
            petCount: document.getElementById('petCount').value,
            plan: document.getElementById('plan').value,
            message: document.getElementById('message').value
        };

        // Validação dos campos obrigatórios
        if (!formData.tutorName || !formData.phone || !formData.cpf || !formData.petName || !formData.species || !formData.plan) {
            alert('Por favor, preencha todos os campos obrigatórios (marcados com *)');
            return;
        }

        // Criar mensagem detalhada
        let whatsappMessage = `📋 *SOLICITAÇÃO DE CONTRATAÇÃO* 📋\n\n`;
        whatsappMessage += `*DADOS DO TUTOR*\n`;
        whatsappMessage += `▪ Nome: ${formData.tutorName}\n`;
        whatsappMessage += `▪ Telefone: ${formData.phone}\n`;
        whatsappMessage += `▪ CPF: ${formData.cpf}\n`;
        if (formData.email) whatsappMessage += `▪ Email: ${formData.email}\n`;
        whatsappMessage += `\n*ENDEREÇO*\n`;
        if (formData.adress) whatsappMessage += `▪ Logradouro: ${formData.adress}\n`;
        if (formData.neighbor) whatsappMessage += `▪ Bairro: ${formData.neighbor}\n`;
        if (formData.city) whatsappMessage += `▪ Cidade: ${formData.city}\n`;
        if (formData.cep) whatsappMessage += `▪ CEP: ${formData.cep}\n`;
        
        whatsappMessage += `\n*DADOS DO PET*\n`;
        whatsappMessage += `▪ Nome: ${formData.petName}\n`;
        whatsappMessage += `▪ Espécie: ${formData.species}\n`;
        if (formData.gender) whatsappMessage += `▪ Sexo: ${formData.gender}\n`;
        if (formData.raca) whatsappMessage += `▪ Raça: ${formData.raca}\n`;
        if (formData.age) whatsappMessage += `▪ Idade: ${formData.age}\n`;
        if (formData.castrado) whatsappMessage += `▪ Castrado: ${formData.castrado}\n`;
        
        whatsappMessage += `\n*PLANO SOLICITADO*\n`;
        whatsappMessage += `▪ Plano: ${formData.plan}\n`;
        whatsappMessage += `▪ Quantidade de animais: ${formData.petCount}\n`;
        
        if (formData.message) {
            whatsappMessage += `\n*MENSAGEM ADICIONAL*\n${formData.message}\n`;
        }

        // Codificar e enviar
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappNumber = "5516999644497";
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    }

    // 3. Função para enviar formulário de dúvidas para WhatsApp (ATUALIZADA)
    function sendDoubtsToWhatsApp() {
        const formData = {
            name: document.getElementById('doubtsName').value,
            phone: document.getElementById('doubtsPhone').value,
            email: document.getElementById('doubtsEmail').value,
            message: document.getElementById('doubtsMessage').value
        };

        if (!formData.name || !formData.phone || !formData.message) {
            alert('Por favor, preencha pelo menos o nome, telefone e sua dúvida');
            return;
        }

        let whatsappMessage = `❓ *SOLICITAÇÃO DE INFORMAÇÕES* ❓\n\n`;
        whatsappMessage += `*Nome:* ${formData.name}\n`;
        whatsappMessage += `*Telefone:* ${formData.phone}\n`;
        if (formData.email) whatsappMessage += `*Email:* ${formData.email}\n`;
        whatsappMessage += `\n*DÚVIDA:*\n${formData.message}`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappNumber = "5516999644497";
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    }

    // 4. Funcionalidade do FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            const icon = question.querySelector('i');
            
            // Fecha outros itens
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = '0';
                    item.querySelector('.faq-answer').style.padding = '0 20px';
                    item.querySelector('i').classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            });
            
            // Alterna item atual
            faqItem.classList.toggle('active');
            
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '20px';
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            } else {
                answer.style.maxHeight = '0';
                answer.style.padding = '0 20px';
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
        });
    });

    // 5. Event Listeners para os botões
    if (document.querySelector('.form-submit')) {
        document.querySelector('.form-submit').addEventListener('click', sendToWhatsApp);
    }
    
    if (document.querySelector('.doubts-submit')) {
        document.querySelector('.doubts-submit').addEventListener('click', sendDoubtsToWhatsApp);
    }

    // 6. (Opcional) Abrir primeiro item do FAQ por padrão
    const firstFaqItem = document.querySelector('.faq-item');
    if (firstFaqItem) {
        firstFaqItem.classList.add('active');
        const firstAnswer = firstFaqItem.querySelector('.faq-answer');
        const firstIcon = firstFaqItem.querySelector('i');
        firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
        firstAnswer.style.padding = '20px';
        firstIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    }

    // 7. Validação do CPF (Adicional)
    document.getElementById('cpf')?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });

    // 8. Validação do CEP (Adicional)
    document.getElementById('cep')?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    });
});