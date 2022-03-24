<template>
  <v-footer height="80" fixed>
    <v-app-bar color="rgba(0,0,0,0)" flat>
      <v-text-field
        v-model="message"
        append-icon="mdi-emoticon"
        append-outer-icon="mdi-send"
        filled
        clear-icon="mdi-close-circle"
        clearable
        label="Message"
        type="text"
        hide-details="true"
        @click:append="toggleEmojiPicker"
        @click:append-outer="onClickSend"
        @click:clear="clearMessage"
      ></v-text-field>
    </v-app-bar>
    <emoji-picker ref="emojiPicker" :onSelect="onSelectEmoji"/>
  </v-footer>
</template>
<script>

export default {
  props: {
    sendMessage: {
      type: Function,
      required: true,
    }
  },

  data: () => ({
    message: '',
    show: false,      
  }),

  methods: {
    onClickSend(){
      if (this.message.trim() == ""){
        return
      }
      this.sendMessage(this.message)
      this.clearMessage()
    },
    clearMessage () {
      this.message = ''
    },
    toggleEmojiPicker (test) {
      this.$refs.emojiPicker.toggle()
    },
    onSelectEmoji (emoji) {
      this.message = this.message != null ?  this.message + emoji : emoji
    }
  },
}
</script>
