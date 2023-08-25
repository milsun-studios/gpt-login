<script setup>
import axios from "axios";
import { reactive, ref } from "vue";
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();
const queryTimer = ref();

const data = reactive({
  prompt: "",
  taskid: "",
  imgUrl: "",
  imgUrls: [],
  time: 10000,
  message: "",
  baseImg: "",
  promptEn: "",
  descprompt: "",
  load: false,
  promptGroup: [
    {
      queryTimer: null,
      baseImg: "",
      prompt: "",
      taskid: "",
      imgUrls: [],
      message: "",
      boot: "mj",
      load: false,
    },
  ],
});

async function postProxyMjs(groupItem) {
  groupItem.message = "";
  if (!groupItem.prompt) return;

  const params = {
    notifyHook: "",
    boot: "niji",
    base64: groupItem.baseImg,
    prompt: groupItem.prompt,
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
    groupItem.load = true;
    groupItem.taskid = res.data.result;
    queryImgByTimes(groupItem);
  }
}

function queryImgByTimes(groupItem) {
  if (!groupItem.taskid) return;
  getProxyMjs(groupItem.taskid)
    .then((res) => {
      if (res.data.status === "FAILURE") {
        clearTimeout(groupItem.queryTimer);
        groupItem.load = false;
        groupItem.message = `请求失败: ${res.data.failReason}`;
        return;
      }
      // if (res.data.status === "IN_PROGRESS") {
      //   data.imgUrl = res.data.imageUrl;
      // }
      if (res.data.status === "SUCCESS") {
        clearTimeout(groupItem.queryTimer);
        groupItem.load = false;
        groupItem.imgUrls = res.data.imageUrls;
      } else {
        groupItem.queryTimer = setTimeout(() => {
          queryImgByTimes(groupItem);
        }, data.time);
      }
    })
    .catch((err) => {
      console.log(err, "www");
    });
}

// 单任务模式
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
async function getProxyMjs(taskid) {
  return axios
    .create({
      baseURL: import.meta.env.PROD ? import.meta.env.VITE_APP_API_MJ_URL : "",
    })
    .get(`/mj/task/${taskid}/fetch`)
    .catch((err) => {
      console.log(err, "iserror");
    });
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
      // if (res.data.status === "IN_PROGRESS") {
      //   data.imgUrl = res.data.imageUrl;
      // }
      if (res.data.status === "SUCCESS") {
        clearTimeout(queryTimer.value);
        data.load = false;
        data.imgUrls = res.data.imageUrls;
        data.promptEn = res.data.promptEn;
        data.descprompt = res.data.prompt;
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

async function postDescribe(boot = "mj") {
  console.log(123, boot);
  data.message = "";
  if (!data.baseImg) return;

  const params = {
    base64: data.baseImg,
    boot,
    notifyHook: "",
    state: "",
  };
  const res = await axios
    .create({
      baseURL: import.meta.env.PROD ? import.meta.env.VITE_APP_API_MJ_URL : "",
    })
    .post("/mj/submit/describe", params, {
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

const downloadCodeImg = (img) => {
  var a = document.createElement("a");
  a.download = name || "ecommerce_resimg";
  // 设置图片地址
  a.href = img;
  a.click();
};
const addItem = () => {
  data.promptGroup.push({
    queryTimer: null,
    baseImg: "",
    prompt: "",
    taskid: "",
    imgUrls: [],
    message: "",
    boot: "mj",
    load: false,
  });
};
const handleCutItem = (i) => {
  data.promptGroup.splice(i, 1);
};
</script>

<template>
  <h1 class="text-[20px] mx-[20px]">NiJi</h1>

  <div>
    <h1>Describe</h1>
    <div>
      <input
        type="file"
        accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="getBaseImg"
      />
      <div
        class="bg-slate-500 w-[150px] text-white p-[5px] rounded-md cursor-pointer"
        @click="postDescribe('niji')"
      >
        submit
      </div>

      <div class="w-[400px]">
        <p v-html="md.render(data.descprompt)"></p>
      </div>
    </div>
  </div>
  <div class="mt-[10px] mx-[20px]">
    <span
      class="bg-slate-500 text-white p-[5px] rounded-md cursor-pointer"
      @click="addItem"
      >add list</span
    >
  </div>
  <div class="w-full flex m-[20px]" v-for="(gitem, gi) of data.promptGroup">
    <div class="flex w-[300px]">
      <div
        class="text-white bg-slate-500 px-[5px] flex items-center"
        @click="handleCutItem(gi)"
      >
        cut of {{ gi }}
      </div>
      <textarea
        v-model="gitem.prompt"
        placeholder="propt"
        class="border border-black w-[150px] h-[100px]"
      />

      <button class="w-[80px] bg-slate-500 text-white" v-if="gitem.load">
        load img
      </button>
      <button
        class="w-[80px] bg-slate-500 text-white"
        @click="postProxyMjs(gitem)"
        v-else
      >
        submit
      </button>
      <!-- <button @click="getMjList">getTaskList</button> -->
    </div>

    <div v-if="gitem.imgUrls" class="flex">
      <div v-for="(url, index) of gitem.imgUrls" class="relative">
        <img :key="index" class="h-[100px] mr-[20px]" :src="url" alt="" />
        <div
          class="absolute bottom-[5px] right-[25px] text-white text-xs bg-slate-500 opacity-80 rounded-sm px-[5px] cursor-pointer"
          @click="downloadCodeImg(url)"
        >
          保存
        </div>
      </div>
    </div>
  </div>

  <!-- <div v-if="data.imgUrl && !data.imgUrls.length" class="flex mt-[50px]">
    <img crossorigin="anonymous" :src="data.imgUrl" alt="" />
  </div> -->

  <p v-if="data.message" style="color: red">
    {{ data.message }}
  </p>
</template>
p
