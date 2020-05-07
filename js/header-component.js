class HeaderComponent extends Polymer.Element {
    static get is() {
        return "header-component";
    }

    static get properties() {
        return {
            titulo: { type: String, value: "Crypto Dashboard" },
            descarga: { type: String, value: "Descarga" },
            ayuda: { type: String, value: "Ayuda" },
            sesion: { type: String, value: "Inicia Sesión" },
            alta: { type: String, value: "Registrate" }
        };
    }
}

window.customElements.define(HeaderComponent.is, HeaderComponent);