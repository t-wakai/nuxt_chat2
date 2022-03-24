<template>
  <chat
    type="twitter"
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
      this.$axios.$get(this.$config.TWITTER_API_URL, {params})
        .then( response => {
          console.log('response data', response)
          if (!response["tweet_id"] || response["tweet_id"] === "0"){
            msg["text"] = this.$t('not_hit_tweet')
            msg["type"] = "text"
            this.$store.commit(
              'messages/add', 
              {
                type: "twitter",
                message: msg
              }
            )
            return
          }

          msg["text"] = response["tweet_id"]
          msg["type"] = "twitter"
          this.$store.commit(
            'messages/add', 
            {
              type: "twitter",
              message: msg
            }
          )
          this.$scroolToBottom(this.$vuetify)          
        })
        .catch( error => {
          console.log("response error", error)
          msg["text"] = this.$t('search_error', { type: 'Tweet' })
          msg["type"] = "text"
          this.$store.commit(
            'messages/add', 
            {
              type: "twitter",
              message: msg
            }
          )
        })
    }
  },
}
</script>