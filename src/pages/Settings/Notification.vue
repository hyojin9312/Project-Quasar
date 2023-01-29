<template>
    <q-page class="bg-gery-2">
        <!-- 알림 영역 -->
        <section class="q-pa-md">
            <div class="text-M text-weight-bolder">알림 설정</div>

            <!-- 설정항목 영역 -->
            <div class="q-pt-md">
                <q-card class="q-pa-sm text-S">
                    <div class="full-width flex justify-between items-center q-py-sm">
                        <div>모두 알림 동의</div>
                        <q-toggle v-model="allToggle" @input="allToggleMethod(allToggle)"/>
                    </div>
                    <q-separator />
                    <div class="full-width flex justify-between items-center q-py-sm">
                        <div>업데이트 정보 알림</div>
                        <q-toggle v-model="toggleList" val="update" @input="toggleMethod('update')"/>
                    </div>
                    <q-separator />
                    <div class="full-width flex justify-between items-center q-py-sm">
                        <div>문서 정보 알림</div>
                        <q-toggle v-model="toggleList" val="docs" @input="toggleMethod('docs')"/>
                    </div>
                    <q-separator />
                    <div class="full-width flex justify-between items-center q-py-sm">
                        <div>푸시 알림</div>
                        <q-toggle v-model="toggleList" val="push" @input="toggleMethod('push')"/>
                    </div>
                    <q-separator/>
                    <div class="full-width flex justify-between items-center q-py-sm">
                        <div>콘텐츠 알림</div>
                        <q-toggle v-model="toggleList" val="content" @input="toggleMethod('content')"/>
                    </div>
                    <q-separator/>
                    <div class="full-width flex justify-between items-center q-py-sm">
                        <div>나와 관련된 알림</div>
                        <q-toggle v-model="toggleList" val="relevance" @input="toggleMethod('relevance')"/>
                    </div>
                </q-card>
            </div>
        </section>
    </q-page>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
    name: 'Notification',
    computed: {
        ...mapGetters([
            'getLayout',
        ]),
    },

    data(){
        return{
            //toggle v-model
            //모두알림
            allToggle : false,
            // toggle list
            toggleList: [],
            // list val
            listval: ['update', 'docs', 'push', 'content', 'relevance'],

        }
    },

    methods: {
        ...mapMutations([
            'setTitle'
        ]),
        ...mapActions([]),

        //모두 알림 클릭시
        allToggleMethod(val){
            console.log(val);
            if(val == true){
                this.toggleList = this.listval;
                this.$q.notify({
                    message: '모두 동의가 완료되었습니다.',
                    type: 'positive',
                })
            }
            else{
                this.toggleList = [];
                this.$q.notify({
                    message: '모두 동의가 해제되었습니다.',
                    type: 'positive',
                })
            }
        },

        //개별토글 클릭시
        toggleMethod(val){
            console.log(val);
            console.log(this.toggleList);
            for(let i=0; i < this.listval.length; i++){
                if(this.toggleList.length == this.listval.length){
                    this.allToggle = true;
                }
                else{
                    this.allToggle = false;
                }
            }
        },
    },

    beforeCreate(){},
    created(){
        //뒤로가기
        window.onpopstate = () => {};

        // layout title
        if(this.$route.params.title){
            this.setTitle('알림');
        }
        else{
            this.setTitle('알림');
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