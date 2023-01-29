<template>
    <q-page class="bg-grey-2">
        <section class="q-pa-md">
            <div>
                <!-- 프로필영역 -->
                <div class="full-width flex flex-center q-pb-md">
                    <q-avatar size="90px">
                        <img :src="profileImg">
                    </q-avatar>
                </div>
                <div class="q-pb-lg full-width flex justify-end">
                    <q-btn color="orange" label="프로필변경" @click="profileUpdate"/>
                </div>

                <!-- 정보 영역 -->
                <div class="q-mt-md">
                  <q-card class="cardRounded q-pa-md text-S q-gutter-y-sm">
                    <div class="full-width flex">
                        이름
                        <q-space/>
                        {{ name }}
                    </div>
                    <div class="full-width flex">
                        아이디
                        <q-space/>
                        {{ loginId }}
                    </div>
                    <div class="full-width flex">
                        닉네임
                        <q-space/>
                        {{ nickName }}
                    </div>
                    <div v-if="emailShow">
                        <div class="full-width flex justify-between">
                            <div>이메일</div>
                            <div>
                                등록안됨
                                <q-btn color="primary" @click="emailCert">등록하기</q-btn>
                            </div>
                            
                        </div>
                    </div>
                    <div v-else>
                        <div class="full-width flex justify-between">
                            <div>이메일</div>
                            <div>{{ emailaddress }}</div>
                        </div>
                    </div>
                </q-card>  
                </div>
                
            </div>
        </section>

        <!-- 프로필 변경 dialog-->
        <q-dialog 
            v-model="profileDialog" 
            persistent>
            <q-card style="min-width: 80vw;">
                <q-card-section>
                    <div class="full-width flex flex-center text-center">
                        프로필 이미지를 변경하시려면<br>
                        이미지를 클릭해주세요.
                    </div>
                    <q-input class="full-width" v-model="updateImg" filled type="file" accept="image/*"/>
                </q-card-section>
                <q-card-actions class="no-padding" style="border-top: 1px solid #eaeaea;">
                    <div style="width: 50%; border-right: 1px solid #eaeaea;">
                        <q-btn class="q-py-sm full-width text-S text-red text-weight-bolder" flat label="닫기" v-close-popup />
                    </div>
                    <div style="width: 50%">
                        <q-btn class="q-py-sm full-width text-S text-blue text-weight-bolder" flat label="확인" @click="imgOk"/>
                    </div>
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- fixme 이메일 인증 dialog -->
        <q-dialog 
            v-model="emailDialog" 
            persistent>
            <q-card style="min-width: 80vw;">
                <q-card-section>
                    <div class="q-pa-md">
                        <q-input class="full-width text-S" v-model="emailInput" outlined clearable placeholder="이메일주소를 입력해주세요." />
                    </div>
                </q-card-section>
                <q-card-actions class="no-padding" style="border-top : 1px solid #eaeaea;">
                    <div style="width: 50%; border-right: 1px solid #eaeaea">
                        <q-btn class="q-py-sm full-width text-S text-red text-weight-bolder" flat label="닫기" v-close-popup />
                    </div>
                    <div style="width: 50%">
                        <q-btn class="q-py-sm full-width text-S text-blue text-weight-bolder" flat label="확인" @click="emailOk"/>
                    </div>
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- fixme 이메일 인증번호 dialog -->
        <q-dialog 
            v-model="emailCertDialog" 
            persistent>
            <q-card style="min-width: 80vw;">
                <q-card-section>
                    <div class="full-width flex flex-center text-S text-center">
                        입력하신 이메일로.<br>
                        인증번호를 발송하였습니다.<br>
                        인증번호를 입력해주세요.
                    </div>
                    <div>
                        <q-input class="full-width text-S" v-model="emailCertInput" outlined clearable placeholder="인증번호를 입력해주세요."/>
                    </div>
                </q-card-section>
                <q-card-actions class="no-padding" style="border-top : 1px solid #eaeaea">
                    <div style="width: 50%; border-right: 1px solid #eaeaea;">
                        <q-btn class="q-py-sm full-width text-S text-red text-weight-bolder" flat label="닫기" v-close-popup/>
                    </div>
                    <div style="width: 50%">
                        <q-btn class="q-py-sm full-width text-S text-blue text-weight-bolder" flat label="확인" @click="certOk"/>
                    </div>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    name: 'MyInfo',
    computed:{
        ...mapGetters([
            'getLayout',
        ]),
    },

    data(){
        return{
            //프로필 dialog
            profileDialog: false,
            //이미지 input
            updateImg: "",

            //프로필 이미지
            profileImg: "https://cdn.quasar.dev/img/avatar.png",

            //내정보
            //이름
            name : '김효진',
            //id
            loginId: 'asdg1234',
            //닉네임
            nickName: '울랄라',

            //이메일 영역
            emailShow : true,
            //이메일주소
            emailaddress: 'dadfqe@naver.com',

            //이메일 dialog
            emailDialog : false,
            //이메일 input
            emailInput: '',
            //이메일 인증번호 dialog
            emailCertDialog : false,
            //이메일 인증번호 input
            emailCertInput: '',
        }
    },

    methods:{
        ...mapMutations([
            'setTitle',
        ]),
        ...mapActions([]),

        //이메일등록 dialog
        emailCert(){
            this.emailDialog = true;
        },

        //이메일주소 입력 확인 
        emailOk(){
            if(this.emailInput == "" || this.emailInput.length == 0){
                this.$q.notify({
                    message: '이메일주소를 입력해주세요',
                    type: 'negative',
                    timeout: 2500,
                })
                return;
            }
            else{
                this.emailDialog = false;
                this.emailCertDialog = true;
            }
            
        },

        //인증번호 입력 확인
        certOk(){
            if(this.emailCertInput == "" || this.emailCertInput.length == 0){
                this.$q.notify({
                    message: '인증번호를 입력해주세요',
                    type: 'negative',
                    timeout: 2500,
                })
                return;
            }
            else{
                this.emailShow = false;
                this.emailCertDialog = false;
            }
        },

        // 프로필 변경 dialog
        profileUpdate(){
            this.profileDialog = true;
        },

        // 이미지변경 확인
        imgOk(){
            if(this.updateImg == "" || this.updateImg.length == 0){
                this.$q.notify({
                    message: '이미지를 선택해주세요.',
                    type: 'negative',
                    timeout: 2500,
                })
                return;
            }
            else{
                this.profileImg = "https://cdn.quasar.dev/img/avatar2.jpg";
                this.profileDialog = false;
            }
        },
    },

    beforeCreate(){},
    created(){
        //뒤로가기 이벤트
        window.onpopstate = () => {};

        console.log(this.$route.params.title);

        // layout title
        if(this.$route.params.title){
            this.setTitle(this.$route.params.title);
        }
        else{
            this.setTitle('내정보');
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