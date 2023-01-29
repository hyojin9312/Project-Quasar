<template>
    <q-page>
        <section class="q-pa-md">
            <q-card v-for="(item,index) in faqList" :key="index" class="full-width q-mb-sm">
                <q-expansion-item class="full-width">
                    <template v-slot:header>
                        <q-item-section class="text-weight-bolder text-M">
                            {{ item.title }}
                        </q-item-section>
                    </template>
                    <q-separator class="full-width"/>
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
    name: 'FAQ',
    computed:{
        ...mapGetters([
            'getLayout',
        ])
    },

    data(){
        return{
            //자주묻는질문 리스트
            faqList: [
                {title:'문서 저장은 어떻게 하나요?', content: '앱 문서는 메인화면에서 선택하여 입력 후 저장하시면 됩니다.'},
                {title:'문서 업데이트 언제되나요?', content: '문서는 추후에 업데이트 됩니다.'},
                {title:'문서 보안은 되나요?', content: '문서 들어가기전 본인확인 후 문서 저장시 암호화 되어 저장됩니다.'},
                {title:'내정보 수정은 어떻게 하나요?', content: '메뉴화면에서 내정보 클릭 후 들어가시면 수정버튼 클릭 후 수정하고자하는 내용을 수정후 저장하시면 됩니다.'},
            ],
        }
    },

    methods: {
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
        }
        else{
            this.setTitle('자주묻는 질문');
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