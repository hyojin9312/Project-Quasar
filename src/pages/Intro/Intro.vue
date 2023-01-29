<template>
    <q-layout >
        <section class="absolute full-width full-height flex flex-center">
            <img src="mobillity.png" class="" style="width: 40vw;"/>
        </section>

        <section>
        </section>
    </q-layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import {Loading, LocalStorage} from 'quasar';

export default {
    name: 'Intro',
    computed:{
        ...mapGetters([]),
    },
    data(){
        return{
            slide: 'style'
        }
    },
    methods:{
        ...mapMutations([]),
        ...mapActions([]),

        /**
         * 로딩
         */
        loading(){
            console.log('로딩중');
            Loading.show({
                message: '로그인중 입니다. 잠시만 기다려주세요',
            });
            this.loadingHide();
        },

        // 로딩 제거
        loadingHide(){
            setTimeout(() => {
                Loading.hide();
                this.$router.push('/home');
            }, 3000);
        
        },
    },
    beforeCreate(){},
    created(){},
    beforeMount(){
        console.log('introPage');
        this.loading();
    },
    mounted(){},
    beforeUpdate(){},
    updated(){},
    beforeDestroy(){},
    destroyed(){},
}
</script>
