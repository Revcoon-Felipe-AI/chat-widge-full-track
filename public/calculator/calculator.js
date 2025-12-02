(function () {
    // --- Configuration ---
    const CONFIG = {
        primaryColor: '#ea6029',
        images: {
            hero: 'https://s3.1app.com.br/master/project_24727/eWKPhLCE9Wyv0jTal6z0VIIqSe0EoCb5.png',
            guideDesktop: 'https://s3.1app.com.br/master/project_24727/f3OecxhuQiHqpZovEi8S9WBkeT2Zgbfg.jpg',
            guideMobile: 'https://s3.1app.com.br/master/project_24727/Q5O6QCvrCVslmAjZPrp77VRdQvGxQG0m.jpg'
        }
    };

    // --- Data ---
    const SUPPORT_SIZES = [
        { id: 'L45', width: 45 }, { id: 'L50', width: 50 }, { id: 'L55', width: 55 },
        { id: 'L60', width: 60 }, { id: 'L65', width: 65 }, { id: 'L70', width: 70 },
        { id: 'L75', width: 75 }, { id: 'L80', width: 80 }, { id: 'L85', width: 85 },
        { id: 'L90', width: 90 }, { id: 'L95', width: 95 }, { id: 'L100', width: 100 },
        { id: 'L110', width: 110 }, { id: 'L120', width: 120 }
    ];

    const SKEWER_SIZES = [50, 55, 60, 65, 70, 75, 80, 90];

    // Format: "L{width} x {depth}C"
    const GRILL_SIZES = [
        { w: 30, d: 55 }, { w: 50, d: 65 }, { w: 35, d: 45 }, { w: 50, d: 55 },
        { w: 30, d: 40 }, { w: 30, d: 45 }, { w: 30, d: 50 }, { w: 30, d: 60 }, { w: 30, d: 65 },
        { w: 35, d: 40 }, { w: 35, d: 50 }, { w: 35, d: 55 }, { w: 35, d: 60 }, { w: 35, d: 65 },
        { w: 40, d: 40 }, { w: 40, d: 45 }, { w: 40, d: 50 }, { w: 40, d: 55 }, { w: 40, d: 60 }, { w: 40, d: 65 },
        { w: 45, d: 40 }, { w: 45, d: 45 }, { w: 45, d: 50 }, { w: 45, d: 55 }, { w: 45, d: 60 }, { w: 45, d: 65 },
        { w: 50, d: 40 }, { w: 50, d: 45 }, { w: 50, d: 50 }, { w: 50, d: 60 },
        { w: 55, d: 40 }, { w: 55, d: 45 }, { w: 55, d: 50 }, { w: 55, d: 55 }, { w: 55, d: 60 }, { w: 55, d: 65 },
        { w: 60, d: 40 }, { w: 60, d: 45 }, { w: 60, d: 50 }, { w: 60, d: 55 }, { w: 60, d: 60 }, { w: 60, d: 65 },
        { w: 22, d: 55 }, { w: 24, d: 45 }, { w: 24, d: 50 }, { w: 25, d: 44 }, { w: 25, d: 55 },
        { w: 27, d: 35 }, { w: 27, d: 40 }, { w: 27, d: 45 }, { w: 27, d: 50 }, { w: 27, d: 55 }, { w: 27, d: 60 }, { w: 27, d: 65 },
        { w: 29, d: 35 }, { w: 29, d: 40 }, { w: 29, d: 45 }, { w: 29, d: 50 }, { w: 29, d: 55 }, { w: 29, d: 60 }, { w: 29, d: 65 },
        { w: 30, d: 35 }, { w: 30, d: 70 }, { w: 31, d: 50 },
        { w: 32, d: 35 }, { w: 32, d: 40 }, { w: 32, d: 45 }, { w: 32, d: 50 }, { w: 32, d: 55 }, { w: 32, d: 60 }, { w: 32, d: 65 },
        { w: 33, d: 55 },
        { w: 34, d: 35 }, { w: 34, d: 40 }, { w: 34, d: 45 }, { w: 34, d: 50 }, { w: 34, d: 55 }, { w: 34, d: 60 }, { w: 34, d: 65 },
        { w: 35, d: 35 }, { w: 35, d: 70 },
        { w: 37, d: 35 }, { w: 37, d: 40 }, { w: 37, d: 45 }, { w: 37, d: 50 }, { w: 37, d: 55 }, { w: 37, d: 60 }, { w: 37, d: 65 },
        { w: 39, d: 35 }, { w: 39, d: 40 }, { w: 39, d: 45 }, { w: 39, d: 50 }, { w: 39, d: 55 }, { w: 39, d: 60 }, { w: 39, d: 65 },
        { w: 40, d: 30 }, { w: 40, d: 35 }, { w: 40, d: 70 },
        { w: 42, d: 35 }, { w: 42, d: 40 }, { w: 42, d: 45 }, { w: 42, d: 50 }, { w: 42, d: 55 }, { w: 42, d: 60 }, { w: 42, d: 65 },
        { w: 44, d: 35 }, { w: 44, d: 40 }, { w: 44, d: 45 }, { w: 44, d: 50 }, { w: 44, d: 55 }, { w: 44, d: 60 }, { w: 44, d: 65 },
        { w: 45, d: 35 }, { w: 45, d: 70 },
        { w: 47, d: 35 }, { w: 47, d: 40 }, { w: 47, d: 45 }, { w: 47, d: 50 }, { w: 47, d: 55 }, { w: 47, d: 60 }, { w: 47, d: 65 },
        { w: 50, d: 30 }, { w: 50, d: 35 }, { w: 50, d: 70 },
        { w: 52, d: 35 }, { w: 52, d: 40 }, { w: 52, d: 45 }, { w: 52, d: 50 }, { w: 52, d: 55 }, { w: 52, d: 60 }, { w: 52, d: 65 },
        { w: 55, d: 35 }, { w: 55, d: 70 },
        { w: 57, d: 35 }, { w: 57, d: 40 }, { w: 57, d: 45 }, { w: 57, d: 50 }, { w: 57, d: 55 }, { w: 57, d: 60 }, { w: 57, d: 65 },
        { w: 60, d: 35 }, { w: 60, d: 70 }
    ];

    const GRILL_KITS = [
        { id: 'Kit Premium L45', minWidth: 45, maxWidth: 49, url: 'https://www.olhonabrasa.com.br/kit-premium-l45/' },
        { id: 'Kit Premium L50', minWidth: 50, maxWidth: 54, url: 'https://www.olhonabrasa.com.br/kit-premium-l50/' },
        { id: 'Kit Premium L55', minWidth: 55, maxWidth: 59, url: 'https://www.olhonabrasa.com.br/kit-premium-l55/' },
        { id: 'Kit Premium L60', minWidth: 60, maxWidth: 64, url: 'https://www.olhonabrasa.com.br/kit-premium-l60/' },
        { id: 'Kit Premium L65', minWidth: 65, maxWidth: 69, url: 'https://www.olhonabrasa.com.br/kit-premium-l65/' },
        { id: 'Kit Premium L70', minWidth: 70, maxWidth: 74, url: 'https://www.olhonabrasa.com.br/kit-premium-l70/' },
        { id: 'Kit Premium L75', minWidth: 75, maxWidth: 79, url: 'https://www.olhonabrasa.com.br/kit-premium-l75/' },
        { id: 'Kit Premium L80', minWidth: 80, maxWidth: 84, url: 'https://www.olhonabrasa.com.br/kit-premium-l80/' },
        { id: 'Kit Premium L85', minWidth: 85, maxWidth: 89, url: 'https://www.olhonabrasa.com.br/kit-premium-l85/' },
        { id: 'Kit Premium L90', minWidth: 90, maxWidth: 94, url: 'https://www.olhonabrasa.com.br/kit-premium-l90/' },
        { id: 'Kit Premium L95', minWidth: 95, maxWidth: 99, url: 'https://www.olhonabrasa.com.br/kit-premium-95/' },
        { id: 'Kit Premium L100', minWidth: 100, maxWidth: 104, url: 'https://www.olhonabrasa.com.br/kit-premium-l100/' },
        { id: 'Kit Premium L110', minWidth: 110, maxWidth: 114, url: 'https://www.olhonabrasa.com.br/kit-premium-l110/' },
        { id: 'SOB CONSULTA', minWidth: 115, maxWidth: 300, url: 'https://api.whatsapp.com/send?phone=554740420956' }
    ];

    // --- State ---
    let state = {
        isOpen: false,
        view: 'input', // 'input' | 'recommendation' | 'custom'
        userData: {
            width: 0,
            depth: 0,
            kit: null,
            bladeSize: 0,
            grillSize: 0,
            kitSize: 0
        }
    };

    // --- Initialization ---
    function init() {
        injectStyles();

        const path = window.location.pathname;
        const href = window.location.href;

        if (href.includes('/kit') || href.includes('index.html') || path === '/' || path === '') {
            renderLauncher();
            startCalloutLoop();
        }
    }

    function injectStyles() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'styles.css';
        document.head.appendChild(link);
    }

    // --- Launcher ---
    function renderLauncher() {
        const container = document.createElement('div');
        container.id = 'onb-conf-launcher-container';
        container.innerHTML = `
            <div id="onb-conf-callout"></div>
            <div id="onb-conf-launcher-btn">
                <div class="icon-ruler-dimension-line"></div>
            </div>
        `;
        document.body.appendChild(container);
        document.getElementById('onb-conf-launcher-btn').addEventListener('click', openModal);
    }

    function startCalloutLoop() {
        const callout = document.getElementById('onb-conf-callout');
        const loop = async () => {
            if (state.isOpen) return;
            callout.style.display = 'block';
            callout.innerHTML = 'Clique para a medida!';
            await wait(5000);
            callout.style.display = 'none';
            await wait(10000);
            loop();
        };
        loop();
    }

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // --- Modal Logic ---
    function openModal(targetView = 'input') {
        state.isOpen = true;
        state.view = targetView;
        document.getElementById('onb-conf-callout').style.display = 'none';

        if (!document.getElementById('onb-conf-modal-overlay')) {
            createModalStructure();
        }

        if (targetView === 'custom') {
            renderCustomState();
        } else if (targetView === 'recommendation') {
            renderRecommendationState();
        } else {
            renderInputState();
        }

        document.getElementById('onb-conf-modal-overlay').style.display = 'flex';
    }

    function closeModal() {
        state.isOpen = false;
        document.getElementById('onb-conf-modal-overlay').style.display = 'none';
    }

    function createModalStructure() {
        const overlay = document.createElement('div');
        overlay.id = 'onb-conf-modal-overlay';
        overlay.innerHTML = `
            <div id="onb-conf-modal">
                <button id="onb-conf-close">&times;</button>
                
                <!-- Left Column (Visual) -->
                <div class="onb-col-visual img-container-full">
                    <img id="onb-visual-img" class="onb-visual-img full-width" src="${CONFIG.images.hero}">
                </div>

                <!-- Right Column (Action) -->
                <div class="onb-col-action" id="onb-action-container">
                    <!-- Content Injected via JS -->
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        document.getElementById('onb-conf-close').addEventListener('click', closeModal);
    }

    // --- Render States ---

    function renderInputState() {
        const container = document.getElementById('onb-action-container');
        container.innerHTML = `
            <div class="onb-title">Descubra o tamanho ideal</div>
            <div class="onb-subtitle">Insira as medidas internas da sua alvenaria.</div>
            
            <div class="onb-form-group">
                <label class="onb-label">Largura da Boca (cm)</label>
                <input type="number" id="onb-width" class="onb-input" placeholder="0" value="${state.userData.width || ''}">
            </div>

            <div class="onb-form-group">
                <label class="onb-label">Comprimento (cm)</label>
                <input type="number" id="onb-depth" class="onb-input" placeholder="0" value="${state.userData.depth || ''}">
            </div>

            <button id="onb-calc-btn" class="onb-btn">Calcular Medidas</button>
        `;

        document.getElementById('onb-calc-btn').addEventListener('click', calculate);

        // Visual Guide Logic
        const visualCol = document.querySelector('.onb-col-visual');
        const img = document.getElementById('onb-visual-img');

        const resetVisual = () => {
            visualCol.classList.remove('guide-mode');
            img.src = CONFIG.images.hero;
        };

        const setGuide = () => {
            visualCol.classList.add('guide-mode');
            const isMobile = window.innerWidth <= 768;
            img.src = isMobile ? CONFIG.images.guideMobile : CONFIG.images.guideDesktop;
        };

        const inputs = [
            document.getElementById('onb-width'),
            document.getElementById('onb-depth')
        ];

        inputs.forEach(input => {
            input.addEventListener('focus', setGuide);
            input.addEventListener('blur', resetVisual);
        });

        // Update image on resize if in guide mode
        window.addEventListener('resize', () => {
            if (visualCol.classList.contains('guide-mode')) {
                setGuide();
            }
        });
    }

    function renderRecommendationState() {
        const { kit, width, depth, bladeSize, grillSize, kitSize } = state.userData;
        const container = document.getElementById('onb-action-container');
        const visualContainer = document.querySelector('.onb-col-visual');

        // --- 1. Left Column (Image + Badge) ---
        // Update Image to the Kit Image
        const img = document.getElementById('onb-visual-img');
        if (img) img.src = 'https://s3.1app.com.br/master/project_24727/ZAabSCADWKeq05dGvQqkybMNjmsdeTD7.png';

        // Clear previous overlays
        const existingBadge = document.getElementById('onb-badge-best');
        if (existingBadge) existingBadge.remove();

        const badgeHTML = `
            <div id="onb-badge-best" class="onb-badge-best-option">
                <div class="onb-badge-check">✓</div>
                <div class="onb-badge-title">Melhor Opção</div>
                <div class="onb-badge-kit">KIT</div>
                <div class="onb-badge-sub">${kitSize}L X 50C</div>
            </div>
            <button class="onb-btn" style="position:absolute; bottom:20px; left:20px; width:auto; padding:8px 16px; font-size:12px; background:white; color:black; border:1px solid #e5e7eb;" onclick="window.location.reload()">
                Editar Medidas
            </button>
        `;
        visualContainer.insertAdjacentHTML('beforeend', badgeHTML);

        // --- 2. Right Column (Specs List) ---

        // Logic for Best Matches
        // Grill: Target Width = (Width - 5) / 2. Target Depth = Depth.
        const targetGrillW = (width - 5) / 2;
        const bestGrill = GRILL_SIZES.reduce((prev, curr) => {
            // Find largest grill that fits (W <= targetW and D <= targetD)
            if (curr.w <= targetGrillW && curr.d <= depth) {
                if (!prev) return curr;
                // Prioritize width match, then depth match
                if (curr.w > prev.w) return curr;
                if (curr.w === prev.w && curr.d > prev.d) return curr;
            }
            return prev;
        }, null) || { w: '??', d: '??' };

        // Skewer: Already calculated in bladeSize (depth - 1, floor 5)

        // Support: Already calculated in kitSize (width, floor 5)

        container.innerHTML = `
            <div class="onb-v6-container">
                <div class="onb-v6-specs-list">
                    
                    <!-- Item 2: Grelha URUGUAIA -->
                    <div class="onb-v6-spec-item">
                        <div class="onb-v6-number">2</div>
                        <div class="onb-v6-content">
                            <div class="onb-v6-label">GRELHA <span>URUGUAIA</span></div>
                            <div class="onb-v6-box">${bestGrill.w}L X ${bestGrill.d}C</div>
                        </div>
                    </div>

                    <!-- Item 1: Grelha Descanso -->
                    <div class="onb-v6-spec-item">
                        <div class="onb-v6-number">1</div>
                        <div class="onb-v6-content">
                            <div class="onb-v6-label">GRELHA <span>DESCANSO</span></div>
                            <div class="onb-v6-box">${(kitSize - 5)}L CM</div>
                        </div>
                    </div>

                    <!-- Item 1: Suporte -->
                    <div class="onb-v6-spec-item">
                        <div class="onb-v6-number">1</div>
                        <div class="onb-v6-content">
                            <div class="onb-v6-label">SUPORTE <span>SUSPENSO</span></div>
                            <div class="onb-v6-box">${kitSize}L CM</div>
                        </div>
                    </div>

                    <!-- Item 3: Espetos -->
                    <div class="onb-v6-spec-item">
                        <div class="onb-v6-number">3</div>
                        <div class="onb-v6-content">
                            <div class="onb-v6-label">ESPETOS <span>DUPLOS</span></div>
                            <div class="onb-v6-box">${bladeSize} CM</div>
                        </div>
                    </div>

                </div>

                <div style="margin-top:auto;">
                    <a href="${kit.url}${window.location.search}" target="_blank" class="onb-btn-block-primary">
                        ADQUIRIR KIT COMPLETO
                    </a>
                    <button class="onb-btn-block-secondary" id="btn-go-custom">
                        MONTAR UM KIT ESPECÍFICO
                    </button>
                </div>
            </div>
        `;

        document.getElementById('btn-go-custom').addEventListener('click', () => {
            state.view = 'custom';
            renderCustomState();
        });
    }

    function renderCustomState() {
        const { kit, width, depth, bladeSize, kitSize } = state.userData;
        const container = document.getElementById('onb-action-container');

        // Recalculate Best Grill for this view
        let targetGrillW = (width - 5) / 2;
        let isSplit = true;

        const findGrill = (targetW, targetD) => {
            return GRILL_SIZES.reduce((prev, curr) => {
                if (curr.w <= targetW && curr.d <= targetD) {
                    if (!prev) return curr;
                    if (curr.w > prev.w) return curr;
                    if (curr.w === prev.w && curr.d > prev.d) return curr;
                }
                return prev;
            }, null);
        };

        let bestGrill = findGrill(targetGrillW, depth);

        // Fallback to Single Grill if no split grill found (e.g. width < 49cm)
        if (!bestGrill) {
            isSplit = false;
            targetGrillW = width - 2; // 2cm clearance for single grill
            bestGrill = findGrill(targetGrillW, depth);
        }

        const grillLabel = isSplit ? 'GRELHAS <span>BIPARTIDAS</span>' : 'GRELHA <span>URUGUAIA</span>';
        const valueText = bestGrill ? `${bestGrill.w}L X ${bestGrill.d}C` : 'SOB MEDIDA';

        container.innerHTML = `
            <div class="onb-v6-container">
                <button class="btn-back" id="btn-back-rec">← Voltar para recomendação</button>
                
                <div class="onb-title" style="font-size: 20px; font-family: var(--onb-font-display); text-transform: uppercase;">Lista de Peças Compatíveis</div>
                <div class="onb-subtitle">Baseado nas medidas ${width}x${depth}cm.</div>

                <div class="onb-v6-specs-list">
                    <!-- Item 1: Suporte -->
                    <div class="onb-v6-spec-item">
                        <div class="onb-v6-number">1</div>
                        <div class="onb-v6-content">
                            <div class="onb-v6-label">SUPORTE <span>SUSPENSO</span></div>
                            <div class="onb-v6-box">${kitSize}L CM</div>
                        </div>
                    </div>

                    <!-- Item 2: Grelha Principal -->
                    <div class="onb-v6-spec-item">
                        <div class="onb-v6-number">2</div>
                        <div class="onb-v6-content">
                            <div class="onb-v6-label">${grillLabel}</div>
                            <div class="onb-v6-box">${bestGrill ? bestGrill.w + 'L X ' + bestGrill.d + 'C' : 'SOB MEDIDA'}</div>
                        </div>
                    </div>

                    <!-- Item 3: Espetos -->
                    <div class="onb-v6-spec-item">
                        <div class="onb-v6-number">3</div>
                        <div class="onb-v6-content">
                            <div class="onb-v6-label">ESPETOS <span>MEDIDAS</span></div>
                            <div class="onb-v6-box">${bladeSize} CM</div>
                        </div>
                    </div>
                </div>

                <a href="https://www.olhonabrasa.com.br/churrasqueiras-gourmet" target="_blank" class="onb-btn-block-primary">
                    VER TODAS AS PEÇAS NA LOJA
                </a>
            </div>
        `;

        document.getElementById('btn-back-rec').addEventListener('click', () => {
            state.view = 'recommendation';
            renderRecommendationState();
        });
    }


    // --- Logic ---
    function calculate() {
        const width = parseInt(document.getElementById('onb-width').value);
        const depth = parseInt(document.getElementById('onb-depth').value);

        if (!width || !depth) {
            alert("Por favor, preencha todas as medidas.");
            return;
        }

        const kit = GRILL_KITS.find(k => width >= k.minWidth && width <= k.maxWidth);
        if (!kit) {
            alert("Medida fora do padrão. Entre em contato para Sob Medida.");
            return;
        }

        // Calculations
        const bladeSize = Math.floor((depth - 1) / 5) * 5;
        const grillSize = width - 5;
        const kitSize = Math.floor(width / 5) * 5; // Approximation for display

        state.userData = { width, depth, kit, bladeSize, grillSize, kitSize };

        // Save to LocalStorage
        localStorage.setItem('onb_data', JSON.stringify(state.userData));

        // Switch View
        state.view = 'recommendation';
        renderRecommendationState();

        // Update inline recommendation if on product page
        injectProductRecommendation();
    }

    // --- Product Page Injection ---
    function injectProductRecommendation() {
        // 1. Check if data exists
        const storedData = localStorage.getItem('onb_data');
        if (!storedData) return;

        const userData = JSON.parse(storedData);
        const { width, depth, kitSize, bladeSize } = userData;

        // 2. Determine Context & Content
        let titleHTML = '';
        let valueText = '';
        const href = window.location.href;

        if (href.includes('grelha') || true) { // Force true for testing
            const targetGrillW = (width - 5) / 2;
            const bestGrill = GRILL_SIZES.reduce((prev, curr) => {
                if (curr.w <= targetGrillW && curr.d <= depth) {
                    if (!prev) return curr;
                    if (curr.w > prev.w) return curr;
                    if (curr.w === prev.w && curr.d > prev.d) return curr;
                }
                return prev;
            }, null);

            if (bestGrill) {
                titleHTML = 'GRELHA <span>RECOMENDADA</span>';
                valueText = `${bestGrill.w}L X ${bestGrill.d}C`;
            }
        } else if (href.includes('kit')) {
            titleHTML = 'KIT <span>RECOMENDADO</span>';
            valueText = `${kitSize}L CM`;
        } else if (href.includes('espeto')) {
            titleHTML = 'ESPETO <span>RECOMENDADO</span>';
            valueText = `${bladeSize} CM`;
        }

        if (!valueText) return;

        // 3. Find Injection Point
        const variationsWrapper = document.querySelector('.listing-wrapper[data-target="variacao"]');

        if (variationsWrapper) {
            if (document.querySelector('.onb-inline-container')) return;

            const html = `
                <div class="onb-inline-container v6-style">
                    <div class="onb-v6-content inline-mode">
                        <div class="onb-v6-label">${titleHTML}</div>
                        <div class="onb-v6-box">${valueText}</div>
                        <div class="onb-inline-sub">Baseado nas medidas ${width}x${depth}cm que você forneceu.</div>
                    </div>
                    <button id="onb-inline-btn" class="onb-inline-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/></svg>
                        Medidas por Produtos
                    </button>
                </div>
            `;

            variationsWrapper.insertAdjacentHTML('afterend', html);

            document.getElementById('onb-inline-btn').addEventListener('click', (e) => {
                e.preventDefault();
                // Ensure state is populated with stored data
                state.userData = userData;
                openModal('custom');
            });
        }
    }

    // Run
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Try to inject on load if data exists
    window.addEventListener('load', injectProductRecommendation);

})();
