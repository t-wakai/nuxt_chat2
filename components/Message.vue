<template>
  <div :class="floatClass" style="width:100%">
    <v-badge
      bordered
      bottom
      color="green"
      dot
      offset-x="10"
      offset-y="10"
      :class="floatClass"
    >
      <v-avatar :class="floatClass" size="30" elevation="10">
        <i :class='iconClass' />
      </v-avatar>
    </v-badge>
    <slot>
      <v-card :class="floatClass + ' mx-2'" width="70%" color="blue" dark >
        <v-list-item class="py-0" three-line>
          <v-list-item-content>
            <div :class="floatClass">
              {{ text }}
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </slot>
  </div>
</template>

<script>
export default {
  data: () => ({
    floatClass: "",
  }),

  props: {
    text: {
      type: String,
      required: true,
    },
    alignRight: {
      type: Boolean,
      required: true,
    },
    iconClass: {
      type: String,
      required: true,
    }
  },

  mounted(){
    this.floatClass = this.alignRight ? "float-right" : "float-left"
  }
}
</script>
