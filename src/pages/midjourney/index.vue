<script setup>
import axios from "axios";
import { reactive, ref } from "vue";
const queryTimer = ref();

const data = reactive({
  prompt: "",
  taskid: "",
  imgUrl: "",
  imgUrls: [],
  time: 10000,
  message: "",
  baseImg: "",
  load: false,
});

async function postProxyMj() {
  data.message = "";
  if (!data.prompt) return;

  const params = {
    notifyHook: "",
    base64: data.baseImg,
    prompt: data.prompt,
    state: "",
  };
  const res = await axios
    .create({
      baseURL: import.meta.env.PROD ? import.meta.env.VITE_APP_API_MJ_URL : "",
    })
    .post("/mj/submit/imagine", params, {
      headers: {
        Accept: "application/json",
      },
    })
    .catch((err) => {
      console.log(err, "iserror");
    });

  console.log(res, "from mj java");
  if (res.data.code === 1) {
    data.load = true;
    data.taskid = res.data.result;
    queryImgByTime();
  }
}

function queryImgByTime() {
  if (!data.taskid) return;
  getProxyMj()
    .then((res) => {
      if (res.data.status === "FAILURE") {
        clearTimeout(queryTimer.value);
        data.load = false;
        data.message = `请求失败: ${res.data.failReason}`;
        return;
      }
      if (res.data.status === "IN_PROGRESS") {
        data.imgUrl = res.data.imageUrl;
      }
      if (res.data.status === "SUCCESS") {
        clearTimeout(queryTimer.value);
        data.load = false;
        data.imgUrls = res.data.imageUrls;
      } else {
        queryTimer.value = setTimeout(() => {
          queryImgByTime();
        }, data.time);
      }
    })
    .catch((err) => {
      console.log(err, "www");
    });
}

async function getProxyMj() {
  return axios
    .create({
      baseURL: import.meta.env.PROD ? import.meta.env.VITE_APP_API_MJ_URL : "",
    })
    .get(`/mj/task/${data.taskid}/fetch`)
    .catch((err) => {
      console.log(err, "iserror");
    });
}

async function getMjList() {
  return axios
    .create({
      baseURL: import.meta.env.PROD ? import.meta.env.VITE_APP_API_MJ_URL : "",
    })
    .get(`/mj/task/list`)
    .catch((err) => {
      console.log(err, "iserror");
    });
}

function getBaseImg(ww) {
  console.log(ww);
  var reads = new FileReader();
  reads.readAsDataURL(ww.target.files[0]);
  reads.onload = function (e) {
    data.baseImg = e.currentTarget.result;
  };
}
</script>

<template>
  <h1 class="text-[30px] text-center">MJ</h1>
  <div class="m-[50px] flex justify-center">
    <div>
      <span>垫图(可选): </span>
      <input
        type="file"
        accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="getBaseImg"
      />
    </div>
    <img
      class="w-[100px] h-[100px]"
      v-if="data.baseImg"
      :src="data.baseImg"
      alt=""
    />
  </div>
  <div class="m-[50px] flex justify-center">
    <textarea
      v-model="data.prompt"
      placeholder="propt"
      class="border border-black mr-[50px]"
    />

    <button class="mr-[50px]" v-if="data.load">load img...</button>
    <button class="mr-[50px]" @click="postProxyMj" v-else>submit</button>

    <button @click="getMjList">getTaskList</button>
  </div>

  <div v-if="data.imgUrl && !data.imgUrls.length" class="flex mt-[50px]">
    <img crossorigin="anonymous" :src="data.imgUrl" alt="" />
  </div>
  <div v-if="data.imgUrls" class="flex justify-center mt-[50px]">
    <img
      v-for="(url, index) of data.imgUrls"
      :key="index"
      class="w-[100px] h-[100px] mr-[20px]"
      :src="url"
      alt=""
    />
  </div>

  <p v-if="data.message" style="color: red">
    {{ data.message }}
  </p>
</template>
