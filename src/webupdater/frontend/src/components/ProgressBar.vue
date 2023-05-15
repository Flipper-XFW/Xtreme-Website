<template>
  <q-linear-progress
    rounded
    size="2.25rem"
    :value="progress"
    :instant-feedback="!interpolated"
    color="primary"
    class="q-mt-sm q-mb-lg"
  >
    <div class="absolute-full flex flex-center">
      <q-badge
        v-if="title.length > 0"
        text-color="primary"
        style="background-color: #222;"
        :label="title"
      ></q-badge>
    </div>
  </q-linear-progress>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProgressBar',
  props: {
    title: {
      type: String,
      default: ''
    },
    progress: {
      type: Number,
      required: true
    },
    interpolated: {
      type: Boolean,
      default: false
    }
  }
})
</script>
