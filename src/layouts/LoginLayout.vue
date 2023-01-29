<template>
    <q-layout view="lhh LpR lff">
        <q-page-container class="no-padding">
            <router-view/>
        </q-page-container>
    </q-layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    name: 'LoginLayout',
    computed:{},

    data(){
        return{}
    },

    methods:{
        ...mapMutations([
            'setLayout',
        ]),
        ...mapActions([]),
    },

    beforeCreate(){},
    created(){},
    beforeMount(){
        console.log("LoginLayout");
    },
    mounted(){},
    beforeUpdate(){},
    updated(){},
    beforeDestroy(){},
    destroyed(){},
}
</script>