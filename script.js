/**
 * DATA STORE - Centralizado para fácil manutenção
 */
const CONFIG = {
    stats: [
        { label: "Atletas", value: "10k+", icon: "👥" },
        { label: "Precisão IA", value: "99.2%", icon: "🎯" },
        { label: "Recordes", value: "450", icon: "🏆" }
    ],
    plans: [
        { id: 'elite', name: 'Elite', price: 'R$ 299', features: ['Biofeedback', 'Personal 24h'] },
        { id: 'pro', name: 'Pro', price: 'R$ 149', features: ['Planilha IA', 'Suporte'] }
    ],
    cards: [
        { title: "Neuro-Track", body: "Sincronize sua mente com o ritmo do treino.", tag: "Tech" },
        { title: "Eco-Hydra", body: "Hidratação inteligente baseada em suor.", tag: "Bio" },
        { title: "Zero-G", body: "Recuperação muscular em gravidade zero.", tag: "Recovery" }
    ]
};

/**
 * UI ENGINE
 */
const UI = {
    init() {
        this.renderStats();
        this.renderPlans();
        this.renderCards();
        this.initAccessibility();
        this.handleScroll();
        this.removeLoader();
    },

    renderStats() {
        const container = document.getElementById('stats-container');
        container.innerHTML = CONFIG.stats.map(s => `
            <div class="stat-item">
                <span role="img">${s.icon}</span>
                <strong>${s.value}</strong>
                <small>${s.label}</small>
            </div>
        `).join('');
    },

    renderPlans() {
        const list = document.getElementById('tab-list');
        const content = document.getElementById('tab-content');

        list.innerHTML = CONFIG.plans.map((p, i) => `
            <button role="tab" aria-selected="${i === 0}" onclick="UI.switchTab('${p.id}')">
                ${p.name}
            </button>
        `).join('');

        this.switchTab(CONFIG.plans[0].id);
    },

    switchTab(id) {
        const plan = CONFIG.plans.find(p => p.id === id);
        const content = document.getElementById('tab-content');
        
        content.innerHTML = `
            <div class="plan-details animate-fade">
                <h3>${plan.name} - <span class="price">${plan.price}</span></h3>
                <ul>${plan.features.map(f => `<li>✓ ${f}</li>`).join('')}</ul>
            </div>
        `;
    },

    renderCards() {
        const grid = document.getElementById('main-grid');
        grid.innerHTML = CONFIG.cards.map(c => `
            <article class="card-ultra">
                <span class="badge-sm">${c.tag}</span>
                <h3>${c.title}</h3>
                <p>${c.body}</p>
                <button class="btn-text">Ver detalhes →</button>
            </article>
        `).join('');
    },

    handleScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if(e.isIntersecting) e.target.classList.add('visible');
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    },

    initAccessibility() {
        // Toggle Contrast
        document.getElementById('contrast-toggle').addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
        });

        // Font Controls
        let size = 100;
        document.getElementById('font-inc').onclick = () => {
            size += 10;
            document.documentElement.style.fontSize = `${size}%`;
        };
        document.getElementById('font-dec').onclick = () => {
            size = Math.max(80, size - 10);
            document.documentElement.style.fontSize = `${size}%`;
        };
    },

    removeLoader() {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.getElementById('loader').style.display = 'none';
        }, 800);
    }
};

// Start the Engine
document.addEventListener('DOMContentLoaded', () => UI.init());
