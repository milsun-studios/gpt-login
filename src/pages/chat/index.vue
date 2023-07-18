<template>
  <div class="chat flex justify-center">
    <div class="fixed bottom-0 p-5 w-full grid grid-clos-3">
      <div class="col-span-2">
        <input
          class="border rounded mr-2"
          type="text"
          :value="message"
          @change="changeMsg"
        />
      </div>

      <div
        class="px-4 py-2 col-span-1 text-white select-none rounded bg-purple-600 active:translate-y-1"
        @click="getChat"
      >
        chat
      </div>
    </div>
  </div>
</template>
<script setup>
import { EventSourcePolyfill } from 'event-source-polyfill'
import { reactive, ref } from 'vue'

let baseUrl = ref('http://43.153.30.133:8989/mschat/chatstream')
let message = ref('hello ai')
let key = ref('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')
let uid = ref(123)

let dataGroup = reactive([])

let source = reactive()

const getChat = () => {
  source = new EventSourcePolyfill(
    `${baseUrl.value}?message=${message.value}?&openapiKey=${key.value}`,
    {
      headers: { uid: uid.value },
    },
  )

  source.onopen = (e) => {
    console.log(e, 'opening')
  }
  source.addEventListener('message', function (data) {
    if (data.data !== '[DONE]') {
      dataGroup.push(JSON.parse(data.data))
    }
    if (data.data === '[DONE]') {
      source.close()
      console.log(dataGroup, 'ending')
    }
  })

  source.onerror = function (event) {
    // handle error event
    console.log(event, 'error')
  }
}
</script>
<style lang="less" scope></style>
