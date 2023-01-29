<template>
    <q-page class="bg-grey-2 full-width">
        <!-- 내정보 영역 -->
        <section class="q-pa-md">
            <div class="text-h6 text-weight-bolder">내정보</div>
            <q-card class="text-subtitle1" v-ripple @click="goToPage(1)">
                <q-card-section>
                    <div class="flex items-center justify-between">
                        <div>내정보</div>
                        <q-icon color="grey" name="navigate_next" size="40px"/>
                    </div>
                </q-card-section>
            </q-card>
        </section>
        <!-- 로그인정보 영역 -->
        <section class="q-pa-md">
            <div class="text-h6 text-weight-bolder">로그인 정보</div>
            <q-card class="text-subtitle1">
                    <q-card-section>
                        <div>{{ loginInfo }}</div>
                        <q-separator class="q-my-sm"/>
                        <section class="flex items-center">
                            <div>자동로그인</div>
                            <q-space/>
                            <q-toggle 
                                v-model="togleModel"/>
                        </section>
                        <q-separator class="q-my-sm"/>
                        <div> {{ name }}</div>
                    </q-card-section>
                </q-card>
        </section>

        <!-- 알림설정 영역 -->
        <section class="q-pa-md">
            <div class="text-h6 text-weight-bolder">알림설정</div>
            <q-card class="text-subtitle1" v-ripple @click="goToPage(2)">
                <q-card-section>
                    <div class="flex items-center justify-between">
                        <div>알림받기</div>
                        <q-icon color="grey" name="navigate_next" size="40px"/>
                    </div>
                </q-card-section>
            </q-card>
        </section>

        <!-- 고객센터 영역 -->
        <section class="q-pa-md">
            <div class="text-h6 text-weight-bolder">고객센터</div>
            <q-card class="text-subtitle1 q-py-sm">
                <q-list class="no-padding">
                    <q-item clickable v-ripple @click="goToPage(3)">
                        <q-item-section>
                            고객센터
                        </q-item-section>
                        <q-item-section avatar>
                            <q-icon color="grey" name="navigate_next" size="40px"/>
                        </q-item-section>
                    </q-item>
                    <q-separator class="q-mx-md"/>
                    <q-item clickable v-ripple @click="goToPage(4)">
                        <q-item-section>
                            약관
                        </q-item-section>
                        <q-item-section avatar> 
                            <q-icon color="grey" name="navigate_next" size="40px" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card>
        
        </section>
    </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
    name: 'Setting',
    computed:{
        ...mapGetters([
            'getLayout',
            'getTitle,'
        ]),
    },

    data(){
        return{
            // 로그인정보
            loginInfo: "asdg1234",
            // 토글 v-model
            togleModel: true,
            // 닉네임
            name: "울랄라"
        }
    },

    methods:{
        ...mapMutations([
            'setTitle',
        ]),
        ...mapActions([]),

        //type별 페이지이동
        goToPage(type){
            switch(type){
                case 1: 
                    this.$router.push({name: 'myinfo', params: {title : '내정보'}});
                    break;
                case 2:
                    this.$router.push({name: 'notification', params: {title: '알림'}});
                    break;
                case 3: 
                    this.$router.push({name: 'service', params: {title : '고객센터'}});
                    break;
                case 4:
                    this.$router.push({name: 'terms', params: {title : '약관'}});
                    break;       
            }
            
        },
    },

    beforeCreate(){},
    created(){
        //뒤로가기 이벤트
        window.onpopstate = () => {};

        console.log(this.$route.params.title);

        //layout title
        if(this.$route.params.title){
            this.setTitle(this.$route.params.title);
        }
        else{
            this.setTitle('설정');
        }
        
    },
    beforeMount(){
    },
    mounted(){},
    beforeUpdate(){},
    updated(){},
    beforeDestroy(){},
    destroyed(){}
}
</script>