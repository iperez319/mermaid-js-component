import {html, css, LitElement} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import "https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js";

const { mermaid: mermaidAPI } = window;

export class LivePreview extends LitElement {
  static properties = {
    code: {},
  };
  // Define scoped styles right with your component, in plain CSS
  // static styles = css`
  //   :host {
  //     color: blue;
  //   }
  // `;

  constructor() {
    super();
    // Mermaid.js default graph
    this.code = `
      graph TD 
      A[Client] --> B[Load Balancer] 
      B --> C[Server1] 
      B --> D[Server2]
    `;
  }

  // Render the UI as a function of component state
  render() {
    try {
      mermaidAPI.render('mermaid', this.code, svg => {
        if(this.shadowRoot.querySelector("#mermaid")){
          this.shadowRoot.getElementById("mermaid").innerHTML = svg;
        } else {
          let newDiv = document.createElement("div");
          newDiv.id = "mermaid";
          newDiv.innerHTML = svg;
          newDiv.part = "box"
          this.shadowRoot.appendChild(newDiv);
      }}); 
    } catch (err) {
      this.dispatchEvent(new CustomEvent('error', { detail: err }));
    }
    return html``;
  }

}

customElements.define('live-preview', LivePreview);