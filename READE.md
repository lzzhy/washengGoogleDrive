## Install

```
npm i washeng-google-drive
```

## Use

引入：
```js
import WashengGoogleDrive from "washeng-google"
```

入参为：
* type: 必填, 'cloud' / 'share'
* id：非必填

## Example


```js
<template>
  <!-- <img src="https://drive.google.com/uc?id=1GVZG2ZnrfDFFZZKB-FovXIADR-iArZQw&export=download" alt="" /> -->
  <div @click="handleAuthClick('cloud')">我的云盘</div>
  <div v-for="item in files" :key="item.id" @click="handleNext('cloud', item.id)">{{ item.name }}</div>

  <div @click="handleAuthClick('share')">共享</div>
  <div v-for="item in files" :key="item.id" @click="handleNext('share', item.id)">{{ item.name }}</div>

  <div @click="handleSearch()">查找</div>
</template>

<script lang="ts" setup>
import googleDrive from "washeng-google";

const files = ref<any[]>([]);

const handleAuthClick = async (type: string) => {
  const data = await googleDrive.auth(type);
  console.log('文件返回值---', data.files);
  files.value = data.files as any[];
};

const handleNext = async (type: string, id: string) => {
  const data = await googleDrive.listFiles(type, id);
  console.log('文件返回值---', data.files);
  files.value = data.files as any[];
};

const handleSearch = async () => {
  const data = await googleDrive.searchFiles("hhhh"); // 入参为搜索词
};
</script>
```