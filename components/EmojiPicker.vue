<template>
  <v-container>
    <div class="row">
      <picker
        v-if="show"
        v-click-outside="outsideClick"
        native
        tooltip
        auto-focus
        color="#475DE5"
        title="Pick your favorite"
        emoji="point_up"
        :data="emojiIndex"
        class="emojiPicker"
        @select="select"
      />
    </div>
  </v-container>
</template>

<script>
import data from "emoji-mart-vue-fast/data/all.json";
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast";
let emojiIndex = new EmojiIndex(data);

export default {
  components: {
    Picker
  },
  props: {
    onSelect: {
      type: Function,
      required: true,
    }
  },
  data: () => ({
      emojiIndex: emojiIndex,
      show: false 
  }),
  methods: {
    toggle() {
      this.show = !this.show
    },
    select(emoji) {
      this.onSelect(emoji.native)
    },
    outsideClick() {
      this.show = false
    }
  },
};
</script>

<style scoped>
.emojiPicker {
  position: fixed;
  right: 16px;
  bottom: 56px;
  z-index: 11;
}
</style>