<template>
    <q-page class="full-width">
        <section class="q-pa-md">
            <q-card v-for="(item,index) in noticeList" :key="index" class="full-width q-mb-sm">
                <q-expansion-item class="full-width">
                    <template v-slot:header>
                        <q-item-section class="text-weight-bolder text-M">
                            {{ item.title }}
                        </q-item-section>
                    </template>
                    <q-separator class="full-width" />
                    <div class="full-width q-pa-md">
                        {{ item.content }}
                    </div>
                </q-expansion-item>
            </q-card>
        </section>
    </q-page>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
export default {
    name: 'Notice',
    computed:{
        ...mapGetters([
            'getLayout',
        ]),
    },

    data(){
        return{
            //공지사항 리스트
            noticeList:[
                {title:'앱 업데이트', content: '앱 수정 및 업데이트가 진행 되었습니다.'},
                {title:'문서 업데이트', content: '문의주신 문서 추가 업데이트가 되었습니다.'},
                {title:'앱 업데이트', content: '앱 버전 업데이트가 진행 되었습니다.'},
                {title:'앱 업데이트', content: '앱 버전 업데이트가 진행 되었습니다.'},
            ],
        }
    },

    methods:{
        ...mapMutations([
            'setTitle'
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
        }
        else{
            this.setTitle('공지사항');
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