<template>
    <div class="chat-window">
        <h4 class="bg-primary text-white p-2 mb-0" v-if="selectedUser">{{ selectedUser }}</h4>
        <div v-else class="placeholder">Select a user to start chatting</div>
        <div v-if="selectedUser" class="chat-content">
            <div v-for="message in getMessages(selectedUser)" :key="message.content"
                :class="['message', { 'from-me': message.from === currentUser }]">
                <p>
                    <strong>{{ message.from }}:</strong> {{ message.content }}
                </p>
            </div>
        </div>
        <div v-if="selectedUser" class="input-group p-0">
            <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..."
                class="form-control" />
            <button @click="sendMessage" class="btn btn-primary">Send</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['selectedUser'],
    data() {
        return {
            newMessage: '',
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.currentUser;
        },
        getMessages() {
            return this.$store.getters.getMessages;
        },
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim() === '') return;
            this.$store.dispatch('sendMessage', {
                from: this.currentUser,
                to: this.selectedUser,
                content: this.newMessage,
            });
            this.newMessage = '';
        },
    },
};
</script>

<style scoped>
.chat-window {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 75%;
}

.input-group {
    display: flex;
    padding: 10px;
    background-color: #fff;
    border-top: 1px solid #ddd;
}

.placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #aaa;
}

.chat-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  background-color: #e5ddd5;
}
.chat-content:not(.from-me) {
    text-align: left;
}

.message {
  display: inline-block;
  max-width: 60%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
}

.from-me {
  background-color: #dcf8c6;
  align-self: flex-end;
  margin-left: auto;
}

.message p {
  margin: 0;
}

.message strong {
  display: block;
  margin-bottom: 5px;
  color: #4a4a4a;
  font-weight: bold;
}
</style>