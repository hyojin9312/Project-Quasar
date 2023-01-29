<template>
    <q-page>
        <q-tabs 
            v-model="tab" 
            active-color="primary"
            indicator-color="primary"
            class="bg-white shadow-2"
            align="justify">
            <q-tab name="question" label="문의 등록"/>
            <q-tab name="check" label="문의 확인"/>
        </q-tabs>

        <q-tab-panels v-model="tab" swipeable class="full-height">
            <!-- 문의등록 영역 -->
            <q-tab-panel name="question">
                <section class="flex full-width">
                    <div class="flex full-width">
                        <q-card class="full-width flex items-center q-pa-md">
                            <!-- 질문분류 선택 영역 -->
                            <div class="flex justify-start text-weight-bolder" style="width:20%">
                                질문분류
                            </div>
                            <div class="flex flex-center q-px-sm" style="width: 80%">
                                <q-btn-dropdown class="text-S full-width" :label="dropLabel">
                                    <q-list v-for="(item, index) in listLabel" :key="index">
                                        <q-item clickable v-close-popup @click="labelChange(item)">
                                            <q-item-section>
                                                {{ item }}
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-btn-dropdown>
                            </div>
                            <!-- 제목영역-->
                            <div class="flex full-width q-mt-sm">
                                <div class="flex flex-center text-weight-bolder" style="width: 20%;">
                                    제목
                                </div>
                                <div class="flex flex-center" style="width: 80%;">
                                    <q-input dense class="full-width" v-model="questionTitle" outlined/>
                                </div>
                            </div>
                            <!-- 내용입력 영역 -->
                            <div class="flex full-width q-mt-sm">
                                <div class="flex flex-center text-weight-bolder" style="width: 20%">
                                    내용
                                </div>
                                <div class="flex flex-center" style="width: 80%;">
                                    <q-input dense class="full-width" v-model="questionContent" outlined type="textarea"/>
                                </div>
                            </div>
                        </q-card>
                    </div>
                </section>
                <!-- 등록하기 버튼 영역 -->
                <div class="full-width flex flex-center fixed-bottom">
                    <q-btn class="full-width text-weight-bolder text-M q-pa-sm" outline 
                            label="등록하기" @click="questionSave"/>
                </div>
            </q-tab-panel>
            <!-- 문의내용 영역 -->
            <q-tab-panel name="check" >
                <section class="full-width flex">
                    <q-card class="full-width q-pa-sm q-mb-sm text-S"
                            v-for="(item,index) in questionList" :key="index">
                        <div>분류 : {{  item.label }}</div>
                        <div>제목 : {{  item.title }}</div>
                        <div>내용 : {{  item.content }}</div>
                        <div>등록날짜 : {{  item.saveDate }}</div>
                    </q-card>
                </section>
            </q-tab-panel>
        </q-tab-panels>

        <!-- 질문등록 확인 dialog -->
        <q-dialog 
            v-model="questionDialog" 
            persistent>
            <q-card style="min-width: 80vw;">
                <q-card-actions>
                    <div class="full-width flex flex-center text-center text-M text-weight-bolder q-pa-md">
                        질문을 등록하시겠습니까?
                    </div>
                </q-card-actions>
                <q-card-actions class="no-padding" style="border-top: 1px solid #eaeaea">
                    <div style="width: 50%; border-right: 1px solid #eaeaea">
                        <q-btn class="q-py-sm full-width text-weight-bolder text-S text-red" 
                                flat label="취소" v-close-popup/>
                    </div>
                    <div style="width: 50%;">
                        <q-btn class="q-py-sm full-width text-weight-bolder text-blue text-S"
                            flat label="확인" @click="questionOk"/>
                    </div>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import {isEmpty} from 'boot/globalFunc';

export default {
    name: 'Question',
    computed:{
        ...mapGetters([
            'getLayout',
        ])
    },

    data(){
        return{
            tab: 'question',

            // 질문분류버튼
            dropLabel: '',

            // 질문분류 리스트
            listLabel: ['앱', '이벤트', '불편사항', '건의사항'],

            // 질문제목
            questionTitle: '',
            // 질문내용
            questionContent: '',

            // 질문등록 dialog
            questionDialog: false,

            // 등록질문 리스트
            questionList : [
                {label: '앱', title: '사용법', content: '사용방법 문의', saveDate: '2023-01-02'},
                {label: '이벤트', title: '이벤트 문의', content: '이번 이벤트 접수 방법', saveDate: '2023-01-10'},
            ],
        }
    },

    methods:{
        ...mapMutations([
            'setTitle'
        ]),
        ...mapActions([]),

        // 질문선택
        labelChange(item){
            this.dropLabel = item;
        },

        // 질문등록
        questionSave(){
            if(isEmpty(this.dropLabel)){
                this.$q.notify({
                    message : '질문 분류를 선택해주세요',
                    type: 'warning',
                    timeout: 1000,
                });
                return;
            }
            if(isEmpty(this.questionTitle)){
                this.$q.notify({
                    message: '질문 제목을 입력해주세요',
                    type: 'warning',
                    timeout: 1000,
                })
                return;
            }
            if(isEmpty(this.questionContent)){
                this.$q.notify({
                    message: '질문 내용을 입력해주세요',
                    type: 'warning',
                    timeout: 1000,
                })
                return;
            }

            this.questionDialog = true;
        },

        //질문등록 확인
        questionOk(){
            this.tab = 'check';
            this.questionTitle = '';
            this.questionContent = '';
            this.dropLabel = '';
            this.questionDialog = false;
        },
    },

    beforeCreate(){},
    created(){
        //뒤로가기
        window.onpopstate = () => {};

        // layout title
        if(this.$route.params.title){
            this.setTitle(this.$route.params.title);
            if(this.$route.params.type == 2){
                this.tab = 'check';
            }
        }
        else{
            this.setTitle('문의');
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