<template>
  <div>
    <h1 class="text-xl mb-4 font-bold">Picture to ASCII converter</h1>

    <div class="flex mb-8">
      <div class="flex-grow">
        <template v-if="!canvas">
          <form>
            <div class="mb-4">
              <input type="file" @change="fileSelected">
            </div>
            <div>
              <label for="chars" class="block mb-1 font-bold">Characters</label>
              <p>Separated by <code>,</code></p>
              <input class="mb-3" id="chars" type="text" v-model="chars">
              <div><code>{{ charsArray }}</code></div>
            </div>
          </form>
        </template>
        <template v-else>
          <button @click="restart">Restart</button>
        </template>
      </div>
      <div>
        <ImagePreview v-show="file" :file="file" @complete="complete"></ImagePreview>
      </div>
    </div>
    <div>
      <RenderAscii v-show="canvas" :chars="charsArray" :canvas="canvas"></RenderAscii>
    </div>
  </div>
</template>

<script lang="ts">
import ImagePreview from './ImagePreview.vue';
import RenderAscii from './RenderAscii.vue';

export default {
  name: 'ImageToAscii.vue',
  data() {
    return {
      file: null,
      canvas: null,
      chars: [' ', '.', ':', 'i', '1', '3', '8', '⌘'].reverse().join(','),
    }
  },
  computed: {
    charsArray() {
      return this.chars.split(',').map(c => c.slice(0, 1)).filter(c => !!c);
    }
  },
  components: {RenderAscii, ImagePreview},
  methods: {
    fileSelected(event: Event) {
      this.file = (event.target as HTMLInputElement).files[0];
    },
    complete(canvas: HTMLCanvasElement) {
      this.canvas = canvas;
    },
    restart() {
      this.canvas = null;
      this.file = null;
    }
  }
}
</script>

<style scoped>

</style>
