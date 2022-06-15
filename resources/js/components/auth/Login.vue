<template>
    <div class="container-login">
        <div class="row justify-content-center">
            <div class="col-xl-6 col-lg-12 col-md-9">
                <div class="card shadow-sm my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="login-form">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Login</h1>
                                    </div>
                                    <form class="user" @submit.prevent="handleLogin">
                                        <div class="form-group">
                                            <input v-model="email" type="email" class="form-control" id="email"
                                                placeholder="Enter Email Address">
                                        </div>
                                        <div class="form-group">
                                            <input v-model="password" type="password" class="form-control" id="password"
                                                placeholder="Password">
                                        </div>
                                        <div class="form-group">
                                            <div class="custom-control custom-checkbox small"
                                                style="line-height: 1.5rem;">
                                                <input type="checkbox" class="custom-control-input" id="customCheck">
                                                <label class="custom-control-label" for="customCheck">Remember
                                                    Me</label>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-primary btn-block">Login</button>
                                        </div>
                                        <hr>
                                    </form>
                                    <div class="text-center">
                                        <router-link class="font-weight-bold small" to="/register">Create an Account!
                                        </router-link>
                                    </div>
                                    <div v-if="errorMessage" class="text-center">
                                        {{ errorMessage }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: ''
        }
    },
    methods: {
        async handleLogin() {
            this.errorMessage = '';
            try {
                await this.$store.dispatch('login', {
                    email: this.email, password: this.password
                });
                this.$router.push({ name: 'dashboard' });
            } catch (error) {
                this.errorMessage = error;
            }
        }
    }
}
</script>