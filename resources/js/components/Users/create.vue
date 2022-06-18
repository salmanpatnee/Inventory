<template>
    <div>
        <div class="d-sm-flex align-items-center justify-content-between mb-4">

            <router-link :to="{ name: 'users.index' }" class="btn btn-primary btn-icon-split">
                <span class="icon text-white-50">
                    <i class="fas fa-users"></i>
                </span>
                <span class="text">All Users</span>
            </router-link>
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
                </li>
                <li class="breadcrumb-item active">{{ editMode ? "Edit" : "Add" }} User</li>
            </ol>
        </div>
        <!-- Row -->
        <div class="row">
            <!-- Datatables -->
            <div class="col-lg-12">
                <div class="card mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">{{ editMode ? "Edit" : "Add" }} User</h6>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="editMode ? update() : store()" @keydown="form.onKeydown($event)">
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="name">Name</label>
                                        <input v-model="form.name" type="text" class="form-control" id="name"
                                            placeholder="Name">
                                        <HasError :form="form" field="name" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input v-model="form.email" type="email" class="form-control" id="email"
                                            placeholder="Password">
                                        <HasError :form="form" field="email" />
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input v-model="form.password" type="password" class="form-control"
                                            id="password" placeholder="Password">
                                        <HasError :form="form" field="password" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label for="password_confirmation">Confirm Password</label>
                                        <input v-model="form.password_confirmation" type="password" class="form-control"
                                            id="password_confirmation" placeholder="Confirm Password">
                                        <HasError :form="form" field="password_confirmation" />
                                    </div>
                                </div>
                            </div>
                            <div class="align-items-center flex row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="role">Role</label>
                                        <select v-model="form.role" class="form-control" id="role">
                                            <option value="" selected>Select a Role</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Cashier">Cashier</option>
                                        </select>
                                        <HasError :form="form" field="role" />
                                    </div>
                                </div>
                                <div class="col mt-3">
                                    <Button :form="form" class="btn btn-primary">{{ editMode ? "Update" : "Add" }} User
                                    </Button>
                                    <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
        <!--Row-->
    </div>
</template>

<script>
export default {

    data: () => ({
        user: {},
        editMode: false,
        form: new Form({
            id: '',
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            role: ''
        })
    }),
    methods: {
        store() {
            this.form.post('/api/register').then(() => {
                Toast.fire({
                    icon: 'success',
                    title: 'User Added.'
                });
                this.$router.push({ name: 'users.index' })
            }).catch((error) => { });

        },
        update() {
            this.form.put('/api/users/' + this.form.id).then(() => {
                Toast.fire({
                    icon: 'success',
                    title: 'User Updated.'
                });
                this.$router.push({ name: 'users.index' })
            }).catch((error) => { });
        }
    },
    created() {
        if (this.$route.params.id) {
            let id = this.$route.params.id;
            this.editMode = true;
            this.form.get('/api/users/' + id).then((response) => {
                this.form.fill(response.data.data);
            }).catch((error) => { });
        }

    }
}
</script>
