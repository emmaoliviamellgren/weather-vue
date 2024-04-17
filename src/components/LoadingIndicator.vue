<script setup>

defineProps({
    loading: {
    type: Boolean,
    default: false
  }
});

</script>

<template>
    <div v-if="loading.value">
Loading..
    </div>
</template>

