import { Component, h } from '@stencil/core';

@Component({
  tag: 'wave-loading',
  styleUrl: 'wave-loading.css',
  shadow: true,
})
export class WaveLoading {

  render() {
    return (
      <div class="center">
        {[...Array(10)].map((_, index) => (
          <div class="wave" key={index}></div>
        ))}
      </div>
    );
  }

}
