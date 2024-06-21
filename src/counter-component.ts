class CounterComponent extends HTMLElement {
  private initialValue: number;
  private step: number;
  private valueDiv: HTMLDivElement;

  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: 'open'
    });

    const container = document.createElement('div');
    const button = document.createElement('button');
    this.valueDiv = document.createElement('div');

    button.textContent = 'Increase';

    container.appendChild(this.valueDiv);
    container.appendChild(button);
    shadow.appendChild(container);

    this.initialValue = parseInt(this.getAttribute('initial-value') || '0', 10);
    this.step = parseInt(this.getAttribute('step') || '1', 10);

    this.updateValueDiv();

    button.addEventListener('click', () => this.increaseValue());
  }

  private increaseValue() {
    this.initialValue += this.step;
    this.updateValueDiv();

    const event = new CustomEvent('valueChanged', {
      detail: {
        value: this.initialValue
      }
    });
    this.dispatchEvent(event);
  }

  private updateValueDiv() {
    this.valueDiv.textContent = this.initialValue.toString();
  }

  static get observedAttributes() {
    return ['initial-value', 'step'];
  }

  get value(): number {
    return this.initialValue;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'initial-value':
        this.initialValue = parseInt(newValue, 10);
        this.updateValueDiv();
        break;
      case 'step':
        this.step = parseInt(newValue, 10);
        break;
    }
  }
}

customElements.define('counter-component', CounterComponent);
