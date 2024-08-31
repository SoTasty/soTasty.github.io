<template>
    <div class="user-list w-25">
        <h4>Users</h4>
        <ul class="list-group">
            <li v-for="user in users" :key="user" @click="selectUser(user)"
                class="list-group-item list-group-item-action cursor-pointer" role="button">
                {{ user }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    computed: {
        users() {
            return this.$store.getters.getUsers;
        },
    },
    methods: {
        selectUser(user) {
            this.$store.dispatch('selectUser', user);
            this.$router.push({ name: 'Chat' });
        },
    },
};
</script>
<style>
.user-list {
    height: 100vh;
    overflow-y: auto;
    border-right: 1px solid #ddd;
    padding: 10px;
}
</style>