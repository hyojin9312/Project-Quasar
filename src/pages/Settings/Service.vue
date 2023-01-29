<template>
    <q-page>
        <section class="q-pa-md">
            <!-- title영역 -->
            <div class="full-width flex flex-center text-M text-weight-bolder q-py-md">무엇을 도와드릴까요?</div>

            <!-- 버튼영역 -->
            <div class="full-width flex justify-between items-center q-py-md">
                <q-card class="text-center q-pa-sm" v-ripple style="width: 30%" @click="questionMethod(1)">
                    <q-icon class="q-py-sm" name="quiz" size="lg"/>
                    <div >1:1 문의하기</div>
                </q-card>

                <q-card class="text-center q-pa-sm" v-ripple style="width: 30%" @click="questionMethod(2)">
                    <q-icon class="q-py-sm" name=" question_answer" size="lg"/>
                    <div>1:1 문의확인</div>
                </q-card>

                <q-card class="text-center q-pa-sm" v-ripple style="width: 30%" @click="questionMethod(3)">
                    <q-icon class="q-py-sm" name="support_agent" size="lg"/>
                    <div>FAQ</div>
                </q-card>
            </div>

            <!-- 공지사항 영역 -->
            <div class="q-pt-md">
                <q-separator />
                <q-list class="q-py-sm">
                    <q-item clickable v-ripple @click="noticeMethod">
                        <q-item-section>
                            <q-item-label class="text-M text-weight-bolder">공지사항</q-item-label>
                            <q-item-label caption>소식 및 이벤트안내</q-item-label>
                        </q-item-section>
                        <q-item-section avatar>
                            <q-icon color="grey" name="navigate_next" size="40px"/>
                        </q-item-section>
                    </q-item>
                </q-list>
                <q-separator />
            </div>

            <!-- 문의사항 영역 -->
            <div class="full-width q-py-sm">
                <div class="flex flex-center">
                    <q-card flat v-ripple class="q-pa-sm" style="width: 50%;" @click="serviceMethod('event')">
                    <div class="text-M text-weight-bolder">이벤트 문의</div>
                    <div>02-1234-1234</div>
                    </q-card>
                    <q-card class="q-pa-sm" flat v-ripple style="width: 50%" @click="serviceMethod('company')">
                        <div class="text-M text-weight-bolder">회사 문의</div>
                        <div>1515-1515</div>
                    </q-card>
                </div>
                <q-separator class="q-my-sm"/>
                <div>
                    <q-card class="text-M text-weight-bolder q-pa-sm" flat v-ripple @click="serviceMethod('mail')">
                        <div>이메일 문의</div>
                    </q-card>
                </div>
            </div>
        </section>
    </q-page>
</template>

<script>
import  {mapGetters, mapMutations, mapActions} from 'vuex';
export default {
    name: 'Service',
    computed: {
        ...mapGetters([
            'getLayout',
        ]),
    },

    data(){
        return{
        }
    },

    methods: {
        ...mapMutations([
            'setTitle',
        ]),
        ...mapActions([]),

        //문의메소드
        serviceMethod(val){
            console.log(val);
            switch(val){
                case 'event':
                    location.herf='tel:02-1234-1234';
                    break;
                case 'company':
                    location.herf='tel:1515-1515';
                    break;
                case 'mail':
                    location.href='mailTo:gywls9398@naver.com';
                    break;        
            }
        },

        // 문의 클릭시
        questionMethod(type){
            switch(type){
                case 1:
                case 2:
                    this.$router.push({name: 'question', params: {type: type, title:'문의'}});
                    break;
                case 3:
                    this.$router.push({name: 'faq', params: {title: '자주묻는 질문'}});
                    break;        
            }
        },

        // 공지사항 클릭시
        noticeMethod(){
            this.$router.push({name:'notice', params: {title: '공지사항'}});
        },
    },

    beforeCreate(){},
    created(){
        //뒤로가기 이벤트
        window.onpopstate = () => {};

        if(this.$route.params.title){
            this.setTitle(this.$route.params.title);
        }
        else{
            this.setTitle('고객센터');
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