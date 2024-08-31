<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="chat-app">
        <UserList @userSelected="setSelectedUser" />
        <ChatWindow :selectedUser="selectedUser" />
    </div>
</template>

<script>
import UserList from './UserList.vue';
import ChatWindow from './ChatWindow.vue';

export default {
    components: {
        UserList,
        ChatWindow,
    },
    data() {
        return {
            selectedUser: null,
        };
    },
    methods: {
        setSelectedUser(user) {
            this.selectedUser = user;
        },
        checkAuth() {
            const isAuthenticated = this.$store.state.currentUser;
            if (!isAuthenticated) {
                this.$router.push('/');
            }
        },
    },
    created() {
        this.checkAuth();
    },
};
</script>

<style scoped>
.chat-app {
    display: flex;
    height: 100vh;
}
</style>