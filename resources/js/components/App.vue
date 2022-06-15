<template>
    <div id="wrapper">

        <Sidebar></Sidebar>
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <Topbar></Topbar>
                <!-- Container Fluid-->
                <div class="container-fluid" id="container-wrapper">
                    <router-view></router-view>
                </div>
                <!---Container Fluid-->
            </div>
        </div>

    </div>
</template>

<script>
import Sidebar from './partials/Sidebar.vue';
import Topbar from './partials/Topbar.vue';
export default {
    components: {
        Sidebar, Topbar
    }
}
</script>