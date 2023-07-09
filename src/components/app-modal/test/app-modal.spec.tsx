import { newSpecPage } from '@stencil/core/testing';
import { AppModal } from '../app-modal';

describe('AppModal', () => {
  it('should close the modal when close button is clicked', async () => {
    const page = await newSpecPage({
      components: [AppModal],
      html: `<app-modal></app-modal>`,
    });

    const appModal = page.rootInstance as AppModal;
    const closeButton = page.root.shadowRoot.querySelector('.close') as HTMLElement;

    // Initial state should be closed
    expect(appModal.showModal).toBe(false);
    expect(page.root).toMatchSnapshot();

    // State should be open
    appModal.showModal = true;
    await page.waitForChanges();

    // State should be open
    expect(appModal.showModal).toBe(true);
    expect(page.root).toMatchSnapshot();

    // Click the close buttonf
    closeButton.click();
    await page.waitForChanges();

    // State should be closed again
    expect(appModal.showModal).toBe(false);
    expect(page.root).toMatchSnapshot();
  });
});
