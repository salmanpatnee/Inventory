<template>
    <div>
        <div class="d-sm-flex align-items-center justify-content-between mb-4">

            <router-link :to="{ name: 'users.create' }" class="btn btn-primary btn-icon-split">
                <span class="icon text-white-50">
                    <i class="fas fa-user"></i>
                </span>
                <span class="text">Add New User</span>
            </router-link>
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/dashboard">Dashboard</router-link>
                </li>
                <li class="breadcrumb-item active">Users</li>
            </ol>
        </div>
        <!-- Row -->
        <div class="row">
            <!-- Datatables -->
            <div class="col-lg-12">
                <div class="card mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">All Users</h6>
                    </div>
                    <div class="table-responsive p-3">
                        <table class="table align-items-center table-flush" id="dataTable">
                            <thead class="thead-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Joining Date</th>
                                    <th>Status</th>
                                    <th>Last Login</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Joining Date</th>
                                    <th>Status</th>
                                    <th>Last Login</th>
                                    <th>Action</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                <tr v-for="user in users" :key="user.id">
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.role }}</td>
                                    <td>{{ user.joining_date }}</td>
                                    <td>{{ user.status }}</td>
                                    <td>{{ user.last_login }}</td>
                                    <td>
                                        <router-link :to="{ name: 'users.edit', params: { id: user.id } }" href="#"
                                            class="btn btn-info btn-sm "><i class="fas fa-pencil-alt"></i></router-link>
                                        <a @click.prevent="destroy(user.id)" href="#" class="btn btn-danger btn-sm "><i
                                                class="fas fa-trash"></i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
        users: {},
    }),
    methods: {
        getUsers() {
            axios.get('/api/users').then(({ data }) => (this.users = data.data));
        },
        async destroy(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const originalUsers = this.users;

                    this.users = this.users.filter(user => user.id != id);
                    axios.delete('/api/users/' + id).then(() => {

                        Toast.fire({
                            icon: 'success',
                            title: 'User Deleted.'
                        });
                    }).catch((error) => {
                        this.users = originalUsers;
                        Toast.fire({
                            icon: 'error',
                            title: 'Unexpected error occurred.'
                        });
                        console.log('Error', error);
                    });
                }
            })
        },
    },
    created() {
        this.getUsers();
    }
}
</script>
