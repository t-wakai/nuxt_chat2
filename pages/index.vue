<template>
  <div>home</div>
</template>
<script>
export default {
  fetch({ redirect }) {
    redirect(301, '/twitter')
  }
}
</script>