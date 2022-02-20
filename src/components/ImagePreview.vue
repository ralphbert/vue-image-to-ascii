<template>
  <div class="mt-4">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import {base64ToCanvas, readFile} from '../lib/file-service';

export default {
  name: "ImagePreview.vue",
  data() {
    return {
      canvas: null,
    };
  },
  emits: ['complete'],
  props: {
    file: File,
  },
  watch: {
    file() {
      this.update();
    }
  },
  methods: {
    update() {
      if (this.file) {
        readFile(this.file).then(result => {
          return base64ToCanvas(result, this.canvas, 100);
        }).then(() => {
          this.$emit('complete', this.canvas);
        });
      }
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas;

    if (this.file) {
      this.update();
    }
  }
}
</script>

<style scoped>
canvas {
  border: 1px solid black;
}
</style>
