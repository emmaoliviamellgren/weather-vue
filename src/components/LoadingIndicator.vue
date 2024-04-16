<script setup>

defineProps({
    loading: {
    type: Boolean,
    default: false
  }
});

</script>

<template>
    <div v-if="loading">
Loading..
    </div>
</template>