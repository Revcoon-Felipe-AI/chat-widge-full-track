(function () {
    // --- Configuration ---
    const CONFIG = {
        primaryColor: '#ea6029', // Olho na Brasa Orange
        secondaryColor: '#d15423', // Darker Orange
        textColor: '#ffffff',
        botName: 'Projetos Olho na Brasa',
        botAvatar: 'https://s3.1app.com.br/master/project_24727/xy6IrcJy1jkUGTlM4qSc7cF1suHmQyDE.jpg',
        backendUrl: 'https://widge-chat-tracking.netlify.app/.netlify/functions/collect-lead', // SUBSTITUA [SEU-SITE-NETLIFY] PELA URL DO SEU SITE NO NETLIFY
        delays: {
            typing: 1000,
            message: 1500,
            processing: 1000
        }
    };

    const CALLOUT_MESSAGES = [
        "Olá! Tudo bem? 👋 Estamos on-line no WhatsApp se precisar de ajuda!",
        "ei, posso te ajudar com algum dúvida? 🤔",
        "Já sabe as medidas da sua churrasqueira? Se precisar estamos disponiveis aqui..."
    ];

    const QUESTIONS = [
        {
            id: 'custom-qntd-pessoas-1-14',
            question: 'Para quantas pessoas você costuma fazer churrasco?',
            type: 'radio',
            options: [
                { label: 'Até 10 pessoas (família próxima)', value: 'Costumo fazer churrasco para até 10 pessoas (família próxima)' },
                { label: '10-20 pessoas (amigos próximos)', value: 'Costumo fazer churrasco para 10 a 20 pessoas' },
                { label: '20+ pessoas (eventos/festas)', value: 'Costumo fazer churrasco para mais de 20 pessoas (eventos)' }
            ]
        },
        {
            id: 'custom-tipo-preparo-1-13',
            question: 'Quais cortes você mais prepara?',
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
            question: 'Sua churrasqueira tem barra frontal?',
            type: 'radio',
            options: [
                { label: 'Sim, tem barra frontal', value: 'Minha churrasqueira possui barra frontal' },
                { label: 'Não, é só alvenaria', value: 'Minha churrasqueira não tem barra, é só alvenaria' },
                { label: 'Não tenho churrasqueira ainda (em obra)', value: 'Ainda não tenho churrasqueira (estou em obra)' }
            ]
        },
        {
            id: 'custom-conhecia-o-kit-1-11',
            question: 'Você já conhecia o Kit Suporte Suspenso?',
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
            question: 'Sua churrasqueira já está pronta ou está em obra/reforma?',
            type: 'radio',
            options: [
                { label: 'Em obra/reforma - ainda construindo', value: 'Minha churrasqueira está em obra/reforma' },
                { label: 'Pronta - só trocar o kit', value: 'Minha churrasqueira já está pronta, só falta o kit' },
                { label: 'Planejando - ainda escolhendo', value: 'Estou apenas planejando e escolhendo' }
            ]
        },
        {
            id: 'custom-maior-dificuldade-1-9',
            question: 'Qual é sua maior dificuldade no churrasco hoje?',
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
            question: 'O que mais te preocupa na hora de adquirir projetos sob-medida?',
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
            question: 'Descreva o seu churrasco dos sonhos... (o que não poderia faltar nele?)',
            type: 'textarea'
        },
        {
            id: 'custom-text-project-vision',
            question: 'O que mais te chamou a atenção nos projetos da Olho na Brasa e que você não abre mão em seu projeto?',
            type: 'textarea'
        }
    ];

    // --- State ---
    let state = {
        isOpen: false,
        step: 0,
        quizIndex: 0,
        lead: { name: '', email: '', phone: '', cep: '' },
        survey: {},
        tracking: {},
        callout: { active: true, timer: null, msgIndex: 0 },
        tempCheckboxValues: [] // Store checkbox values before confirming
    };

    // --- CSS Injection ---
    function injectStyles() {
        const css = `
            #lb-widget-container { position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
            
            /* Toggle Button */
            #lb-toggle-btn { width: 60px; height: 60px; background-color: #25D366; border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.15); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.3s ease; animation: lb-pulse 2s infinite; }
            #lb-toggle-btn:hover { transform: scale(1.05); }
            #lb-toggle-icon { width: 35px; height: 35px; fill: white; }
            @keyframes lb-pulse { 0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); } 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); } }

            /* Callout */
            #lb-callout { position: absolute; bottom: 80px; right: 0; width: 260px; background-color: white; padding: 15px; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.15); display: none; flex-direction: column; gap: 8px; cursor: pointer; transform-origin: bottom right; animation: lb-pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            #lb-callout::after { content: ''; position: absolute; bottom: -8px; right: 20px; width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 8px solid white; }
            .lb-callout-text { font-size: 14px; color: #333; line-height: 1.4; }
            .lb-callout-typing { display: flex; gap: 4px; }

            /* Chat Window */
            #lb-chat-window { width: 360px; height: 550px; background-color: #fff; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.2); display: none; flex-direction: column; overflow: hidden; position: absolute; bottom: 80px; right: 0; opacity: 0; transform: translateY(20px); transition: opacity 0.3s ease, transform 0.3s ease; }
            #lb-chat-window.open { display: flex; opacity: 1; transform: translateY(0); }
            #lb-header { background-color: ${CONFIG.primaryColor}; color: ${CONFIG.textColor}; padding: 15px; display: flex; align-items: center; justify-content: space-between; }
            #lb-header-title { font-weight: bold; font-size: 16px; }
            #lb-close-btn { cursor: pointer; font-size: 20px; line-height: 1; }
            #lb-body { flex: 1; padding: 15px; overflow-y: auto; background-color: #ffffff; display: flex; flex-direction: column; gap: 10px; }
            
            /* Messages */
            .lb-message { max-width: 85%; padding: 10px 12px; border-radius: 8px; font-size: 14px; line-height: 1.4; position: relative; animation: lb-fade-in 0.3s ease; box-shadow: 0 1px 1px rgba(0,0,0,0.1); }
            .lb-message.bot { background-color: #f0f0f0; color: #333; border-top-left-radius: 0; align-self: flex-start; }
            .lb-message.user { background-color: #dcf8c6; color: #333; border-top-right-radius: 0; align-self: flex-end; }
            
            /* Welcome Card */
            .lb-welcome-card { background-color: #f0f0f0; border-radius: 12px; padding: 15px; max-width: 85%; align-self: flex-start; box-shadow: 0 1px 2px rgba(0,0,0,0.1); display: flex; flex-direction: column; gap: 12px; }
            .lb-welcome-text { font-size: 14px; color: #333; line-height: 1.4; }
            .lb-welcome-btn { background-color: #ea6029; color: white; border: none; padding: 10px; border-radius: 20px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px; transition: background 0.2s; text-align: center; font-size: 14px; }
            .lb-welcome-btn:hover { background-color: #e26029; }
            .lb-welcome-footer { font-size: 11px; color: #666; text-align: center; line-height: 1.3; }
            .lb-welcome-footer a { color: #ea6029; text-decoration: none; }
            .lb-welcome-footer a:hover { text-decoration: underline; }

            /* Form Bubble */
            .lb-form-bubble { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.15); width: 100%; max-width: 300px; align-self: flex-start; border: 1px solid #eee; }
            .lb-form-group { margin-bottom: 10px; }
            .lb-form-label { display: block; font-size: 12px; color: #666; margin-bottom: 4px; }
            .lb-form-input { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; outline: none; box-sizing: border-box; }
            .lb-form-input:focus { border-color: ${CONFIG.primaryColor}; }
            .lb-form-btn { width: 100%; background-color: ${CONFIG.primaryColor}; color: white; border: none; font-size: 14px; text-transform: uppercase; padding: 10px; border-radius: 4px; font-weight: bold; cursor: pointer; margin-top: 5px; }
            .lb-form-btn:hover { background-color: #d15423; }

            /* Unified Quiz Card */
            .lb-quiz-card { background: #f0f0f0; padding: 15px; border-radius: 12px; border-top-left-radius: 0; box-shadow: 0 1px 2px rgba(0,0,0,0.1); width: 100%; max-width: 85%; align-self: flex-start; display: flex; flex-direction: column; gap: 12px; animation: lb-fade-in 0.3s ease; }
            .lb-quiz-question { font-size: 14px; color: #333; line-height: 1.4; font-weight: 600; margin-bottom: 4px; }
            .lb-quiz-textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-family: inherit; font-size: 14px; resize: vertical; min-height: 80px; outline: none; box-sizing: border-box; background: white; }
            .lb-quiz-textarea:focus { border-color: ${CONFIG.primaryColor}; }
            
            /* Options / Buttons */
            .lb-option-btn { background: white; border: 1px solid #e0e0e0; color: #333; padding: 12px 15px; border-radius: 8px; cursor: pointer; text-align: left; font-size: 14px; transition: all 0.2s; width: 100%; box-shadow: 0 1px 1px rgba(0,0,0,0.05); }
            .lb-option-btn:hover { background: #fafafa; border-color: #ccc; transform: translateY(-1px); }
            .lb-option-btn.selected { background: ${CONFIG.primaryColor}; color: white; border-color: ${CONFIG.primaryColor}; font-weight: 600; }
            .lb-option-btn.btn-primary { background: ${CONFIG.primaryColor}; color: white; text-align: center; border: none; }
            .lb-option-btn.btn-secondary { background: transparent; color: #666; text-align: center; border: 1px solid #ccc; }
            
            /* Typing */
            .lb-typing { display: flex; gap: 4px; padding: 12px 15px; background-color: #f0f0f0; border-radius: 12px; border-top-left-radius: 0; width: fit-content; box-shadow: 0 1px 1px rgba(0,0,0,0.1); }
            .lb-dot { width: 6px; height: 6px; background-color: #999; border-radius: 50%; animation: lb-bounce 1.4s infinite ease-in-out both; }
            .lb-dot:nth-child(1) { animation-delay: -0.32s; }
            .lb-dot:nth-child(2) { animation-delay: -0.16s; }
            
            @keyframes lb-fade-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes lb-pop-in { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
            @keyframes lb-bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
        `;
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
    }

    // --- UI Rendering ---
    function renderWidget() {
        const container = document.createElement('div');
        container.id = 'lb-widget-container';
        container.innerHTML = `
            <div id="lb-callout"><div id="lb-callout-content"></div></div>
            <div id="lb-chat-window">
                <div id="lb-header">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <img src="${CONFIG.botAvatar}" style="width:50px; height:50px; border-radius:50%;">
                        <div style="display:flex; flex-direction:column;">
                            <span id="lb-header-title">${CONFIG.botName}</span>
                            <span style="font-size:11px; opacity:0.9;">Online agora no WhatsApp</span>
                        </div>
                    </div>
                    <span id="lb-close-btn">&times;</span>
                </div>
                <div id="lb-body"></div>
            </div>
            <div id="lb-toggle-btn">
                <svg id="lb-toggle-icon" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </div>
        `;
        document.body.appendChild(container);

        document.getElementById('lb-toggle-btn').addEventListener('click', toggleChat);
        document.getElementById('lb-callout').addEventListener('click', toggleChat);
        document.getElementById('lb-close-btn').addEventListener('click', toggleChat);
    }

    // --- Callout Logic ---
    function initCalloutLoop() {
        if (!state.callout.active) return;
        state.callout.timer = setTimeout(() => showCalloutTyping(), 3000);
    }

    function showCalloutTyping() {
        if (!state.callout.active) return;
        const callout = document.getElementById('lb-callout');
        const content = document.getElementById('lb-callout-content');
        callout.style.display = 'flex';
        content.innerHTML = `<div class="lb-callout-typing"><div class="lb-dot"></div><div class="lb-dot"></div><div class="lb-dot"></div></div>`;
        state.callout.timer = setTimeout(() => showCalloutMessage(), 1500);
    }

    function showCalloutMessage() {
        if (!state.callout.active) return;
        const content = document.getElementById('lb-callout-content');
        const msg = CALLOUT_MESSAGES[state.callout.msgIndex];
        content.innerHTML = `<span class="lb-callout-text">${msg}</span>`;
        state.callout.msgIndex = (state.callout.msgIndex + 1) % CALLOUT_MESSAGES.length;
        state.callout.timer = setTimeout(() => showCalloutTyping(), 20000);
    }

    function stopCallout() {
        state.callout.active = false;
        clearTimeout(state.callout.timer);
        const callout = document.getElementById('lb-callout');
        if (callout) callout.style.display = 'none';
    }

    // --- Chat Logic ---
    function toggleChat() {
        const chatWindow = document.getElementById('lb-chat-window');
        state.isOpen = !state.isOpen;
        if (state.isOpen) {
            stopCallout();
            chatWindow.classList.add('open');
            if (state.step === 0) startGreeting();
        } else {
            chatWindow.classList.remove('open');
            submitPartialData();
        }
    }

    function addMessage(text, sender = 'bot') {
        const body = document.getElementById('lb-body');
        const msg = document.createElement('div');
        msg.className = `lb-message ${sender}`;
        msg.innerHTML = text;
        body.appendChild(msg);
        body.scrollTop = body.scrollHeight;
    }

    function showTyping() {
        const body = document.getElementById('lb-body');
        const typing = document.createElement('div');
        typing.id = 'lb-typing-indicator';
        typing.className = 'lb-typing';
        typing.innerHTML = '<div class="lb-dot"></div><div class="lb-dot"></div><div class="lb-dot"></div>';
        body.appendChild(typing);
        body.scrollTop = body.scrollHeight;
        return typing;
    }

    function removeTyping() {
        const typing = document.getElementById('lb-typing-indicator');
        if (typing) typing.remove();
    }

    async function botSpeak(text, delay = CONFIG.delays.typing) {
        showTyping();
        await new Promise(r => setTimeout(r, delay));
        removeTyping();
        addMessage(text, 'bot');
    }

    // --- Flow Steps ---

    async function startGreeting() {
        state.step = 1;
        await botSpeak("Olá, tudo bem?");

        // Show Welcome Card
        showTyping();
        await new Promise(r => setTimeout(r, 1000));
        removeTyping();

        const body = document.getElementById('lb-body');
        const card = document.createElement('div');
        card.className = 'lb-welcome-card';
        card.innerHTML = `
            <div class="lb-welcome-text">Estamos disponivel para lhe atender e tirar suas dúvidas, vamos lá?</div>
            <button class="lb-welcome-btn" onclick="window.lbStartForm()">
                Sim, conversar via WhatsApp 
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <div class="lb-welcome-footer">
                Clicando acima você aceita nossas <a href="https://www.olhonabrasa.com.br/m/politica-de-privacidade/" target="_blank">Políticas de privacidade</a>
            </div>
        `;
        body.appendChild(card);
        body.scrollTop = body.scrollHeight;
    }

    window.lbStartForm = async function () {
        // Remove Card button to prevent double click (optional, but good UX)
        const btn = document.querySelector('.lb-welcome-btn');
        if (btn) btn.disabled = true;

        addMessage("Sim, conversar via WhatsApp", 'user');

        // Show Form
        showTyping();
        await new Promise(r => setTimeout(r, 1000));
        removeTyping();

        const body = document.getElementById('lb-body');
        const formDiv = document.createElement('div');
        formDiv.className = 'lb-form-bubble';
        formDiv.innerHTML = `
            <div class="lb-form-group">
                <label class="lb-form-label">Nome e Sobrenome</label>
                <input type="text" id="lb-name" class="lb-form-input" placeholder="Seu nome completo">
            </div>
            <div class="lb-form-group">
                <label class="lb-form-label">E-mail</label>
                <input type="email" id="lb-email" class="lb-form-input" placeholder="seu@email.com">
            </div>
            <div class="lb-form-group">
                <label class="lb-form-label">WhatsApp</label>
                <input type="tel" id="lb-phone" class="lb-form-input" placeholder="(00) 00000-0000">
            </div>
            <div class="lb-form-group">
                <label class="lb-form-label">CEP</label>
                <input type="text" id="lb-cep" class="lb-form-input" placeholder="00000-000">
            </div>
            <div class="lb-form-group">
                <label class="lb-form-label">Como podemos te ajudar? (Opcional)</label>
                <textarea id="lb-message" class="lb-form-input" placeholder="Caso queira adiantar, contenos como podemos te ajudar? Qual sua dúvida ou necessidade?" style="resize: vertical; min-height: 60px;"></textarea>
            </div>
            <button class="lb-form-btn" onclick="window.lbSubmitLead()">Receber suporte agora</button>
        `;
        body.appendChild(formDiv);
        body.scrollTop = body.scrollHeight;

        // Masking logic
        setTimeout(() => {
            const phoneInput = document.getElementById('lb-phone');
            phoneInput.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, '');
                if (v.length > 11) v = v.slice(0, 11);
                if (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
                e.target.value = v;
            });
            const cepInput = document.getElementById('lb-cep');
            cepInput.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, '');
                if (v.length > 8) v = v.slice(0, 8);
                if (v.length > 5) v = v.replace(/^(\d{5})(\d{3})/, '$1-$2');
                e.target.value = v;
            });
        }, 100);
    };

    window.lbSubmitLead = async function () {
        const name = document.getElementById('lb-name').value;
        const email = document.getElementById('lb-email').value;
        const phone = document.getElementById('lb-phone').value;
        const cep = document.getElementById('lb-cep').value;
        const message = document.getElementById('lb-message').value;

        if (!name || !email || !phone || !cep) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        document.querySelector('.lb-form-bubble').remove();
        addMessage(`Meus dados de contato são: <br>Nome: ${name} <br>E-mail: ${email} <br>WhatsApp: ${phone} <br>CEP: ${cep} <br>Dúvida: ${message}`, 'user');

        state.lead = { name, email, phone, cep, message };

        await botSpeak("Enviando seus dados...");
        await submitData('lead');

        await botSpeak(`Perfeito, ${name.split(' ')[0]}. Em alguns instantes nossa equipe irá entrar em contato com você.`);
        await new Promise(r => setTimeout(r, 1000));
        await botSpeak("Enquanto isso, gostaria de responder algumas perguntas para receber um atendimento ainda mais personalizado?");

        const body = document.getElementById('lb-body');
        const btnDiv = document.createElement('div');
        btnDiv.className = 'lb-options';
        btnDiv.innerHTML = `
            <button class="lb-option-btn btn-primary" onclick="window.lbStartQuiz()">Sim, quero responder</button>
            <button class="lb-option-btn btn-secondary" onclick="window.lbEndChat()">Não, obrigado</button>
        `;
        body.appendChild(btnDiv);
        body.scrollTop = body.scrollHeight;
    };

    window.lbStartQuiz = async function () {
        document.querySelector('.lb-options').remove();
        addMessage("Sim, quero responder", 'user');
        state.step = 3;
        nextQuestion();
    };

    window.lbEndChat = async function () {
        document.querySelector('.lb-options').remove();
        addMessage("Não, obrigado", 'user');
        await botSpeak("Tudo bem! Agradecemos seu contato. Logo falaremos no WhatsApp.");
    };

    async function nextQuestion() {
        if (state.quizIndex >= QUESTIONS.length) {
            await submitData('survey');
            await botSpeak(`Perfeito, ${state.lead.name.split(' ')[0]}. Todas as informações foram registradas e enviadas para nossa equipe. Logo entraremos em contato. Até mais!`);
            return;
        }

        const q = QUESTIONS[state.quizIndex];

        // Show typing before question appears
        showTyping();
        await new Promise(r => setTimeout(r, 1000));
        removeTyping();

        const body = document.getElementById('lb-body');
        const card = document.createElement('div');
        card.className = 'lb-quiz-card';

        // Question Text
        const questionText = document.createElement('div');
        questionText.className = 'lb-quiz-question';
        questionText.innerText = q.question;
        card.appendChild(questionText);

        if (q.type === 'checkbox') {
            state.tempCheckboxValues = []; // Reset temp values
            q.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'lb-option-btn';
                btn.innerText = opt.label;
                btn.onclick = (e) => toggleCheckbox(e.target, opt.value);
                card.appendChild(btn);
            });

            // Confirm Button
            const confirmBtn = document.createElement('button');
            confirmBtn.className = 'lb-form-btn';
            confirmBtn.style.marginTop = '10px';
            confirmBtn.innerText = 'Confirmar';
            confirmBtn.onclick = () => submitCheckboxAnswer(q.id);
            card.appendChild(confirmBtn);

        } else if (q.type === 'textarea') {
            const textarea = document.createElement('textarea');
            textarea.className = 'lb-quiz-textarea';
            textarea.placeholder = 'Digite sua resposta aqui...';
            textarea.id = 'lb-current-textarea';
            card.appendChild(textarea);

            const confirmBtn = document.createElement('button');
            confirmBtn.className = 'lb-form-btn';
            confirmBtn.style.marginTop = '10px';
            confirmBtn.innerText = 'Enviar';
            confirmBtn.onclick = () => submitTextAnswer(q.id);
            card.appendChild(confirmBtn);

        } else {
            // Radio
            q.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'lb-option-btn';
                btn.innerText = opt.label;
                btn.onclick = () => handleAnswer(q.id, opt.value, opt.label);
                card.appendChild(btn);
            });
        }

        body.appendChild(card);
        body.scrollTop = body.scrollHeight;
    }

    function toggleCheckbox(btn, value) {
        if (state.tempCheckboxValues.includes(value)) {
            state.tempCheckboxValues = state.tempCheckboxValues.filter(v => v !== value);
            btn.classList.remove('selected');
        } else {
            state.tempCheckboxValues.push(value);
            btn.classList.add('selected');
        }
    }

    async function submitCheckboxAnswer(qid) {
        if (state.tempCheckboxValues.length === 0) {
            alert("Por favor, selecione pelo menos uma opção.");
            return;
        }
        document.querySelector('.lb-quiz-card').remove();
        addMessage(`${state.tempCheckboxValues.length} opções selecionadas`, 'user');
        state.survey[qid] = state.tempCheckboxValues.join(', ');
        state.quizIndex++;
        setTimeout(nextQuestion, 500);
    }

    async function submitTextAnswer(qid) {
        const textarea = document.getElementById('lb-current-textarea');
        const value = textarea.value.trim();
        if (!value) {
            alert("Por favor, digite uma resposta.");
            return;
        }
        document.querySelector('.lb-quiz-card').remove();
        addMessage(value, 'user');
        state.survey[qid] = value;
        state.quizIndex++;
        setTimeout(nextQuestion, 500);
    }

    async function handleAnswer(qid, val, label) {
        document.querySelector('.lb-quiz-card').remove();
        addMessage(label, 'user');
        state.survey[qid] = val;
        state.quizIndex++;
        setTimeout(nextQuestion, 500);
    }

    // --- Partial Submission ---
    function submitPartialData() {
        // Only submit if in quiz step (3), not finished, and has some data
        if (state.step === 3 && state.quizIndex < QUESTIONS.length && Object.keys(state.survey).length > 0) {
            console.log("Submitting partial survey data...");
            submitData('survey', { keepalive: true });
        }
    }

    // --- Backend Submission ---
    async function submitData(type, options = {}) {
        getTrackingData();
        const payload = {
            lead: state.lead,
            survey: state.survey,
            tracking: state.tracking
        };

        const url = `${CONFIG.backendUrl}?type=${type}`;

        try {
            console.log(`Sending ${type} Payload:`, payload);
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                ...options
            });
        } catch (error) {
            console.error("Error submitting:", error);
        }
    }

    // --- Tracking ---
    function getTrackingData() {
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return '';
        };
        state.tracking.fbp = getCookie('_fbp');
        state.tracking.fbc = getCookie('_fbc');
        state.tracking.ttp = getCookie('_ttp');
        state.tracking.epik = getCookie('_epik');
        state.tracking.gcl_au = getCookie('_gcl_au');

        const urlParams = new URLSearchParams(window.location.search);
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'ttclid', 'epik', 'wbraid', 'gbraid'].forEach(param => {
            state.tracking[param] = urlParams.get(param) || '';
        });
        state.tracking.url_lead = window.location.origin + window.location.pathname;
    }

    // --- Initialization ---
    function init() {
        injectStyles();
        renderWidget();
        getTrackingData();
        initCalloutLoop();

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
