<template>
  <v-app :style="{background: $vuetify.theme.themes.dark.background}">
    <v-container fluid  class="pb-30">
      <v-row>
        <v-app-bar color="rgba(0,0,0,0.2)" app flat class="pt-3 pb-2">
          <v-badge
            bordered
            bottom
            color="green"
            dot
            offset-x="11"
            offset-y="13"
          >
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-avatar
                  class="mt-n7"
                  size="40"
                  elevation="10"
                  v-bind="attrs"
                  v-on="on"
                >
                  <i :class="items[selected].name === 'Twitter' ? 'fab fa-twitter' : 'fa-brands fa-youtube'" />
                </v-avatar>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                >
                  <v-list-item-title class="pt-2 pb-2">
                    <div @click="translate(index, item.url)" style="cursor: pointer">
                    <v-avatar
                      size="40"
                      elevation="10"   
                    >
                      <i :class="item.name === 'Twitter' ? 'fab fa-twitter' : 'fa-brands fa-youtube'" />
                    </v-avatar>
                      {{ item.name }}
                    </div>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-badge>
          <v-toolbar-title class="title pl-0 ml-2 mt-n4">
            {{ items[selected].name }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon class="mt-n7" width="30px" height="30px" @click="changeLocale">fas fa-language</v-icon>     
        </v-app-bar>
      </v-row>
      <v-row>
        <v-col cols="12" md="8" sm="10">
          <v-main>
            <Nuxt />
          </v-main>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      selected: 0,
      items: [
        { name: 'Twitter', url: '/twitter' },
        { name: 'Youtube', url: '/youtube' },
      ],
      locale: 'ja'
    }
  },
  created() {
    this.$i18n.setLocale("ja")
  },
  mounted() {
    this.selected = this.$route.path === '/youtube' ? 1 : 0 
  },
  methods: {
     translate(index, url){
        this.selected = index
        this.$router.push(url)
    },
    changeLocale() {      
      this.$router.push(this.switchLocalePath(this.$i18n.locale !== 'en' ? 'en' : 'ja')) 
    },
  }
}
</script>

<style scoped>
.fa-twitter{
  font-size: 24px;
  color: #00acee;
}
.fa-youtube{
  font-size: 24px;
  color: #ee0000;
}
</style>
