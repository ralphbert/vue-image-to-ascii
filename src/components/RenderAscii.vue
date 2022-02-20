<template>
  <div>
    <pre>{{ ascii }}</pre>
  </div>
</template>

<script lang="ts">
import {getCanvasPixels, numberToChar, pixelToGrayscale} from '../lib/file-service';

export default {
  props: {
    canvas: HTMLCanvasElement,
    chars: Array,
  },
  watch: {
    canvas() {
      this.doIt();
    },
    chars() {
      this.doIt();
    }
  },
  methods: {
    doIt() {
      this.ascii = '';

      if (!this.canvas || !this.chars || this.chars.length <= 0) {
        return;
      }

      const pixels = getCanvasPixels(this.canvas);

      for (let y = 0; y < pixels.length; y++) {
        for (let x = 0; x < pixels[y].length; x++) {
          const px = pixels[y][x];
          const gs = pixelToGrayscale(px);
          this.ascii += numberToChar(gs, this.chars);
        }
        this.ascii += '\n';
      }
    }
  },
  data() {
    return {
      ascii: '',
    }
  },
  mounted() {
    this.doIt();
  }
}
</script>

<style scoped>
pre {
  line-height: 0.7;
  font-size: clamp(4.5px, 1.5vw, 10px);
}
</style>
