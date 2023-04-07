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
      <div class="flex justify-center">
        <div
          class="px-4 py-2 text-white select-none rounded mt-10 mr-10 bg-purple-600 active:translate-y-1"
          @click="loginByKey"
        >
          login
        </div>
        <div
          class="px-4 py-2 text-white select-none rounded mt-10 bg-purple-600 active:translate-y-1"
          @click="usageByKey"
        >
          usage
        </div>
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
import { login, usage } from '@/api/login'

import { formatDate } from '@/utils/tools'

import { watch, ref, computed, reactive } from 'vue'

let skey = ref('')
let show = ref(false)
let showText = ref('')
let source = reactive()

// skey.value = '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'
const changeKey = (e) => {
  skey.value = e.target.value
}

const timeStream = computed(() => {
  const now = new Date()
  const old = new Date()
  old.setDate(now.getDate() - 90)
  return {
    now: formatDate(now),
    old: formatDate(old),
  }
})

// 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
const loginByKey = async () => {
  if (skey.value) {
    let res = await login({
      openapiKey: skey.value,
    })
    show.value = true
    console.log(res, 'dd')
    showText.value = res.msg
  } else {
    show.value = true
    showText.value = 'the key can not be null! '
  }
}

const usageByKey = async () => {
  if (skey.value) {
    console.log(timeStream, 'www')
    let res = await usage({
      startDate: timeStream.value.now,
      endDate: timeStream.value.old,
      openapiKey: skey.value,
    })
    show.value = true
    showText.value = res.msg
  } else {
    show.value = true
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
