<template>
    <div>

        <AppSidebar :url="''" />

        <div class="wrapper d-flex flex-column min-vh-100 bg-light">

            <AppHeader />

            <div class="body flex-grow-1 px-3">
                <CContainer lg>
                    <slot />
                </CContainer>
            </div>

            <AppFooter />
        </div>
    </div>
</template>
<script>
import { CContainer } from '@coreui/vue';
import { Inertia } from '@inertiajs/inertia';
import AppFooter from '@/Components/AppFooter.vue';
import AppHeader from '@/Components/AppHeader.vue';
import AppSidebar from '@/Components/AppSidebar.vue';

export default {
    name: 'DefaultLayout',
    components: {
        AppFooter,
        AppHeader,
        AppSidebar,
        CContainer,
    },
    methods: {
        logout: function () {
            Inertia.post(route('logout'));
        }
    }
}
</script>
