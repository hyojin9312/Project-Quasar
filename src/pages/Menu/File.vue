<template>
    <q-page class="full-width">
        <section class="full-width q-pa-md">
            
        </section>
    </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
    name: 'File',
    computed:{
        ...mapGetters([
            'getLayout'
        ]),
    },

    data(){
        return{}
    },

    methods:{
        ...mapMutations([
            'setTitle',
        ]),
        ...mapActions([]),
    },

    beforeCreate(){},
    created(){
        //뒤로가기 이벤트
        window.onpopstate = () => {};

        //layout title
        if(this.$route.params.title){
            this.setTitle(this.$route.params.title);
        }else{
            this.setTitle('내 서류함');
        }
    },
    beforeMount(){},
    mounted(){},
    beforeUpdate(){},
    updated(){},
    beforeDestroy(){},
    destroyed(){},
}
</script>

<style>

</style>