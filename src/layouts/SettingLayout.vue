<template>
    <q-layout view="lHh lpr lFf">
        <!-- toolbar -->
        <q-header class="bg-primary shadow-2" v-if="isShowToolbar">
            <q-toolbar class="flex justify-between items-center text-white items-center full-width">
                <q-btn 
                    class="no-margin no-padding"
                    icon="keyboard_backspace"
                    size="1.2rem"
                    flat
                    @click="$router.back()"
                />
                <div class="text-h5 text-weight-bolder absolute-center">{{ getTitle }}</div>
            </q-toolbar>
        </q-header>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    name: 'SettinsLayout',
    computed: {
        ...mapGetters([
            'getTitle',
        ]),
    },

    data(){
        return{
            isShowToolbar: true, 
        }
    },

    methods:{
        ...mapMutations([
            'setLayout',
        ]),
        ...mapActions([]),
    },

    beforeCreate(){},
    created(){
        //뒤로가기 이벤트
        window.onpopstate = () => {};
    },
    beforeMount(){
        this.setLayout(this);
        console.log('settingLayout');
    },
    mounted(){},
    beforeUpdate(){},
    updated(){},
    beforeDestroy(){},
    destroyed(){},
}
</script>