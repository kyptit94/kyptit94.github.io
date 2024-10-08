<template>
  <n-space vertical>
    <n-card title="Thao tác">
      <n-space vertical>
        <n-card>
          <n-space>
            <n-button type="primary" @click="loginWithFacebook">Đăng nhập Facebook</n-button>
            <n-button v-if="loginStatus" type="primary" @click="getListPages">Lấy danh sách trang</n-button>
          </n-space>
        </n-card>
        <div class=".equal-height-cards">
          <n-space>
            <n-card>
              <n-space vertical>
                <n-input v-model:value="img" type="text" placeholder="Link ảnh" />
                <n-input
                  v-model:value="message"
                  type="textarea"
                  placeholder="Nội dung tin nhắn"
                />
              </n-space>
            </n-card>
            <n-card>
              <n-space vertical>
              <n-image
                width="300"
                :src="img"
              />
              <n-text>{{ message }}</n-text>
            </n-space>
            </n-card>
          </n-space>
        </div>
      </n-space>
    </n-card>
    <n-card title="Danh sách trang">
      <n-data-table :columns="columns" :data="pages" />
    </n-card>
  </n-space>
</template>

<script>
import { NButton, NList, NListItem, NSpace, NDataTable, NInput, NCard, NImage, NText } from 'naive-ui'
import { h } from 'vue'

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
  data() {
    return {
      user: null,
      pages: [],
      message: '',
      img: '',
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
      }, { scope: 'public_profile,email,pages_show_list,pages_read_engagement,pages_messaging,pages_messaging_subscriptions' });
    },
    async getListPages() {
      FB.api(
        '/me/accounts',
        'GET',
        {},
        (response) => {
          this.pages = response.data;
        }
      );
    },
    async getPageConversations(page) {
      return new Promise(async (resolve) => {
        const limit = 10; // Specify the number of records per page
        let nextPage = `/${page.id}/conversations?limit=${limit}`;
        const access_token = page.access_token; // Ensure access_token is correctly assigned

        while (nextPage) {
          await new Promise((resolve) => {
            FB.api(nextPage, 'GET', { access_token }, async (response) => { // Pass access_token in the API call
              if (response && !response.error) {
                await this.sendMessageToAllConversations(response.data, access_token);
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
        resolve();
      })
    },
    async sendMessageToAllConversations(conversations, access_token) {
      const pageAccessToken = access_token; // Replace with your Page Access Token

      for (const conversation of conversations) {
        await new Promise((resolve) => {
          // Send text message
          FB.api(
            `/${conversation.id}/messages`,
            'POST',
            {
              message: {
                text: this.message
              },
              access_token: access_token
            },
            (response) => {
              if (response && !response.error) {
                console.log(`Text message sent to conversation ${conversation.id}`);
              } else {
                console.error(`Error sending text message to conversation ${conversation.id}:`, response.error);
              }
              resolve();
            }
          );
        });
        await new Promise((resolve) => {
          console.log(`Sending photo to conversation ${conversation.id}...`);
          resolve();
          FB.api(
            `/${conversation.id}/messages`,
            'POST',
            {
              message: {
                attachment: {
                  type: "image",
                  payload: {
                    url: this.img,
                    is_reusable: true
                  }
                }
              },
              access_token: pageAccessToken
            },
            (response) => {
              if (response && !response.error) {
                console.log(`Message sent to conversation ${conversation.id}`);
              } else {
                console.error(`Error sending message to conversation ${conversation.id}:`, response.error);
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

.equal-height-cards > .n-card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.equal-height-cards > .n-card .n-space {
  flex: 1;
}
</style>