// footer.js – Web Component 2025 FINAL

class AppFooter extends HTMLElement {
  constructor() {
    super();
    const year = new Date().getFullYear();
    
    this.innerHTML = `
        <footer class="footer">
            <div class="container">
                <span data-i18n="footer_rights">All rights reserved</span>
                &nbsp;—&nbsp;
                <span id="footer_year">${year}</span>
            </div>
        </footer>
        `;
  }
}

customElements.define("app-footer", AppFooter);