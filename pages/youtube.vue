<template>
  <chat
    type="youtube"
    :createSearchParams="createSearchParams"
    :search="search"
  />
</template>

<script>
export default {
  methods: {
    createSearchParams(message){
      return {
        "q": message
      }
    },
    search(params, msg){
      msg["text"] = "xLDb30KHibA"
      msg["type"] = "youtube"
      this.$store.commit(
        'messages/add', 
        {
          type: "youtube",
          message: msg
        }
      )
      this.$scroolToBottom(this.$vuetify)
    }
  },
}
</script>