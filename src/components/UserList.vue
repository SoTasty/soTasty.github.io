<template>
    <div class="user-list w-25">
        <h4>Contacts</h4>
        <ul class="list-group">
            <li v-for="user in otherUsers" :key="user" @click="selectUser(user)"
                class="list-group-item list-group-item-action cursor-pointer" role="button">
                {{ user }}
            </li>
            <button @click="unSelectUser" class="btn btn-danger mt-3">Leave</button>
        </ul>
    </div>
</template>

<script>
export default {
    computed: {
        otherUsers() {
            return this.$store.getters.getUsers;
        },
    },
    methods: {
        selectUser(user) {
            this.$emit('userSelected', user);
        },
        unSelectUser() {
            this.$store.dispatch('selectUser', null);
            this.$router.push({ name: 'UserSelection' });
        },
    },
};
</script>

<style scoped>
.user-list {
    height: 100vh;
    overflow-y: auto;
    border-right: 1px solid #ddd;
    padding: 10px;
}
</style>