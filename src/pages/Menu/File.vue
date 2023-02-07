<template>
    <q-page class="full-width bg-grey-2">
        <section class="full-width q-pa-md">
            <div class="flex justify-around q-pt-md">
                <q-card class="q-pa-md text-center cardRounded" style="width: 40%;"
                        v-ripple @click="$router.push('/resume')">
                    <q-icon name="description" size="md"/>
                    <div class="text-M text-weight-bolder q-pt-sm">이력서</div>
                </q-card>
                <q-card class="q-pa-md text-center cardRounded" style="width: 40%;"
                        v-ripple @click="$router.push('/myself')">
                    <q-icon name="description" size="md"/>
                    <div class="text-M text-weight-bolder q-pt-sm">자기소개서</div>
                </q-card>
            </div>

            <div class="flex justify-around q-pt-lg">
                <q-card class="q-pa-md text-center cardRounded" style="width: 40%;"
                        v-ripple @click="standby('곧 업데이트 됩니다.')">
                    <q-icon name="description" size="md"/>
                    <div class="text-M text-weight-bolder q-pt-sm">거래명세표</div>
                </q-card>
                <q-card class="q-pa-md text-center cardRounded" style="width: 40%;"
                        v-ripple @click="standby('곧 업데이트 됩니다.')">
                    <q-icon name="description" size="md"/>
                    <div class="text-M text-weight-bolder q-pt-sm">작업의뢰서</div>
                </q-card>
            </div>
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

        //준비중
        standby(msg){
            this.$q.dialog({
               title:'<div class="text-h5 text-weight-bolder">준비중</div>',
               message: msg,
               html: true,
               ok:{
                 flat: true,
                 label: '확인',
                 textColor: 'primary',
                 size: 'lg'
               }
            }).onOk(()=>{});
        },
    
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