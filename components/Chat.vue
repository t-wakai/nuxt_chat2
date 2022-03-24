<template>
  <v-container fluid class="pa-2">
    <v-row>
      <v-col cols="12" md="8" sm="10">
        <div v-for="msg in messages" color="rgba(0,0,0,0)" flat class="pb-4" :key="msg.key">
          <template v-if="msg.isyou">
            <message :text="msg.text" :alignRight="true" iconClass="fa-regular fa-face-smile" />
            <div style="width:100%; height:2px; clear:both;" />
          </template>
          <template v-else>
            <message :text="msg.text" :alignRight="false" :iconClass="type === 'twitter' ? 'fab fa-twitter' : 'fa-brands fa-youtube'">
              <template v-if="msg.type === 'twitter'">
                <Tweet :id="msg.text" class="ml-2 float-left tweet" error-message="This tweet could not be loaded" error-message-class="tweet--not-found">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </Tweet>
              </template>
              <template v-else-if="msg.type === 'youtube'">
                <youtube :video-id="msg.text" :width="youtubeWidth" :height="youtubeHeight" class="ml-2 float-left youtube" />
              </template>
            </message>
            <div style="width:100%; height:2px; clear:both;" />
          </template>  
        </div>
      </v-col>
    </v-row>
    <div style="height:50px" />
    <text-editor ref="scroll" :sendMessage="sendMessage" />
  </v-container>
</template>

<script>
import Message from './Message.vue'
export default {
  components: { Message },
  data: () => ({
     youtubeWidth: 640,
     youtubeHeight: 360
  }),

  props: {
    type: {
      type: String,
      required: true,
    },
    createSearchParams: {
      type: Function,
      required: true,
    },
    search: {
      type: Function,
      required: true,
    }
  },
  
  computed: {
    messages () {
      if (this.type === "twitter"){
        return this.$store.state.messages.tweetList
      } else {
        return this.$store.state.messages.youtubeList
      }
    }
  },

  mounted() {
    console.log(this.$store.state.messages.tweetList)
    if ((this.type === "twitter" && this.$store.state.messages.tweetList.length==0)
        || (this.type === "youtube" && this.$store.state.messages.youtubeList.length==0)
    ){
      this.$store.commit(
        'messages/add', 
        {
          type: this.type,
          message: {
            isyou: false,
            text: this.$t('first_text', { type: this.type }),
            key: 1,
            type:"text"
          }
        }
      )
    }
    window.addEventListener('resize', this.handleResize)
  },

  methods: {
    sendMessage (text) {
      this.$store.commit(
        'messages/add', 
        {
          type: this.type,
          message: {
            isyou: true,
            text: text,
            key: this.messages.length+1,
            type:"text"
          }
        }
      )
      const message = {
          isyou: false, key: this.messages.length+1
      }
      const params = this.createSearchParams(text)
      this.search(params, message)
    },

    handleResize () {
      let width = window.innerWidth * 0.8
      if (width >= 640) {
        width = 640
      }
      this.youtubeWidth = width;
      this.youtubeHeight = width * 0.5625;
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
