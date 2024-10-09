<template>
  <n-space vertical>
    <n-card title="Gửi tin nhắn FB Version 1.2.4">
      <n-space vertical>
        <n-card>
          <n-space>
            <n-button type="primary" @click="loginWithFacebook">Đăng nhập Facebook</n-button>
            <n-button v-if="loginStatus" type="primary" @click="getListPages">Lấy danh sách trang</n-button>
          </n-space>
        </n-card>
        <n-card>
          <n-space vertical>
            <n-upload :on-update:file-list="UpdateFile" list-type="image-card">
              Tải ảnh lên
            </n-upload>
            <n-input autosize v-model:value="message" type="textarea" placeholder="Nội dung tin nhắn" />
          </n-space>
        </n-card>
      </n-space>
    </n-card>
    <n-card title="Danh sách trang">
      <n-button style="float: right;">{{ count }}</n-button>
      <n-data-table :columns="columns" :data="pages" />
    </n-card>
  </n-space>
</template>

<script>
import {
  NButton, NList, NListItem, NSpace, NDataTable, NInput, NCard, NImage, NText,
  useNotification, useMessage,
} from 'naive-ui'
import { h, ref } from 'vue'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3-qhi7iQKjNMiPW7BxDB7qq3nCZ6EyIg",
  authDomain: "sendmessage-77d09.firebaseapp.com",
  projectId: "sendmessage-77d09",
  storageBucket: "sendmessage-77d09.appspot.com",
  messagingSenderId: "244801679333",
  appId: "1:244801679333:web:17f9ab0930e8693dbdc90c",
  measurementId: "G-H6XEVYSJVT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default {
  name: 'App',
  components: {
    NButton,
    NList,
    NListItem,
    NSpace,
    NDataTable,
    NInput,
    NCard,
    NImage,
    NText
  },
  setup() {
    const message = useMessage()
    const notification = useNotification()
    const file = ref(null)
    const imageUrl = ref('');

    const uploadImage = async () => {
      return new Promise(async (resolve) => {
        if (!file.value) {
          alert('Please select a file first.');
          return;
        }

        const fileRef = storageRef(storage, "/images/guitinnhan.png");

        try {
          await uploadBytes(fileRef, file.value);
          const url = await getDownloadURL(fileRef);
          imageUrl.value = url;
          console.log('File available at', url);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
        resolve(imageUrl.value)
      })
    };
    return {
      notify(text) {
        notification.create({
          title: 'Gửi tin nhắn',
          content: text,
          type: 'success'
        })
      },
      async UpdateFile(fileList) {
        if (fileList.length > 0 && fileList[0].file) {
          file.value = fileList[0].file
        } else {
          file.value = null
        }
      },
      file,
      imageUrl,
      uploadImage
    }
  },
  data() {
    return {
      user: null,
      pages: [
      ],
      message: '',
      img: '',
      count: 0,
      loginStatus: false,
      conversations: [],
      loadingPages: {},
      columns: [
        {
          title: 'Tên trang',
          key: 'name'
        },
        {
          title: 'Hành động',
          key: 'actions',
          render: (row) => {
            return h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: 'small',
                loading: this.loadingPages[row.id] || false,
                onClick: async () => {
                  this.loadingPages = { ...this.loadingPages, [row.id]: true };
                  await this.getPageConversations(row);
                  this.loadingPages = { ...this.loadingPages, [row.id]: false };
                }
              },
              { default: () => 'Gửi' }
            )
          }
        }
      ]
    }
  },
  methods: {
    async testUpload() {
      console.log(await this.uploadImage())
    },
    loadFacebookSDK() {
      return new Promise((resolve) => {
        if (document.getElementById('facebook-jssdk')) {
          resolve();
          return;
        }

        window.fbAsyncInit = function () {
          FB.init({
            appId: '862815729320540', // Replace with your Facebook App ID
            cookie: true,
            xfbml: true,
            version: 'v12.0'
          });
          resolve();
        };

        (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) { return; }
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      });
    },
    async loginWithFacebook() {
      await this.loadFacebookSDK();
      FB.login((response) => {
        if (response.authResponse) {
          console.log('Welcome! Fetching your information.... ');
          FB.api('/me', { fields: 'name,email' }, (response) => {
            this.loginStatus = true;
          });
        } else {
          this.loginStatus = false;
        }
      }, { scope: 'public_profile,email,pages_show_list,pages_read_engagement,pages_messaging,pages_messaging_subscriptions,pages_manage_metadata' });
    },
    async getListPages() {
      FB.api(
        '/me/accounts?limit=200',
        'GET',
        {},
        (response) => {
          this.pages = response.data;
        }
      );
    },
    formatMessage(msg) {
      let message = msg
      const stringIcon = message.match(/{(.*?)}/g) || [];
      if (stringIcon.length > 0) {
        let temp = stringIcon[0]
        let listIcon = temp.split('|')
        let iconId = 0
        stringIcon.forEach(() => {
          let currentIcon = listIcon[iconId].replace('{', '').replace('}', '')
          message = message.replace(temp, currentIcon)
          if (iconId == listIcon.length - 1) {
            iconId = 0
          } else {
            iconId++
          }
        });

        return message
      } else {
        return message
      }
    },
    async getPageConversations(page) {
      this.count = 0;
      await this.uploadImage()
      return new Promise(async (resolve) => {
        try {
          const limit = 100; // Specify the number of records per page
          let nextPage = `/${page.id}/conversations?limit=${limit}&`;
          const access_token = page.access_token; // Ensure access_token is correctly assigned
          const fields = 'id,participants';
          while (nextPage) {
            await new Promise((resolve) => {
              FB.api(nextPage, 'GET', { access_token, fields }, async (response) => { // Pass access_token in the API call
                if (response && !response.error) {
                  let users = response.data.map((conversation) => {
                    return conversation.participants.data.find((participant) => participant.id !== page.id);
                  });
                  for (const user of users) {
                    if (user && user.id) {
                      this.count++;
                      await this.sendMessageToAllConversations(page.id, user.id, access_token);
                    }
                  }
                  // await this.sendMessageToAllConversations(page.id,response.data, access_token);
                  nextPage = response.paging && response.paging.next ? response.paging.next : null;
                  resolve();
                } else {
                  console.error('Error fetching conversations:', response.error);
                  nextPage = null;
                  resolve();
                }
              });
            });
          }
          this.notify('Đã gửi tin nhắn cho tất cả người dùng');
          resolve();
        } catch (error) {
          console.error('Error fetching conversations:', error);
          resolve();
        }
      })
    },
    async sendMessageToAllConversations(page_id, part_id, access_token) {
      const pageAccessToken = access_token; // Replace with your Page Access Token
      await new Promise((resolve) => {
        // Send text message
        FB.api(
          `/${page_id}/messages`,
          'POST',
          {
            message: {
              text: this.formatMessage(this.message)
            },
            messaging_type: 'MESSAGE_TAG',
            tag: 'ACCOUNT_UPDATE',
            recipient: {
              id: part_id
            },
            access_token: access_token
          },
          (response) => {
            if (response && !response.error) {
              console.log(`Text message sent to conversation ${part_id}`);
            } else {
              console.error(`Error sending text message to conversation ${part_id}:`, response.error);
            }
            resolve();
          }
        );
      });
      if (this.imageUrl) {
        await new Promise((resolve) => {
          console.log(`Sending photo to conversation ${part_id}...`);
          resolve();
          FB.api(
            `/${page_id}/messages`,
            'POST',
            {
              message: {
                attachment: {
                  type: "image",
                  payload: {
                    url: this.imageUrl,
                    is_reusable: true
                  }
                }
              },
              messaging_type: 'MESSAGE_TAG',
              tag: 'ACCOUNT_UPDATE',
              recipient: {
                id: part_id
              },
              access_token: pageAccessToken
            },
            (response) => {
              if (response && !response.error) {
                console.log(`Message sent to conversation ${part_id}`);
              } else {
                console.error(`Error sending message to conversation ${part_id}:`, response.error);
              }
              resolve();
            }
          );
        });
      }
    }
  }
}
</script>

<style>
.equal-height-cards {
  display: flex;
}

.equal-height-cards>.n-card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.equal-height-cards>.n-card .n-space {
  flex: 1;
}
</style>