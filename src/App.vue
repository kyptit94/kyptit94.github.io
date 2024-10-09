<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <n-notification-provider>
        <n-modal-provider>
          <n-dialog-provider>
            <Tool />
          </n-dialog-provider>
        </n-modal-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-loading-bar-provider>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  import Tool from "./components/Tool.vue";
  
  export default defineComponent({
  components: {
    Tool,
  },
  });
  </script>