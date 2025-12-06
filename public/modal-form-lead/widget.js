(function () {
    // --- Configuration ---
    const CONFIG = {
        // URL da Netlify Function (Backend Proxy)
        // Configurado para o domínio principal de widgets
        backendUrl: 'https://widge-chat-tracking.netlify.app/.netlify/functions/submit-modal-lead',

        primaryColor: '#ea6029', // Olho na Brasa Orange
        secondaryColor: '#d15423', // Darker Orange
        textColor: '#333333',
        backgroundColor: '#ffffff',
        overlayColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 99999
    };

    const QUIZ_QUESTIONS = [
        {
            id: 'custom-qntd-pessoas-1-14',
            text: 'Para quantas pessoas você costuma fazer churrasco?',
            type: 'radio',
            options: [
                { label: 'Até 10 pessoas (família próxima)', value: 'Costumo fazer churrasco para até 10 pessoas (família próxima)' },
                { label: '10-20 pessoas (amigos próximos)', value: 'Costumo fazer churrasco para 10 a 20 pessoas' },
                { label: '20+ pessoas (eventos/festas)', value: 'Costumo fazer churrasco para mais de 20 pessoas (eventos)' }
            ]
        },
        {
            id: 'custom-tipo-preparo-1-13',
            text: 'Quais cortes você mais prepara?',
            type: 'checkbox',
            maxSelect: 5,
            options: [
                { label: 'Picanha', value: 'Gosto de preparar Picanha' },
                { label: 'Costela', value: 'Gosto de preparar Costela' },
                { label: 'Fraldinha/Contra-filé', value: 'Gosto de preparar Fraldinha ou Contra-filé' },
                { label: 'Linguiça/Medalhões', value: 'Gosto de preparar Linguiça ou Medalhões' },
                { label: 'Frango/Peixe', value: 'Gosto de preparar Frango ou Peixe' }
            ]
        },
        {
            id: 'custom-possui-barra-1-12',
            text: 'Sua churrasqueira tem barra frontal?',
            type: 'radio',
            options: [
                { label: 'Sim, tem barra frontal', value: 'Minha churrasqueira possui barra frontal' },
                { label: 'Não, é só alvenaria', value: 'Minha churrasqueira não tem barra, é só alvenaria' },
                { label: 'Não tenho churrasqueira ainda (em obra)', value: 'Ainda não tenho churrasqueira (estou em obra)' }
            ]
        },
        {
            id: 'custom-conhecia-o-kit-1-11',
            text: 'Você já conhecia o Kit Suporte Suspenso?',
            type: 'radio',
            options: [
                { label: 'Sim, estava procurando especificamente', value: 'Sim, eu já conhecia e estava procurando especificamente o Kit Suporte Suspenso' },
                { label: 'Já ouvi falar, mas não conheço detalhes', value: 'Já ouvi falar do Kit, mas não conheço os detalhes' },
                { label: 'Não, é primeira vez que vejo', value: 'Não, é a primeira vez que vejo o Kit' },
                { label: 'Já vi na casa de amigos', value: 'Já vi o Kit na casa de amigos' }
            ]
        },
        {
            id: 'custom-churrasqueira-ja-esta-pronta-1-10',
            text: 'Sua churrasqueira já está pronta ou está em obra/reforma?',
            type: 'radio',
            options: [
                { label: 'Em obra/reforma - ainda construindo', value: 'Minha churrasqueira está em obra/reforma' },
                { label: 'Pronta - só trocar o kit', value: 'Minha churrasqueira já está pronta, só falta o kit' },
                { label: 'Planejando - ainda escolhendo', value: 'Estou apenas planejando e escolhendo' }
            ]
        },
        {
            id: 'custom-maior-dificuldade-1-9',
            text: 'Qual é sua maior dificuldade no churrasco hoje?',
            type: 'checkbox',
            options: [
                { label: 'Queimar a carne (não acerto o ponto)', value: 'Tenho dificuldade em acertar o ponto (queimo a carne)' },
                { label: 'Limpeza demorada (trabalheira)', value: 'Acho a limpeza muito demorada e trabalhosa' },
                { label: 'Subir o nível da Carne sem tirar a Grelha', value: 'Tenho dificuldade para subir o nível da carne sem tirar a grelha' },
                { label: 'Colocar ou trocar o Carvão', value: 'Tenho dificuldade para colocar ou trocar o carvão' },
                { label: 'Preparar vários tipos de carne ao mesmo tempo', value: 'Tenho dificuldade em preparar vários tipos de carne ao mesmo tempo' },
                { label: 'Servir o churrasco de 1 só vez', value: 'Tenho dificuldade em servir o churrasco de uma só vez' }
            ]
        },
        {
            id: 'custom-objecao-compra-1-8',
            text: 'O que mais te preocupa na hora de adquirir projetos sob-medida?',
            type: 'checkbox',
            maxSelect: 5,
            options: [
                { label: 'As medidas não ficarem perfeitas com a minha churrasqueira', value: 'Tenho medo das medidas não ficarem perfeitas' },
                { label: 'O preço fugir do meu orçamento', value: 'Tenho preocupação com o preço fugir do orçamento' },
                { label: 'Prazo de entrega muito demorado', value: 'Tenho receio do prazo de entrega ser demorado' },
                { label: 'Qualidade do material muito ruim e sem durabilidade', value: 'Tenho preocupação com a qualidade e durabilidade do material' },
                { label: 'Se enferruja ou é corroído pela maresia', value: 'Tenho medo que enferruje ou sofra com maresia' }
            ]
        },
        {
            id: 'custom-text-perfect-bbq',
            text: 'O que não pode faltar no seu churrasco ideal?',
            type: 'checkbox',
            maxSelect: 5,
            options: [
                { label: 'Cortes Nobres (Picanha, Ancho, etc)', value: 'Não pode faltar Cortes Nobres' },
                { label: 'Praticidade (Acendimento fácil)', value: 'Não pode faltar Praticidade' },
                { label: 'Conforto (Sem fumaça)', value: 'Não pode faltar Conforto' },
                { label: 'Social (Família e amigos)', value: 'Não pode faltar o Social' },
                { label: 'Bebida Gelada', value: 'Não pode faltar Bebida Gelada' }
            ]
        },
        {
            id: 'custom-text-project-vision',
            text: 'O que é prioridade para o seu projeto?',
            type: 'checkbox',
            maxSelect: 5,
            options: [
                { label: 'Estética (Design moderno)', value: 'Prioridade é Estética' },
                { label: 'Funcionalidade (Sistema completo com acessórios)', value: 'Prioridade é Funcionalidade (Sistema completo)' },
                { label: 'Durabilidade (Inox)', value: 'Prioridade é Durabilidade' },
                { label: 'Facilidade (Limpeza simples)', value: 'Prioridade é Facilidade de Limpeza' },
                { label: 'Exclusividade (Sob medida)', value: 'Prioridade é Exclusividade' }
            ]
        }
    ];

    // --- State ---
    let state = {
        isOpen: false,
        step: 1, // 1: Contact, 2: Quiz, 3: Success
        quizIndex: 0,
        lead: { name: '', email: '', phone: '', cep: '' },
        quiz: {},
        tracking: {}
    };

    // --- CSS Injection ---
    function injectStyles() {
        const css = `
            #lb-modal-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background-color: ${CONFIG.overlayColor};
                z-index: ${CONFIG.zIndex};
                display: none;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
                backdrop-filter: blur(4px);
            }
            #lb-modal-overlay.open {
                display: flex;
                opacity: 1;
            }
            #lb-modal-container {
                background-color: ${CONFIG.backgroundColor};
                width: 90%;
                max-width: 500px;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                overflow: hidden;
                position: relative;
                transform: scale(0.9);
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                display: flex;
                flex-direction: column;
                max-height: 90vh;
            }
            #lb-modal-overlay.open #lb-modal-container {
                transform: scale(1);
            }
            #lb-modal-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #999;
                z-index: 10;
                line-height: 1;
                padding: 5px;
            }
            #lb-modal-close:hover { color: #333; }
            
            .lb-modal-header {
                padding: 25px 25px 10px;
                text-align: center;
            }
            .lb-modal-title {
                font-size: 22px;
                font-weight: 700;
                color: ${CONFIG.primaryColor};
                margin: 0 0 10px;
            }
            .lb-modal-subtitle {
                font-size: 14px;
                color: #666;
                margin: 0;
                line-height: 1.5;
            }
            
            .lb-modal-body {
                padding: 20px 25px 30px;
                overflow-y: auto;
            }
            
            /* Form Elements */
            .lb-form-group { margin-bottom: 15px; text-align: left; }
            .lb-label { display: block; font-size: 13px; font-weight: 600; color: #444; margin-bottom: 6px; }
            .lb-input {
                width: 100%;
                padding: 12px;
                border: 1px solid #ddd;
                border-radius: 8px;
                font-size: 15px;
                outline: none;
                transition: border-color 0.2s;
                box-sizing: border-box;
            }
            .lb-input:focus { border-color: ${CONFIG.primaryColor}; box-shadow: 0 0 0 2px rgba(234, 96, 41, 0.1); }
            
            .lb-btn {
                width: 100%;
                background-color: ${CONFIG.primaryColor};
                color: white;
                border: none;
                padding: 14px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                transition: background-color 0.2s, transform 0.1s;
                margin-top: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }
            .lb-btn:hover { background-color: ${CONFIG.secondaryColor}; }
            .lb-btn:active { transform: scale(0.98); }
            .lb-btn:disabled { background-color: #ccc; cursor: not-allowed; }
            
            /* Quiz Styles */
            .lb-quiz-question { margin-bottom: 20px; animation: lb-fade-in 0.3s ease; }
            .lb-quiz-q-text { font-weight: 600; margin-bottom: 15px; color: #333; font-size: 18px; text-align: center; }
            .lb-quiz-options { display: flex; flex-direction: column; gap: 8px; }
            .lb-quiz-option {
                padding: 12px;
                border: 1px solid #eee;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 15px;
                color: #555;
            }
            .lb-quiz-option:hover { background-color: #fff8f5; border-color: ${CONFIG.primaryColor}; }
            .lb-quiz-option input[type="radio"], .lb-quiz-option input[type="checkbox"] {
                accent-color: ${CONFIG.primaryColor};
                transform: scale(1.2);
            }
            .lb-quiz-textarea {
                width: 100%;
                padding: 12px;
                border: 1px solid #ddd;
                border-radius: 8px;
                font-size: 15px;
                outline: none;
                box-sizing: border-box;
                min-height: 100px;
                font-family: inherit;
                resize: vertical;
            }
            .lb-quiz-textarea:focus { border-color: ${CONFIG.primaryColor}; }
            
            .lb-progress-bar {
                width: 100%;
                height: 6px;
                background-color: #eee;
                border-radius: 3px;
                margin-bottom: 20px;
                overflow: hidden;
            }
            .lb-progress-fill {
                height: 100%;
                background-color: ${CONFIG.primaryColor};
                transition: width 0.3s ease;
            }

            /* Success State */
            .lb-success-icon {
                width: 60px; height: 60px;
                background-color: #25D366;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
                color: white;
            }
            
            /* Loader */
            .lb-loader {
                border: 3px solid rgba(255,255,255,0.3);
                border-radius: 50%;
                border-top: 3px solid white;
                width: 20px;
                height: 20px;
                animation: lb-spin 1s linear infinite;
            }
            @keyframes lb-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            @keyframes lb-fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            
            /* Responsive */
            @media (max-width: 600px) {
                #lb-modal-container { width: 95%; border-radius: 12px; }
            }
        `;
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
    }

    // --- DOM Construction ---
    function createModal() {
        const overlay = document.createElement('div');
        overlay.id = 'lb-modal-overlay';
        overlay.innerHTML = `
            <div id="lb-modal-container">
                <button id="lb-modal-close">&times;</button>
                <div id="lb-modal-content">
                    <!-- Content injected via JS -->
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('lb-modal-close').addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
    }

    // --- Render Steps ---

    function renderStep1() {
        const content = document.getElementById('lb-modal-content');
        content.innerHTML = `
            <div class="lb-modal-header">
                <h2 class="lb-modal-title">Receba seu Orçamento</h2>
                <p class="lb-modal-subtitle">Preencha seus dados para iniciarmos seu atendimento personalizado.</p>
            </div>
            <div class="lb-modal-body">
                <div class="lb-form-group">
                    <label class="lb-label">Nome Completo</label>
                    <input type="text" id="lb-name" class="lb-input" placeholder="Digite seu nome">
                </div>
                <div class="lb-form-group">
                    <label class="lb-label">E-mail</label>
                    <input type="email" id="lb-email" class="lb-input" placeholder="seu@email.com">
                </div>
                <div class="lb-form-group">
                    <label class="lb-label">WhatsApp</label>
                    <input type="tel" id="lb-phone" class="lb-input" placeholder="(DDD) 99999-9999">
                </div>
                <div class="lb-form-group">
                    <label class="lb-label">CEP</label>
                    <input type="tel" id="lb-cep" class="lb-input" placeholder="00000-000">
                </div>
                <button class="lb-btn" onclick="window.lbSubmitContact()">
                    <span id="lb-btn-text-1">Continuar</span>
                </button>
            </div>
        `;
        applyMasks();
    }

    function renderStep2() {
        const content = document.getElementById('lb-modal-content');
        const q = QUIZ_QUESTIONS[state.quizIndex];
        const progress = ((state.quizIndex + 1) / QUIZ_QUESTIONS.length) * 100;

        let optionsHtml = '';

        if (q.type === 'textarea') {
            optionsHtml = `
                <textarea id="lb-quiz-textarea" class="lb-quiz-textarea" placeholder="Digite sua resposta aqui..."></textarea>
            `;
        } else {
            q.options.forEach((opt, idx) => {
                const inputType = q.type;
                const inputName = `q_${state.quizIndex}`;
                optionsHtml += `
                    <label class="lb-quiz-option">
                        <input type="${inputType}" name="${inputName}" value="${opt.value}">
                        ${opt.label}
                    </label>
                `;
            });
        }

        content.innerHTML = `
            <div class="lb-modal-header">
                <h2 class="lb-modal-title">Perfil do Churrasco</h2>
                <div class="lb-progress-bar">
                    <div class="lb-progress-fill" style="width: ${progress}%"></div>
                </div>
            </div>
            <div class="lb-modal-body">
                <div class="lb-quiz-question">
                    <div class="lb-quiz-q-text">${q.text}</div>
                    <div class="lb-quiz-options">
                        ${optionsHtml}
                    </div>
                </div>
                <button class="lb-btn" onclick="window.lbNextQuestion()">
                    <span id="lb-btn-text-2">${state.quizIndex === QUIZ_QUESTIONS.length - 1 ? 'Finalizar' : 'Próxima'}</span>
                </button>
            </div>
        `;
    }

    function renderStep3() {
        const content = document.getElementById('lb-modal-content');
        content.innerHTML = `
            <div class="lb-modal-body" style="text-align: center; padding-top: 40px;">
                <div class="lb-success-icon">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </div>
                <h2 class="lb-modal-title">Recebemos seus dados!</h2>
                <p class="lb-modal-subtitle">Em breve um de nossos especialistas entrará em contato via WhatsApp.</p>
                <button class="lb-btn" onclick="window.lbCloseModal()">Fechar</button>
            </div>
        `;
    }

    // --- Logic ---

    function openModal() {
        state.isOpen = true;
        state.step = 1;
        state.quizIndex = 0;
        state.quiz = {};
        document.getElementById('lb-modal-overlay').classList.add('open');
        renderStep1();
        getTrackingData();
    }
    window.lbOpenModal = openModal;

    function closeModal() {
        if (state.isOpen) {
            submitPartialData();
        }
        state.isOpen = false;
        document.getElementById('lb-modal-overlay').classList.remove('open');
    }
    window.lbCloseModal = closeModal;

    function applyMasks() {
        const phoneInput = document.getElementById('lb-phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, '');
                if (v.length > 11) v = v.slice(0, 11);
                if (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
                e.target.value = v;
            });
        }

        const cepInput = document.getElementById('lb-cep');
        if (cepInput) {
            cepInput.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, '');
                if (v.length > 8) v = v.slice(0, 8);
                if (v.length > 5) v = v.replace(/^(\d{5})(\d{3})/, '$1-$2');
                e.target.value = v;
            });
        }
    }

    window.lbSubmitContact = async function () {
        const name = document.getElementById('lb-name').value.trim();
        const email = document.getElementById('lb-email').value.trim();
        const phone = document.getElementById('lb-phone').value.trim();
        const cep = document.getElementById('lb-cep').value.trim();

        if (!name || !email || !phone || !cep) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        state.lead = { name, email, phone, cep };

        // Loading State
        const btn = document.querySelector('.lb-btn');
        const btnText = document.getElementById('lb-btn-text-1');
        btn.disabled = true;
        btnText.innerHTML = '<div class="lb-loader"></div>';

        // Send to Webhook 1 (Contact)
        await sendData('contact', { lead: state.lead, tracking: state.tracking });

        // Move to Step 2
        state.step = 2;
        renderStep2();
    };

    window.lbNextQuestion = async function () {
        const q = QUIZ_QUESTIONS[state.quizIndex];
        const inputName = `q_${state.quizIndex}`;

        // Get Values
        let answer;

        if (q.type === 'textarea') {
            const textarea = document.getElementById('lb-quiz-textarea');
            answer = textarea.value.trim();
            if (!answer) {
                alert("Por favor, digite uma resposta.");
                return;
            }
        } else if (q.type === 'checkbox') {
            const checked = Array.from(document.querySelectorAll(`input[name="${inputName}"]:checked`));
            if (checked.length === 0) {
                alert("Por favor, selecione pelo menos uma opção.");
                return;
            }
            answer = checked.map(el => el.value).join(', ');
        } else {
            const selected = document.querySelector(`input[name="${inputName}"]:checked`);
            if (!selected) {
                alert("Por favor, selecione uma opção.");
                return;
            }
            answer = selected.value;
        }

        // Save Answer
        state.quiz[q.id] = answer;

        // Next or Finish
        if (state.quizIndex < QUIZ_QUESTIONS.length - 1) {
            state.quizIndex++;
            renderStep2();
        } else {
            await submitQuizFinal();
        }
    };

    async function submitQuizFinal() {
        // Loading State
        const btn = document.querySelector('.lb-btn');
        const btnText = document.getElementById('lb-btn-text-2');
        btn.disabled = true;
        btnText.innerHTML = '<div class="lb-loader"></div>';

        // Send to Webhook 2 (Quiz)
        await sendData('quiz', {
            lead: state.lead,
            quiz: state.quiz,
            tracking: state.tracking
        });

        // Move to Step 3
        state.step = 3;
        renderStep3();
    }

    // --- Partial Submission ---
    function submitPartialData() {
        // Only submit if in quiz step (2), not finished, and has some data
        if (state.step === 2 && state.quizIndex < QUIZ_QUESTIONS.length && Object.keys(state.quiz).length > 0) {
            console.log("Submitting partial survey data...");
            sendData('quiz', {
                lead: state.lead,
                quiz: state.quiz,
                tracking: state.tracking
            }, { keepalive: true });
        }
    }

    async function sendData(type, payload, options = {}) {
        try {
            console.log(`Sending ${type} payload:`, payload);

            // Construct URL with type parameter
            const url = `${CONFIG.backendUrl}?type=${type}`;

            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                ...options
            });
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }

    function getTrackingData() {
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return '';
        };

        // --- Helper for Event ID ---
        const generateEventId = () => {
            if (crypto && crypto.randomUUID) {
                return crypto.randomUUID();
            }
            return 'event-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
        };

        // --- Helper for Device Info ---
        const getDeviceInfo = () => {
            const ua = navigator.userAgent;
            let os = 'Unknown';
            let type = 'Desktop';

            // Detect OS
            if (/Mac|iOS|iPhone|iPad|iPod/.test(ua)) os = 'Apple';
            else if (/Windows/.test(ua)) os = 'Windows';
            else if (/Android/.test(ua)) os = 'Android';
            else if (/Linux/.test(ua)) os = 'Linux';

            // Detect Type
            if (/Mobi|Android/i.test(ua)) type = 'Mobile';
            if (/Tablet|iPad/i.test(ua)) type = 'Tablet';

            return { os, type };
        };

        const deviceInfo = getDeviceInfo();
        const urlParams = new URLSearchParams(window.location.search);

        // --- Enhanced Tracking ---
        const tracking = {
            // Unique Event ID for Deduplication
            event_id: generateEventId(),

            // Device Info
            device_os: deviceInfo.os,
            device_type: deviceInfo.type,

            // Standard UTMs
            utm_source: urlParams.get('utm_source') || '',
            utm_medium: urlParams.get('utm_medium') || '',
            utm_campaign: urlParams.get('utm_campaign') || '',
            utm_term: urlParams.get('utm_term') || '',
            utm_content: urlParams.get('utm_content') || '',

            // Ad Platform IDs
            fbclid: urlParams.get('fbclid') || '',
            gclid: urlParams.get('gclid') || '',
            ttclid: urlParams.get('ttclid') || '',
            wbraid: urlParams.get('wbraid') || '',
            gbraid: urlParams.get('gbraid') || '',
            msclid: urlParams.get('msclid') || '',
            li_fat_id: urlParams.get('li_fat_id') || '',
            epik: urlParams.get('epik') || '',

            // Cookies
            fbp: getCookie('_fbp'),
            fbc: getCookie('_fbc'),
            ttp: getCookie('_ttp'),
            epik_cookie: getCookie('_epik'),
            gcl_au: getCookie('_gcl_au'),

            // Meta Info
            url_lead: window.location.href,
            user_agent: navigator.userAgent
        };

        // --- Determine Conversion Platform ---
        // Priority: URL Params > Cookies (implied, but we focus on URL for "current session" source)
        let platform = 'organic';

        if (tracking.gclid || tracking.wbraid || tracking.gbraid) {
            platform = 'google_ads';
        } else if (tracking.fbclid) {
            platform = 'facebook_ads'; // Includes Instagram
        } else if (tracking.ttclid) {
            platform = 'tiktok_ads';
        } else if (tracking.msclid) {
            platform = 'bing_ads';
        } else if (tracking.li_fat_id) {
            platform = 'linkedin_ads';
        } else if (tracking.utm_source) {
            platform = tracking.utm_source.toLowerCase();
        }

        tracking.conversion_platform = platform;
        state.tracking = tracking;
    }

    // --- Initialization ---
    function init() {
        injectStyles();
        createModal();

        // Handle page unload
        window.addEventListener('beforeunload', () => {
            submitPartialData();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
