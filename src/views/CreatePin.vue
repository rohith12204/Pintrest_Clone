
<template>
  <div class="create-pin">
    <div class="pin-uploader">
      <div class="upload-box">
        <span class="material-symbols-outlined" style="font-size:36px;">upload</span>
        <p>Choose a file or drag and drop it here</p>
        <small>We recommend high quality .jpg files less than 20 MB or .mp4 files less than 200 MB.</small>
        <button class="from-url">Save from URL</button>
      </div>
    </div>
    <div class="pin-details">
      <input type="text" placeholder="Add a title" class="input" />
      <textarea placeholder="Add a detailed description" class="textarea"></textarea>
      <input type="text" placeholder="Add a link" class="input" />
      <input type="text" placeholder="Choose a board" class="input" />
      <input type="text" placeholder="Search for a tag" class="input" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'CreatePin' })
</script>

<style scoped>
.create-pin {
  display: flex;
  padding: 20px;
}
.pin-uploader {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: start;
}
.upload-box {
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  width: 300px;
}
.upload-box small {
  display: block;
  margin-top: 10px;
}
.from-url {
  margin-top: 20px;
  padding: 8px 12px;
  border: none;
  border-radius: 20px;
  background: #ddd;
  cursor: pointer;
}
.pin-details {
  flex: 2;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.input, .textarea {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
}
.textarea {
  height: 100px;
}
</style>
