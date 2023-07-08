import { Component, Prop, State, h, Element, Watch, Listen } from '@stencil/core';

@Component({
  tag: 'app-modal',
  styleUrl: 'app-modal.css',
  shadow: true,
})
export class AppModal {
  @Prop() isOpen = false;

  @State() showModal = false;

  @Element() hostElement: HTMLElement;

  componentWillLoad() {
    this.showModal = this.isOpen;
  }

  @Watch('isOpen')
  updateOpenState(newValue: boolean) {
    this.showModal = newValue;
  }

  handleClose() {
    this.showModal = false;
    const closeEvent = new CustomEvent('modalClose', { bubbles: true, composed: true });
    this.hostElement.dispatchEvent(closeEvent);
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      this.handleClose();
    }
  }

  render() {
    return (
      <div class={`modal ${this.showModal ? 'show' : ''}`} role="dialog" aria-modal={this.showModal.toString()} tabIndex={-1}>
        <div class="modal-content">
          <span class="close" onClick={() => this.handleClose()}>
            &times;
          </span>
          <slot></slot>
        </div>
      </div>
    );
  }
}
