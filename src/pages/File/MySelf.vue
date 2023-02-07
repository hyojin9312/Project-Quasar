<template>
    <q-page class="full-height">
        <section class="full-width">
            <q-scroll-area style="height: 100vh;">
                <section class="q-pa-md" style="min-width: 80vw;">
                    <div class="full-width q-pb-sm">
                        <div class="text-S text-weight-bolder">성장과정</div>
                        <q-input v-model="self" filled type="textarea" clearable/>
                    </div>

                    <div class="full-width q-pb-sm">
                        <div class="text-S text-weight-bolder">학창시절</div>
                        <q-input v-model="school" filled type="textarea" clearable/>
                    </div>

                    <div class="full-width q-pb-sm">
                        <div class="text-S text-weight-bolder">성격소개</div>
                        <q-input v-model="personality" filled type="textarea" clearable/>
                    </div>

                    <div class="full-width q-pb-sm">
                        <div class="text-S text-weight-bolder">지원동기 및 포부</div>
                        <q-input v-model="motive" filled type="textarea" clearable/>
                    </div>
                </section>
            </q-scroll-area>
            
        </section>

        <section class="fixed-bottom">
            <q-btn class="full-width text-M text-weight-bolder" color="primary" label="미리보기" @click="showDocPreview"/>
        </section>

        <!-- preview dialog -->
        <q-dialog 
            v-model="previewDialog" 
            persistent 
            :maximized="maximzedToggle"
            transition-show="slide-up"
            transition-hide="slide-down"
            >
            <q-layout container class="bg-white">
                <q-header class="bg-primary">
                    <q-toolbar>
                        <div class="text-h6 full-width text-center">미리보기</div>
                    </q-toolbar>
                </q-header>
                <q-page-container>
                    <q-page class="bg-whtie">
                        <!--v-if="captureImgData == null"-->
                        <section v-if="captureImgData == null" id="print" ref="print" class="doc q-pa-md" style="padding: 100px;">
                            <div class="text-XL text-weight-bolder q-pb-lg">자 기 소 개 서</div>
                            <!-- 성장과정 영역 -->
                            <div class="full-width q-py-lg">
                                <div class="text-M q-pb-sm">● 성장과정</div>
                                <table class="full-width table">
                                    <tr>
                                        <td :style="self ? {'width': '100%', 'height':'40vh'} : {'width': '100%', 'height':'50vh'}">
                                            {{ self }}
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <!-- 학창시절 영역 -->
                            <div class="full-width q-py-lg">
                                <div class="text-M q-pb-sm">● 학창시절</div>
                                <table class="full-width table">
                                    <tr>
                                        <td :style="school ? {'width': '100%', 'height':'40vh'} : {'width': '100%', 'height':'50vh'}">
                                            {{ school }}
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <!-- 성격소개 영역 -->
                            <div class="full-width q-py-lg">
                                <div class="text-M q-pb-sm">● 성격소개</div>
                                <table class="full-width table">
                                    <tr>
                                        <td :style="personality ? {'width': '100%', 'height':'40vh'} : {'width': '100%', 'height':'50vh'}">
                                            {{ personality }}
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <!-- 지원동기 및 포부 영역 -->
                            <div class="full-width q-py-lg">
                                <div class="text-M q-pb-sm">● 지원동기 및 포부</div>
                                <table class="full-width table">
                                    <tr>
                                        <td :style="motive ? {'width': '100%', 'height':'40vh'} : {'width': '100%', 'height':'50vh'}">
                                            {{ motive }}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </section>
                        <div class="full-width full-height absolute bg-white"></div>
                        <v-zoomer id="doc" class="bg-white absolute-center" style="width: 95vw; height: 95vh;" pivot="image-center">
                            <img :src="captureImgData" style="object-fit: contain; width: 100%; height: 100%;">
                        </v-zoomer>
                    </q-page>
                </q-page-container>
                <q-footer class="bg-primary text-white">
                    <q-toolbar>
                        <div class="row flex-center full-width">
                        <q-btn v-if="!$q.platform.is.mobile" flat label="프린트" color="white" v-close-popup/>
                        <q-btn flat label="전송하기" color="white"  v-close-popup/>
                        <q-btn flat label="저장하기" color="white" v-close-popup @click="saveImg"/>
                        <q-btn flat label="닫기" color="white" v-close-popup style="z-index: 3"/>
                    </div>
                    </q-toolbar>
                </q-footer>
            </q-layout>
        </q-dialog>
    </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { isEmpty } from 'src/boot/globalFunc';

export default {
    name: 'MySelf',
    computed:{
        ...mapGetters([
            'getLayout'
        ]),
    },

    data(){
        return{
            //보여주는 dialog
            previewDialog: false,
            maximzedToggle: true,
            captureImgData: null,

            //소개 바인딩
            self: '',
            school: '',
            personality: '',
            motive: '',
            

        }
    },

    methods:{
        ...mapMutations([
            'setTitle',
        ]),
        ...mapActions([]),

        //미리보기
        showDocPreview() {
            let self = this;
            this.captureImgData = null;
            this.previewDialog = !this.previewDialog;

            setTimeout(async () => {
            // let el = this.$refs.print;
            let el = document.querySelector('#print');
            console.log(el);
            if(isEmpty(el)){
                return;
            }
            let options = {type: 'dataURL'};

            self.captureImgData = await this.$html2canvas(el, options);
            console.log(self.captureImgData);
            },100);
        },

        //이미지 저장
        saveImg(){
            let a = document.createElement("a");
            a.href = this.captureImgData;
            a.download = "myself.png";
            document.body.appendChild(a);
            a.click();
            //다운로드가 되면 태그 삭제
            document.body.removeChild(a);
        },
    },

    beforeCreate(){},
    created(){
        //뒤로가기 이벤트
        window.onpopstate = () => {};

        this.setTitle('자기소개서');
    },
    beforeMount(){},
    mounted(){
    },
    beforeUpdate(){},
    updated(){},
    beforeDestroy(){},
    destroyed(){},
    
}
</script>

<style scoped>
.doc {
  top: 0;
  left: 0;
  position: absolute;
  width: 42cm;
  height: 57.4cm;
  /*padding: .5cm;*/
  /*margin: 1cm auto;*/
  border: 1px #D3D3D3 solid;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  touch-action: auto; /* 기본 값 */
  touch-action: none; /* 브라우저가 모든 터치 이벤트를 무시하도록 설정 */
  touch-action: pan-x; /* 특정 축으로의 터치를 사용한 스크롤 허용 */
  touch-action: pan-y;
  touch-action: pinch-zoom; /* 핀치 줌(여러 손가락을 사용한 확대/축소) 허용 */
  touch-action: manipulation; /* 터치를 사용한 스크롤, 핀치 줌만 허용하고 그 외 비표준 동작 (더블 탭으로 확대 등) 불허용 */
  touch-action: pan-y pinch-zoom; /* 동시에 여러 값 지정 가능 */
}

@page {
  size: A3;
  margin: 0;
  top:0;
  left: 0;
}

@media print {
  .doc {
    margin: 0;
    border: initial;
    border-radius: initial;
    width: initial;
    min-height: initial;
    box-shadow: initial;
    background: initial;
    page-break-after: always;
  }
}

.table {
  border-collapse:collapse;
  border-spacing:0;
  border: 1px solid black;
}
</style>