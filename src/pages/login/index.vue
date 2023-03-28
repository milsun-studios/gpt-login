<template>
  <div class="login flex flex-col justify-center items-center">
    <img class="w-60 m-auto" src="@/assets/imgs/openai-logo.webp" alt="" />

    <div class="flex flex-col justify-center items-center">
      <input
        class="l-inp w-80 p-3 border border-gray-300 rounded-lg text-sm focus:border-purple-600"
        type="text"
        placeholder="plesae provide your key form openai"
        :value="skey"
        @change="changeKey"
      />
      <div
        class="px-4 py-2 text-white select-none rounded mt-10 bg-purple-600 active:translate-y-1"
        @click="loginByKey"
      >
        login
      </div>
    </div>

    <div
      class="toast-cp fixed bottom-60 bg-black bg-opacity-70 px-4 py-2 rounded text-white text-sm"
      v-if="show"
    >
      {{ showText }}
    </div>
  </div>
</template>
<script setup>
import { watch } from 'vue'

let skey = ref('')
let show = ref(false)
let showText = ref('')

const changeKey = (e) => {
  skey.value = e.target.value
}

const loginByKey = () => {
  show.value = true
  if (skey.value) {
  } else {
    showText.value = 'the key can not be null! '
  }
}

watch(show, () => {
  setTimeout(() => {
    show.value = false
  }, 1500)
})
</script>
<style lang="less" scope>
.l-inp {
  outline: none;
}
</style>
