document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // CONSTANTES E CONFIGURAÇÕES
    // =============================================
    const WHATSAPP_NUMBER = "5516999644497";
    
    // Dados para comparação de planos
    const planNames = {
        'basico': 'Plano Básico',
        'intermediario': 'Plano Intermediário',
        'premium': 'Plano Premium',
        'super-premium': 'Plano Super Premium',
        'silvestres': 'Plano Silvestres'
    };

    const planFeatures = {
        'basico': {
            'consultas': '2 ao ano',
            'consultas_noturnas': 'Limitadas',
            'vacinas': 'V10, Anti-rábica, V8',
            'exames_laboratoriais': 'Hemograma',
            'exames_imagem': 'Não incluídos',
            'cirurgias': 'Drenagem de abscesso, Abdominocentese',
            'internacao': 'Não incluída',
            'tratamentos_integrativos': 'Reiki, Cristalterapia',
            'preco': 'R$ 39,00'
        },
        'intermediario': {
            'consultas': '4 ao ano',
            'consultas_noturnas': '1 incluída',
            'vacinas': 'V10, Anti-rábica, V8',
            'exames_laboratoriais': 'Hemograma, Parasitológico, ALT, Uréia, Creatinina',
            'exames_imagem': 'Raio-X simples, Ultrassom',
            'cirurgias': 'Suturas, OSH até 25kg',
            'internacao': 'Limitada',
            'tratamentos_integrativos': 'Reiki, Cristalterapia',
            'preco': 'R$ 79,90'
        },
        'premium': {
            'consultas': '6 ao ano',
            'consultas_noturnas': '2 incluídas',
            'vacinas': 'V10, Anti-rábica, V8',
            'exames_laboratoriais': 'Hemograma completo, diversos exames bioquímicos',
            'exames_imagem': 'Raio-X, Ultrassom, Eletrocardiograma',
            'cirurgias': 'Ampla variedade incluindo ortopédicas',
            'internacao': 'Incluída por porte',
            'tratamentos_integrativos': 'Reiki, Cristalterapia, Radiestesia, Cromoterapia',
            'preco': 'R$ 119,90'
        },
        'super-premium': {
            'consultas': '8 ao ano',
            'consultas_noturnas': '3 incluídas',
            'vacinas': 'V10, Anti-rábica, V8',
            'exames_laboratoriais': 'Todos exames laboratoriais disponíveis',
            'exames_imagem': 'Todos exames de imagem incluindo Ecocardiograma',
            'cirurgias': 'Todas cirurgias incluindo especializadas',
            'internacao': 'Cobertura completa por porte',
            'tratamentos_integrativos': 'Todos tratamentos integrativos',
            'preco': 'R$ 179,90'
        },
        'silvestres': {
            'consultas': '5 ao ano',
            'consultas_noturnas': '2 incluídas',
            'vacinas': 'Depende da espécie',
            'exames_laboratoriais': 'Hemograma, Parasitológico, bioquímicos básicos',
            'exames_imagem': 'Raio-X, Ultrassom',
            'cirurgias': 'Procedimentos básicos para exóticos',
            'internacao': 'Limitada por porte',
            'tratamentos_integrativos': 'Reiki, Cristalterapia, Radiestesia, Cromoterapia',
            'preco': 'R$ 119,99'
        }
    };

    let currentPlanForComparison = '';
    
    // =============================================
    // 1. SCROLL SUAVE
    // =============================================
    function handleNavAndButtonScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Atualiza a URL sem recarregar a página
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        }
    }

    function handleCoverageButtons(e) {
        e.preventDefault();
        const serviceType = this.getAttribute('data-service');
        const targetElement = document.getElementById(`coverage-${serviceType}`);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    function setupSmoothScroll() {
        // Configura scroll para links de navegação e botões "contratar"
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        const hireButtons = document.querySelectorAll('a.btn[href^="#"], button.btn[href^="#"]');
        
        [...navLinks, ...hireButtons].forEach(element => {
            element.addEventListener('click', handleNavAndButtonScroll);
        });
        
        // Configura scroll específico para botões "Saiba Mais" (Coberturas)
        const coverageButtons = document.querySelectorAll('.btn-more');
        coverageButtons.forEach(button => {
            button.addEventListener('click', handleCoverageButtons);
        });

        // Adiciona botões de comparação
        const compareButtons = document.querySelectorAll('.compare-btn');
        compareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const planId = this.getAttribute('data-plan');
                openPlanSelector(planId);
            });
        });
    }

    // =============================================
    // 2. FORMULÁRIOS - FUNÇÕES UTILITÁRIAS
    // =============================================
    function getFormData(formId, fieldNames) {
        const formData = {};
        fieldNames.forEach(name => {
            const element = document.getElementById(`${formId}${name}`);
            formData[name] = element ? element.value.trim() : '';
        });
        return formData;
    }

    function validateRequiredFields(formData, requiredFields) {
        for (const field of requiredFields) {
            if (!formData[field]) {
                alert(`Por favor, preencha o campo obrigatório: ${field}`);
                return false;
            }
        }
        return true;
    }

    function openWhatsApp(message) {
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    }

    // =============================================
    // 3. FORMULÁRIO PRINCIPAL (WHATSAPP)
    // =============================================
    function buildMainFormMessage(formData) {
        let message = `📋 *SOLICITAÇÃO DE CONTRATAÇÃO* \n\n`;
        message += `*PLANO SOLICITADO*\n`;
        message += `▪ Plano: ${formData.plan}\n`;
        message += `▪ Quantidade de animais: ${formData.petCount}\n\n`;
        message += `*DADOS DO TUTOR*\n`;
        message += `▪ Nome: ${formData.tutorName}\n`;
        message += `▪ Telefone: ${formData.phone}\n`;
        message += `▪ CPF: ${formData.cpf}\n`;
        if (formData.email) message += `▪ Email: ${formData.email}\n`;
        message += `\n*ENDEREÇO*\n`;
        if (formData.adress) message += `▪ Logradouro: ${formData.adress}\n`;
        if (formData.neighbor) message += `▪ Bairro: ${formData.neighbor}\n`;
        if (formData.city) message += `▪ Cidade: ${formData.city}\n`;
        if (formData.cep) message += `▪ CEP: ${formData.cep}\n`;
        message += `\n*DADOS DO PET*\n`;
        message += `▪ Nome: ${formData.petName}\n`;
        message += `▪ Espécie: ${formData.species}\n`;
        if (formData.gender) message += `▪ Sexo: ${formData.gender}\n`;
        if (formData.raca) message += `▪ Raça: ${formData.raca}\n`;
        if (formData.age) message += `▪ Idade: ${formData.age}\n`;
        if (formData.castrado) message += `▪ Castrado: ${formData.castrado}\n`;
        if (formData.message) message += `\n*MENSAGEM ADICIONAL*\n${formData.message}\n`;
        
        return message;
    }

    function sendToWhatsApp() {
        const fieldNames = [
            'tutorName', 'phone', 'cpf', 'email', 'adress', 'neighbor', 
            'city', 'cep', 'petName', 'species', 'gender', 'raca', 
            'age', 'castrado', 'petCount', 'plan', 'message'
        ];
        
        const formData = getFormData('', fieldNames);
        const requiredFields = ['tutorName', 'phone', 'cpf', 'petName', 'species', 'plan'];
        
        if (!validateRequiredFields(formData, requiredFields)) return;
        
        const message = buildMainFormMessage(formData);
        openWhatsApp(message);
    }

    // =============================================
    // 4. FORMULÁRIO DE DÚVIDAS (WHATSAPP)
    // =============================================
    function buildDoubtsFormMessage(formData) {
        let message = `❓ *SOLICITAÇÃO DE INFORMAÇÕES* \n\n`;
        message += `*Nome:* ${formData.name}\n`;
        message += `*Telefone:* ${formData.phone}\n`;
        if (formData.email) message += `*Email:* ${formData.email}\n`;
        message += `\n*DÚVIDA:*\n${formData.message}`;
        return message;
    }

    function sendDoubtsToWhatsApp() {
        const fieldNames = ['name', 'phone', 'email', 'message'];
        const formData = getFormData('doubts', fieldNames);
        const requiredFields = ['name', 'phone', 'message'];
        
        if (!validateRequiredFields(formData, requiredFields)) return;
        
        const message = buildDoubtsFormMessage(formData);
        openWhatsApp(message);
    }

    // =============================================
    // 5. FAQ ACCORDION
    // =============================================
    function toggleFaqItem(faqItem) {
        const isActive = faqItem.classList.contains('active');
        const answer = faqItem.querySelector('.faq-answer');
        const icon = faqItem.querySelector('i');
        
        // Fecha todos os itens primeiro
        document.querySelectorAll('.faq-item.active').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = '0';
                item.querySelector('.faq-answer').style.padding = '0 20px';
                const itemIcon = item.querySelector('i');
                if (itemIcon) itemIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
        });
        
        // Alterna o item atual
        if (!isActive) {
            faqItem.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.padding = '20px';
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            faqItem.classList.remove('active');
            answer.style.maxHeight = '0';
            answer.style.padding = '0 20px';
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    }

    function setupFaqAccordion() {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.closest('.faq-item');
                if (faqItem) toggleFaqItem(faqItem);
            });
        });
        
        // Abre o primeiro item por padrão
        const firstFaqItem = document.querySelector('.faq-item');
        if (firstFaqItem) toggleFaqItem(firstFaqItem);
    }

    // =============================================
    // 6. MÁSCARAS DE FORMULÁRIO
    // =============================================
    function applyCpfMask(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    }

    function applyCepMask(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    }

    function setupFormMasks() {
        const cpfField = document.getElementById('cpf');
        if (cpfField) cpfField.addEventListener('input', applyCpfMask);
        
        const cepField = document.getElementById('cep');
        if (cepField) cepField.addEventListener('input', applyCepMask);
    }

    // =============================================
    // 7. SISTEMA DE COMPARAÇÃO DE PLANOS
    // =============================================
    function openPlanSelector(planId) {
        currentPlanForComparison = planId;
        document.getElementById('comparisonModal').style.display = 'block';
        
        // Atualiza as opções de comparação, excluindo o plano atual
        updateComparisonOptions(planId);
    }

    function updateComparisonOptions(currentPlanId) {
        const planOptionsContainer = document.querySelector('.plan-options');
        planOptionsContainer.innerHTML = '';
        
        // Adiciona apenas os planos que não são o atual
        for (const planId in planNames) {
            if (planId !== currentPlanId) {
                const button = document.createElement('button');
                button.className = 'btn comparison-option';
                button.setAttribute('data-plan', planId);
                button.textContent = planNames[planId];
                button.addEventListener('click', function() {
                    comparePlans(planId);
                });
                planOptionsContainer.appendChild(button);
            }
        }
    }

    function closeModal(modalId) {
        if (modalId) {
            document.getElementById(modalId).style.display = 'none';
        } else {
            document.getElementById('comparisonModal').style.display = 'none';
            document.getElementById('comparisonResultModal').style.display = 'none';
        }
    }

    function comparePlans(compareToPlan) {
        closeModal('comparisonModal');
        
        const plan1 = currentPlanForComparison;
        const plan2 = compareToPlan;
        
        // Cria o conteúdo da comparação
        const title = `Comparação: ${planNames[plan1]} vs ${planNames[plan2]}`;
        document.getElementById('comparisonTitle').textContent = title;
        
        let comparisonHTML = `
            <div class="table-responsive">
                <table class="comparison-table">
                    <tr>
                        <th>Característica</th>
                        <th>${planNames[plan1]}</th>
                        <th>${planNames[plan2]}</th>
                    </tr>
        `;
        
        // Adiciona linhas de comparação para cada característica
        for (const feature in planFeatures[plan1]) {
            const value1 = planFeatures[plan1][feature];
            const value2 = planFeatures[plan2][feature] || 'Não incluído';
            
            let rowClass = '';
            if (value1 === value2) {
                rowClass = 'same';
            } else if (feature === 'preco') {
                // Para preço, menor é melhor
                const price1 = parseFloat(value1.replace('R$ ', '').replace(',', '.'));
                const price2 = parseFloat(value2.replace('R$ ', '').replace(',', '.'));
                rowClass = price1 < price2 ? 'better' : 'worse';
            } else {
                // Para outras características, assumimos que mais é melhor
                rowClass = value1.length > value2.length ? 'better' : 'worse';
            }
            
            comparisonHTML += `
                <tr class="${rowClass}">
                    <td>${feature.charAt(0).toUpperCase() + feature.slice(1).replace('_', ' ')}</td>
                    <td>${value1}</td>
                    <td>${value2}</td>
                </tr>
            `;
        }
        
        // Adiciona vantagens principais
        comparisonHTML += `
                </table>
            </div>
            <div class="comparison-advantages">
                <div class="advantage-box">
                    <h4>Principais vantagens do ${planNames[plan1]}:</h4>
                    <ul>
                        ${getMainAdvantages(plan1, plan2).map(adv => `<li>${adv}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="advantage-box">
                    <h4>Principais vantagens do ${planNames[plan2]}:</h4>
                    <ul>
                        ${getMainAdvantages(plan2, plan1).map(adv => `<li>${adv}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        document.getElementById('comparisonContent').innerHTML = comparisonHTML;
        document.getElementById('comparisonResultModal').style.display = 'block';
    }

    function getMainAdvantages(plan, comparedTo) {
        const advantages = [];
        
        if (plan === 'basico') {
            advantages.push("Preço mais acessível");
            advantages.push("Cobertura básica para necessidades essenciais");
            advantages.push("Ideal para tutores com orçamento limitado");
        } else if (plan === 'intermediario') {
            advantages.push("Mais consultas que o Básico (4 vs 2)");
            advantages.push("Inclui mais exames laboratoriais");
            advantages.push("Cobertura para cirurgias básicas");
            advantages.push("Balanço ideal entre custo e benefício");
        } else if (plan === 'premium') {
            advantages.push("6 consultas anuais (2 podem ser de especialidade)");
            advantages.push("Cobertura ampla de cirurgias");
            advantages.push("Exames de imagem incluídos");
            advantages.push("Internação coberta");
            advantages.push("Tratamentos integrativos adicionais");
        } else if (plan === 'super-premium') {
            advantages.push("Cobertura mais completa (8 consultas)");
            advantages.push("Todas cirurgias e exames especializados");
            advantages.push("Internação com melhores benefícios");
            advantages.push("Todos tratamentos integrativos");
            advantages.push("Ideal para tutores que buscam máxima cobertura");
        } else if (plan === 'silvestres') {
            advantages.push("Especializado em animais exóticos");
            advantages.push("Procedimentos adaptados para espécies silvestres");
            advantages.push("5 consultas anuais (2 podem ser noturnas)");
            advantages.push("Cobertura para exames específicos de animais exóticos");
        }
        
        // Adiciona vantagem se for mais barato
        const price1 = parseFloat(planFeatures[plan]['preco'].replace('R$ ', '').replace(',', '.'));
        const price2 = parseFloat(planFeatures[comparedTo]['preco'].replace('R$ ', '').replace(',', '.'));
        
        if (price1 < price2) {
            advantages.push(`Preço mais baixo (${planFeatures[plan]['preco']} vs ${planFeatures[comparedTo]['preco']})`);
        }
        
        return advantages;
    }

    // =============================================
    // 8. EVENT LISTENERS
    // =============================================
    function setupEventListeners() {
        const formSubmit = document.querySelector('.form-submit');
        if (formSubmit) formSubmit.addEventListener('click', sendToWhatsApp);
        
        const doubtsSubmit = document.querySelector('.doubts-submit');
        if (doubtsSubmit) doubtsSubmit.addEventListener('click', sendDoubtsToWhatsApp);

        // Fecha o modal se clicar fora dele
        window.addEventListener('click', function(event) {
            if (event.target.classList.contains('modal')) {
                closeModal(event.target.id);
            }
        });

        // Configura botões de fechar
        document.querySelectorAll('.modal .close').forEach(closeBtn => {
            closeBtn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                closeModal(modal.id);
            });
        });
    }

    // =============================================
// 9. MENU MOBILE
// =============================================
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Fecha o menu ao clicar em um link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}


    // =============================================
    // INICIALIZAÇÃO
    // =============================================
    function init() {
        setupSmoothScroll();
        setupFaqAccordion();
        setupFormMasks();
        setupEventListeners();
         setupMobileMenu(); // Adicione esta linha
    }

    init();
});