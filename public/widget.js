/**
 * CryptoFlow Embeddable Widget
 * Standalone vanilla JS widget - works on any website
 *
 * Usage:
 * <div data-widget="crypto-price" data-coin="bitcoin" data-theme="dark"></div>
 * <script src="https://crypto-flow-delta.vercel.app/widget.js"></script>
 */

(function() {
  'use strict';

  // Detect API base URL from script source
  function getApiBase() {
    // Try document.currentScript first (most reliable)
    if (document.currentScript && document.currentScript.src) {
      const url = new URL(document.currentScript.src);
      return url.origin;
    }

    // Fallback: search for our script in the document
    const scripts = document.querySelectorAll('script[src*="widget.js"]');
    for (let script of scripts) {
      if (script.src.includes('crypto-flow') || script.src.includes('widget.js')) {
        const url = new URL(script.src);
        return url.origin;
      }
    }

    // Final fallback: use the production domain
    return 'https://crypto-flow-delta.vercel.app';
  }

  const API_BASE = getApiBase();

  // Default configuration
  const DEFAULTS = {
    coin: 'bitcoin',
    theme: 'dark',
    currency: 'usd',
    showVolume: true,
    showMarketCap: true,
    showChange: true,
    refreshInterval: 60000,
    exchange: null
  };

  // Theme colors
  const THEMES = {
    dark: {
      bg: '#1e293b',
      bgSecondary: '#334155',
      text: '#ffffff',
      textMuted: '#94a3b8',
      border: '#475569',
      accent: '#3b82f6',
      positive: '#10b981',
      negative: '#ef4444'
    },
    light: {
      bg: '#ffffff',
      bgSecondary: '#f1f5f9',
      text: '#1e293b',
      textMuted: '#64748b',
      border: '#e2e8f0',
      accent: '#3b82f6',
      positive: '#10b981',
      negative: '#ef4444'
    }
  };

  // Format price
  function formatPrice(price, currency) {
    const symbols = { usd: '$', eur: '€', gbp: '£' };
    const symbol = symbols[currency] || '$';

    if (price >= 1) {
      return symbol + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return symbol + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
  }

  // Format large numbers
  function formatLargeNumber(num) {
    if (num >= 1e12) return '$' + (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return '$' + (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return '$' + (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return '$' + (num / 1e3).toFixed(2) + 'K';
    return '$' + num.toFixed(2);
  }

  // Create widget styles
  function createStyles(theme) {
    const t = THEMES[theme] || THEMES.dark;
    return `
      .cf-widget {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        background: ${t.bg};
        border: 1px solid ${t.border};
        border-radius: 12px;
        padding: 20px;
        color: ${t.text};
        box-sizing: border-box;
        width: 100%;
        max-width: 400px;
      }
      .cf-widget * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      .cf-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
      }
      .cf-logo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .cf-info {
        flex: 1;
      }
      .cf-name {
        font-size: 18px;
        font-weight: 600;
        color: ${t.text};
      }
      .cf-symbol {
        font-size: 14px;
        color: ${t.textMuted};
        text-transform: uppercase;
      }
      .cf-change {
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
      }
      .cf-change-positive {
        background: ${t.positive}20;
        color: ${t.positive};
      }
      .cf-change-negative {
        background: ${t.negative}20;
        color: ${t.negative};
      }
      .cf-price {
        font-size: 32px;
        font-weight: 700;
        color: ${t.text};
        margin-bottom: 16px;
      }
      .cf-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-bottom: 16px;
      }
      .cf-stat {
        background: ${t.bgSecondary};
        padding: 12px;
        border-radius: 8px;
      }
      .cf-stat-label {
        font-size: 12px;
        color: ${t.textMuted};
        margin-bottom: 4px;
      }
      .cf-stat-value {
        font-size: 14px;
        font-weight: 600;
        color: ${t.text};
      }
      .cf-exchange {
        background: ${t.accent}15;
        padding: 12px;
        border-radius: 8px;
        text-align: center;
        margin-bottom: 16px;
      }
      .cf-exchange a {
        color: ${t.accent};
        text-decoration: none;
        font-weight: 500;
      }
      .cf-exchange a:hover {
        text-decoration: underline;
      }
      .cf-footer {
        display: flex;
        justify-content: space-between;
        padding-top: 12px;
        border-top: 1px solid ${t.border};
        font-size: 11px;
        color: ${t.textMuted};
      }
      .cf-loading {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px;
      }
      .cf-spinner {
        width: 32px;
        height: 32px;
        border: 3px solid ${t.border};
        border-top-color: ${t.accent};
        border-radius: 50%;
        animation: cf-spin 1s linear infinite;
      }
      @keyframes cf-spin {
        to { transform: rotate(360deg); }
      }
      .cf-error {
        text-align: center;
        padding: 20px;
        color: ${t.negative};
      }
      .cf-retry {
        margin-top: 12px;
        padding: 8px 16px;
        background: ${t.accent};
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
      }
      .cf-retry:hover {
        opacity: 0.9;
      }
      .cf-powered {
        font-size: 10px;
        color: ${t.textMuted};
        text-align: center;
        margin-top: 8px;
      }
      .cf-powered a {
        color: ${t.accent};
        text-decoration: none;
      }
    `;
  }

  // Widget class
  class CryptoWidget {
    constructor(container) {
      this.container = container;
      this.config = this.parseConfig();
      this.data = null;
      this.styleId = 'cf-widget-styles-' + this.config.theme;
      this.init();
    }

    parseConfig() {
      const d = this.container.dataset;
      return {
        coin: d.coin || DEFAULTS.coin,
        theme: d.theme || DEFAULTS.theme,
        currency: d.currency || DEFAULTS.currency,
        showVolume: d.showVolume !== 'false',
        showMarketCap: d.showMarketCap !== 'false',
        showChange: d.showChange !== 'false',
        refreshInterval: parseInt(d.refreshInterval) || DEFAULTS.refreshInterval,
        exchange: d.exchange || null
      };
    }

    injectStyles() {
      if (!document.getElementById(this.styleId)) {
        const style = document.createElement('style');
        style.id = this.styleId;
        style.textContent = createStyles(this.config.theme);
        document.head.appendChild(style);
      }
    }

    async fetchData() {
      try {
        const response = await fetch(`${API_BASE}/api/coin/${this.config.coin}`);
        if (!response.ok) throw new Error('API Error');
        this.data = await response.json();
        return true;
      } catch (error) {
        console.error('CryptoFlow Widget Error:', error);
        return false;
      }
    }

    render() {
      this.injectStyles();

      if (!this.data) {
        this.container.innerHTML = `
          <div class="cf-widget">
            <div class="cf-error">
              <p>Unable to load data</p>
              <button class="cf-retry" onclick="this.closest('[data-widget]').__cfWidget.retry()">
                Retry
              </button>
            </div>
          </div>
        `;
        return;
      }

      const d = this.data;
      const c = this.config;
      const price = d.market_data.current_price[c.currency] || d.market_data.current_price.usd;
      const change = d.market_data.price_change_percentage_24h;
      const marketCap = d.market_data.market_cap[c.currency] || d.market_data.market_cap.usd;
      const volume = d.market_data.total_volume[c.currency] || d.market_data.total_volume.usd;
      const isPositive = change >= 0;

      let statsHtml = '';
      if (c.showMarketCap || c.showVolume) {
        statsHtml = '<div class="cf-stats">';
        if (c.showMarketCap) {
          statsHtml += `
            <div class="cf-stat">
              <div class="cf-stat-label">Market Cap</div>
              <div class="cf-stat-value">${formatLargeNumber(marketCap)}</div>
            </div>
          `;
        }
        if (c.showVolume) {
          statsHtml += `
            <div class="cf-stat">
              <div class="cf-stat-label">24h Volume</div>
              <div class="cf-stat-value">${formatLargeNumber(volume)}</div>
            </div>
          `;
        }
        statsHtml += '</div>';
      }

      let exchangeHtml = '';
      if (c.exchange) {
        exchangeHtml = `
          <div class="cf-exchange">
            <a href="#" target="_blank">Trade on ${c.exchange} →</a>
          </div>
        `;
      }

      this.container.innerHTML = `
        <div class="cf-widget">
          <div class="cf-header">
            <img class="cf-logo" src="${d.image.small}" alt="${d.name}">
            <div class="cf-info">
              <div class="cf-name">${d.name}</div>
              <div class="cf-symbol">${d.symbol}</div>
            </div>
            ${c.showChange ? `
              <div class="cf-change ${isPositive ? 'cf-change-positive' : 'cf-change-negative'}">
                ${isPositive ? '↑' : '↓'} ${Math.abs(change).toFixed(2)}%
              </div>
            ` : ''}
          </div>

          <div class="cf-price">${formatPrice(price, c.currency)}</div>

          ${statsHtml}
          ${exchangeHtml}

          <div class="cf-footer">
            <span>Data by CoinGecko</span>
            <span>Updated ${new Date().toLocaleTimeString()}</span>
          </div>

          <div class="cf-powered">
            Powered by <a href="https://crypto-flow-delta.vercel.app" target="_blank">CryptoFlow</a>
          </div>
        </div>
      `;

      this.container.__cfWidget = this;
    }

    renderLoading() {
      this.injectStyles();
      this.container.innerHTML = `
        <div class="cf-widget">
          <div class="cf-loading">
            <div class="cf-spinner"></div>
          </div>
        </div>
      `;
    }

    async init() {
      this.renderLoading();
      const success = await this.fetchData();
      this.render();

      if (success && this.config.refreshInterval > 0) {
        setInterval(async () => {
          await this.fetchData();
          this.render();
        }, this.config.refreshInterval);
      }
    }

    async retry() {
      this.renderLoading();
      await this.fetchData();
      this.render();
    }
  }

  // Initialize all widgets
  function initWidgets() {
    const containers = document.querySelectorAll('[data-widget="crypto-price"]');
    containers.forEach(container => {
      if (!container.__cfWidget) {
        new CryptoWidget(container);
      }
    });
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidgets);
  } else {
    initWidgets();
  }

  // Expose globally
  window.CryptoFlowWidget = CryptoWidget;
  window.initCryptoFlowWidgets = initWidgets;

})();
