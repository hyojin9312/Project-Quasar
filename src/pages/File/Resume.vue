<template>
    <q-page class="bg-grey-2">
        <q-scroll-area class="q-pb-lg" style="height: 90vh;">
            <section class="q-pa-md">
                <q-card class="q-pa-sm text-M text-weight-bolder">
                    <div class="flex justify-start items-center q-pb-sm">
                        <div class="text-center" style="width: 35%;">성명(한글) :</div>
                        <q-input outlined style="width: 65%;" v-model="name" clearable @keyup.enter="$refs.character.focus()"/>
                    </div>
                    <div class="flex justify-start items-center q-pb-sm">
                        <q-uploader label="증명사진 업로드" class="full-width" accept="image/*" @added="(files) => {uploadImg(files)}"/>
                    </div>
                    <div class="flex justify-start items-center q-pb-sm">
                        <div class="text-center" style="width: 35%;">성명(한자) :</div>
                        <q-input outlined style="width: 65%;" v-model="character" clearable ref="character" @keyup.enter="$refs.reg.focus()"/>
                    </div>
                    <div class="flex justify-start items-center q-pb-sm">
                        <div class="text-center" style="width: 35%;">주민번호 :</div>
                        <q-input outlined style="width: 65%;" v-model="regNumber" placeholder="000000-0000000" mask="######-#######" clearable ref="reg" @keyup.enter="$refs.ymd.focus()"/>
                    </div>
                    <div class="flex justify-start items-center q-pb-sm">
                        <div class="text-center" style="width: 35%;">생년월일 :</div>
                        <q-input outlined style="width: 65%;" placeholder="0000년00월00일" v-model="ymd" clearable ref="ymd" @keyup.enter="$refs.relation.focus()"/>
                    </div>
                    <div class="flex justify-start items-center q-pb-sm">
                        <div class="text-center" style="width: 45%;">호주와의관계 :</div>
                        <q-input outlined style="width: 55%;" v-model="relationship" clearable ref="relation" @keyup.enter="$refs.pName.focus()"/>
                    </div>
                    <div class="flex justify-start items-center q-pb-sm">
                        <div class="text-center" style="width: 35%;">호주성명 :</div>
                        <q-input outlined style="width: 65%;" v-model="pName" clearable ref="pName" @keyup.enter="$refs.address.focus()"/>
                    </div>
                    <div class="flex justify-start items-center q-pb-sm">
                        <div class="text-center" style="width: 30%;">현주소 :</div>
                        <q-input outlined style="width: 70%;" v-model="address" clearable ref="address" @keyup.enter="$refs.phone.focus()"/>
                    </div>
                    <div class="flex justify-start items-center q-pb-sm">
                        <div class="text-center" style="width: 30%;">전화 :</div>
                        <q-input outlined style="width: 70%;" v-model="phone" clearable ref="phone" @keyup.enter="$refs.phoneNumber.focus()"/>
                    </div>
                    <div class="flex justify-start items-center q-pb-sm">
                        <div class="text-center" style="width: 30%;">휴대폰 :</div>
                        <q-input outlined style="width: 70%;" v-model="phoneNumber" clearable ref="phoneNumber" placeholder="010-0000-0000" mask="###-####-####" @keyup.enter="$refs.character.focus()"/>
                    </div>
                    <div class="q-pb-sm">
                        <q-card v-for="(item, index) in school" :key="index" class="q-mb-sm">
                            <q-card-section v-if="school.length > 0">
                                <div>기간 : {{ item.schoolDate  }}</div>
                                <div>학력사항 : {{ item.schoolName }}</div>
                                <div>비고 : {{ item.schoolNote  }}</div>
                            </q-card-section>
                        </q-card>
                        <q-btn class="full-width text-weight-bolder" size="md" icon="add" label="학력 추가" color="primary" @click="addMethod(1)"/>
                    </div>
                    <div class="q-pb-sm">
                        <q-card v-for="(item, index) in school" :key="index">
                            <q-card-section v-if="career.length > 0">
                                <div>기간 : {{ item.careerDate }}</div>
                                <div>경력 및 자격사항 : {{ item.careerName }}</div>
                                <div>비고 : {{ item.careerNote }}</div>
                            </q-card-section>
                        </q-card>
                        <q-btn class="full-width text-weight-bolder" size="md" icon="add" label="경력 및 자격사항 추가" color="primary" @click="addMethod(2)"/>
                    </div>
                    <div class="q-py-md text-right">
                        <div v-if="signature == null" @click="signOpen">(서명)</div>
                        <q-img v-else :src="signature" @click="signOpen" style="width: 60px; height: 60px;"/>
                    </div>
                    <div class="q-pb-sm flex justify-start items-center text-center">
                        <div style="width: 35%;">날짜 :</div>
                        <q-input v-model="date" style="width: 65%;" outlined clearable type="date"/>
                    </div>
                </q-card>
            </section>
        </q-scroll-area>
        
        <section class="fixed-bottom">
            <q-btn class="full-width text-M text-weight-bolder" color="primary" label="미리보기" @click="showDocPreview"/>
        </section>

        <!--preview dialog -->
        <q-dialog 
            v-model="previewDialog"
            persistent
            :maximized="maximizedToggle"
            transition-show="slide-up"
            transition-hide="slide-down">
            <q-layout container>
                <q-header class="bg-primary">
                    <q-toolbar>
                        <div class="text-h6 full-width text-center">미리보기</div>
                    </q-toolbar>
                </q-header>
                <q-page-container class="bg-white">
                    <q-page>
                        <!--   -->
                        <section v-if="captureImgData == null" id="print" ref="print" class="doc q-pa-md" style="padding: 150px;  padding-top: 200px;">
                            <div class="full-width">
                                <table class="full-width table text-L">
                                    <colgroup>
                                        <col style="width: 20%;">
                                        <col style="width: 15%;">
                                        <col style="width: 20%;">
                                        <col style="width: 15%;">
                                        <col style="width: 15%;">
                                        <col style="width: 15%;">
                                    </colgroup>
                                    <tr>
                                        <td rowspan="4" class="text-center">
                                            <div v-if="myImg == null">(사&emsp;진)</div>
                                            <q-img v-else :src="myImg"/>
                                        </td>
                                        <td colspan="6" class="text-center q-py-lg text-XXL text-weight-bolder">이&emsp;&emsp;력&emsp;&emsp;서</td>
                                    </tr>
                                    <tr>
                                        <td rowspan="2" class="text-center" >성&emsp;&emsp;명</td>
                                        <td rowspan="2" colspan="2" class="q-py-sm q-pl-sm">
                                            <div>(한글) {{ name }}</div>
                                            <div>(한자) {{ character }}</div>
                                        </td>
                                        <td colspan="2" class="text-center">주 민 등 록 번 호</td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="text-center q-pl-sm q-py-md"> {{ regNumber }}</td>
                                    </tr>
                                    <tr>
                                        <td class="q-py-md text-center">생년월일</td>
                                        <td colspan="5" class="q-pl-sm">{{ ymd }}</td>
                                    </tr>
                                    <tr>
                                        <td class="q-py-md text-center">호적관계</td>
                                        <td class="text-center">호주와의 관계</td>
                                        <td class="q-pl-sm"> {{ relationship }} </td>
                                        <td class="text-center">호주성명</td>
                                        <td colspan="2" class="q-pl-sm"> {{ pName }} </td>
                                    </tr>
                                    <tr>
                                        <td class="q-py-md text-center">현&nbsp; 주 &nbsp;소</td>
                                        <td colspan="6" class="q-pl-sm">{{ address }}</td>
                                    </tr>
                                    <tr>
                                        <td class="q-py-md text-center">연&nbsp; 락 &nbsp;처</td>
                                        <td colspan="6" class="q-pl-sm">전화 : {{ phone }}  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 휴대폰 : {{ phoneNumber  }}</td>
                                    </tr>
                                    <tr class="bg-grey-4 text-XL text-weight-bolder">
                                        <td class="q-py-md text-center">기 &emsp; 간</td>
                                        <td colspan="4" class="text-center">학 력 사 항</td>
                                        <td class="text-center">비&emsp;고</td>
                                    </tr>
                                    <tr>
                                        <td class="q-py-md text-center q-pl-sm">{{ school[0] != undefined ? school[0].schoolDate : ' - ' }} </td>
                                        <td colspan="4" class="q-pl-sm">{{ school[0] != undefined ? school[0].schoolName : '' }}</td>
                                        <td class="q-pl-sm">{{ school[0] != undefined ? school[0].schoolNote : '' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="q-py-md text-center q-pl-sm">{{ school[1] != undefined ? school[1].schoolDate : ' - '}}</td>
                                        <td colspan="4" class="q-pl-sm">{{ school[1] != undefined ? school[1].schoolName : ''  }}</td>
                                        <td class="q-pl-sm">{{ school[1] != undefined ? school[1].schoolNote : '' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="q-py-md text-center q-pl-sm">{{ school[2] != undefined ? school[2].schoolDate : ' - ' }}</td>
                                        <td colspan="4" class="q-pl-sm">{{ school[2] != undefined ? school[2].schoolName : ''  }}</td>
                                        <td class="q-pl-sm">{{ school[2] != undefined ? school[2].schoolNote : '' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="q-py-md text-center q-pl-sm">{{ school[3] != undefined ? school[3].schoolDate : ' - '}}</td>
                                        <td colspan="4" class="q-pl-sm">{{ school[3] != undefined ? school[3].schoolName : ''  }}</td>
                                        <td class="q-pl-sm">{{ school[3] != undefined ? school[3].schoolNote : '' }}</td>
                                    </tr>
                                    <tr class="bg-grey-4 text-XL text-weight-bolder">
                                        <td class="q-py-md text-center">기 &emsp; 간</td>
                                        <td colspan="4" class="text-center">경력 및 자격사항 등</td>
                                        <td class="text-center">비 &emsp; 고</td>
                                    </tr>
                                    <tr>
                                        <td class="q-py-md text-center q-pl-sm">{{ career[0] != undefined && career.length > 0 ? career[0].careerDate : ' - '  }}</td>
                                        <td colspan="4">{{ career[0] != undefined ? career[0].careerName : '' }}</td>
                                        <td>{{ career[0] != undefined ? career[0].careerNote : '' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="q-py-md text-center q-pl-sm">{{ career[1] != undefined && career.length > 0  ? career[1].careerDate : ' - ' }}</td>
                                        <td colspan="4">{{ career[1] != undefined ? career[1].careerName :'' }}</td>
                                        <td>{{ career[1] != undefined ? career[1].careerNote : ''}}</td>
                                    </tr>
                                    <tr>
                                        <td class="q-py-md text-center q-pl-sm">{{ career[2] != undefined && career.length > 0  ? career[2].careerDate : ' - '  }}</td>
                                        <td colspan="4">{{ career[2] != undefined ? career[2].careerName : '' }}</td>
                                        <td>{{ career[2] != undefined ? career[2].careerNote : '' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="q-py-md text-center q-pl-sm">{{ career[3] != undefined && career.length > 0  ? career[3].careerDate : ' - ' }}</td>
                                        <td colspan="4">{{ career[3] != undefined ? career[3].careerName : '' }}</td>
                                        <td>{{ career[3] != undefined ? career[3].careerNote : '' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="q-py-md text-center q-pl-sm">{{ career[4] != undefined && career.length > 0 ? career[4].careerDate : ' - ' }}</td>
                                        <td colspan="4">{{ career[4] != undefined ? career[4].careerName : ''}}</td>
                                        <td>{{ career[4] != undefined ? career[4].careerNote : '' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="q-py-md text-center q-pl-sm">{{ career[5] != undefined && career.length > 0 ? career[5].careerDate : ' - ' }}</td>
                                        <td colspan="4">{{ career[5] != undefined ? career[5].careerName : '' }}</td>
                                        <td>{{ career[5] != undefined ? career[5].careerNote : ''}}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-center q-pa-xl" colspan="7">
                                            <div class="q-py-lg">위의 내용이 사실과 틀림없을을 확인합니다.</div>
                                            <div class="q-py-lg">{{ date.substring(0,4) }}년 {{ date.substring(5,7) }}월 {{ date.substring(8,10) }}일</div>
                                            <div class="q-py-lg flex justify-end items-center">지원자 : {{ name }}<div v-if="signature == null">(인)</div><img v-else class="flex flex-center q-pb-md" style="width: 15vw;" :src="signature"/></div>
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
                        <q-btn flat label="전송하기" color="white"  v-close-popup/>
                        <q-btn flat label="저장하기" color="white" v-close-popup @click="saveImg"/>
                        <q-btn flat label="닫기" color="white" v-close-popup style="z-index: 3"/>
                    </div>
                    </q-toolbar>
                </q-footer>
            </q-layout>
        </q-dialog>

        <!--학력추가 dialog-->
        <q-dialog 
            v-model="schoolDialog" 
            style="width: 80vw;" 
            persistent>
            <q-layout container class="bg-white">
                <q-header class="bg-primary">
                    <q-toolbar>
                        <div class="text-h6 full-width text-center">학력사항 추가</div>
                    </q-toolbar>
                </q-header>

                <q-page-container class="text-M text-weight-bolder">
                    <q-page>
                        <section class="q-pa-md">
                        <div class="flex jusify-start items-center q-pb-md">
                            <div class="text-center" style="width: 35%;">기간 :</div>
                            <q-input v-model="schoolDate" outlined style="width: 65%;" ref="schoolDate" placeholder="0000-0000" mask="####-####" clearable @keyup.enter="$refs.schoolName.focus()"/>
                        </div>

                        <div class="flex jusify-start items-center q-pb-md">
                            <div class="text-center" style="width: 35%;">학교명 :</div>
                            <q-input v-model="schoolName" outlined style="width: 65%;" ref="schoolName" clearable @keyup.enter="$refs.schoolNote.focus()"/>
                        </div>

                        <div class="flex jusify-start items-center ">
                            <div class="text-center" style="width: 35%;">비고 :</div>
                            <q-input v-model="schoolNote" outlined style="width: 65%;" ref="schoolNote" clearable/>
                        </div>
                    </section>
                    </q-page>
                </q-page-container>
                
                <q-footer class="bg-primary text-white">
                    <q-toolbar>
                        <div class="flex full-width flex-center">
                            <q-btn flat label="취소" v-close-popup/>
                            <q-btn flat label="추가" v-close-popup @click="schoolAdd"/>
                        </div>
                    </q-toolbar>
                </q-footer>
            </q-layout>
        </q-dialog>

        <!--경력추가 dialog-->
        <q-dialog 
            v-model="careerDialog" 
            style="width: 80vw;" 
            persistent>
            <q-layout container class="bg-white">
                <q-header class="bg-primary">
                    <q-toolbar>
                        <div class="text-h6 full-width text-center">경력 및 추가</div>
                    </q-toolbar>
                </q-header>

                <q-page-container class="text-M text-weight-bolder">
                    <q-page>
                        <section class="q-pa-md">
                        <div class="flex jusify-start items-center q-pb-md">
                            <div class="text-center" style="width: 35%;">기간 :</div>
                            <q-input v-model="careerDate" outlined style="width: 65%;" placeholder="0000-0000" mask="####-####" ref="careerDate" @keyup.enter="$refs.careerName.focus()"/>
                        </div>

                        <div class="flex jusify-start items-center q-pb-md">
                            <div class="text-center" style="width: 45%;">경력 및 자격 :</div>
                            <q-input v-model="careerName" outlined style="width: 55%;" ref="careerName" @keyup.enter="$refs.careerNote.focus()"/>
                        </div>

                        <div class="flex jusify-start items-center ">
                            <div class="text-center" style="width: 35%;">비고 :</div>
                            <q-input v-model="careerNote" outlined style="width: 65%;" ref="careerNote" @keyup.enter="$refs.careerNote.focus()"/>
                        </div>
                    </section>
                    </q-page>
                </q-page-container>
                
                <q-footer class="bg-primary text-white">
                    <q-toolbar>
                        <div class="flex full-width flex-center">
                            <q-btn flat label="취소" v-close-popup/>
                            <q-btn flat label="추가" v-close-popup @click="addCareer"/>
                        </div>
                    </q-toolbar>
                </q-footer>
            </q-layout>
        </q-dialog>

        <!-- 사인패드 -->
        <q-dialog 
            v-model="signatureDialog" 
            persistent>
            <q-card style="width: 90vw; height: 65vh;">
                <q-card-section>
                    <div class="row">
                        <div class="col-12 flex flex-center">
                            <VueSignaturePad 
                                id="signature" 
                                ref="signaturePad" 
                                width="80vw"
                                height="400px"
                                :options="options"/>
                        </div>
                    </div>
                </q-card-section>

                <q-card-actions align="right" class="absolute-bottom">
                    <q-separator class="full-width" />
                    <div class="row flex-center full-width" style="z-index: 2">
                        <q-btn flat label="닫기" size="md" color="red" v-close-popup/>
                        <q-btn flat label="삭제" size="md" color="orange" @click="undoSign"/>
                        <q-btn flat label="저장" size="md" color="primary" v-close-popup @click="saveSign"/>
                    </div>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { isEmpty } from 'src/boot/globalFunc';
import VueSignaturePad from 'vue-signature-pad';

export default {
    name: 'Resume',
    computed:{
        ...mapGetters([
            'getLayout'
        ]),
    },

    data(){
        return{
            //preview
            previewDialog: false,
            maximizedToggle: true,
            captureImgData: null,

            // 이미지
            myImg: null,

            //input v-model
            name : "",
            character: "",
            regNumber: "",
            ymd: "",
            relationship: "",
            pName: "",
            address: "",
            phone: "",
            phoneNumber: "",
            school: [],
            career : [],
            regDate: "",
            sign: null,
            date: "",

            //사인
            signature: null,
            signatureDialog: false,
            options: {
                penColor: "#000000",
                maxWidth: 10,
            },

            //학력추가 dialog
            schoolDialog: false,
            schoolDate: "",
            schoolName: "",
            schoolNote: "",

            //경력및 자격추가 dialog
            careerDialog: false,
            careerDate: "",
            careerName: "",
            careerNote: "",
 
        }
    },

    methods:{
        ...mapMutations([
            'setTitle',
        ]),
        ...mapActions([]),

        //추가 메소드
        addMethod(type){
            if(type == 1){
                this.schoolDialog = true;
            }
            else{
                this.careerDialog = true;
            }
        },

        //미리보기
        showDocPreview() {
            console.log(this.myImg);
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

        //이미지 저장하기
        saveImg(){
            let a = document.createElement("a");
            a.href = this.captureImgData;
            a.download = "Resume.png";
            document.body.appendChild(a);
            a.click();
            //다운로드가 되면 태그 삭제
            document.body.removeChild(a);
        },

        //사인dialog open
        signOpen(){
            this.signatureDialog = true;
        },

        //사인 저장
        saveSign(){
            const {isEmpty, data} = this.$refs.signaturePad.saveSignature();
            if(isEmpty){
                alert("저장하시려면 사인이 필요합니다!");
                return;
            }
            this.signature = data;
        },

        //사인 삭제
        undoSign(){
            this.$refs.signaturePad.undoSignature();
            this.signature = null;
        },

        //학력추가
        schoolAdd(){
            if(this.school.length == 0){
                this.school.push({
                    schoolDate: this.schoolDate,
                    schoolName: this.schoolName,
                    schoolNote: this.schoolNote,
                })
            }
            else if(this.school.length == 1){
                this.school.push({
                    schoolDate: this.schoolDate,
                    schoolName: this.schoolName,
                    schoolNote: this.schoolNote,
                })
            }
            else if(this.school.length == 2){
                this.school.push({
                    schoolDate: this.schoolDate,
                    schoolName: this.schoolName,
                    schoolNote: this.schoolNote,
                })
            }
            else if(this.school.length == 3){
                this.school.push({
                    schoolDate: this.schoolDate,
                    schoolName: this.schoolName,
                    schoolNote: this.schoolNote,
                })
            }
            else{
                this.$q.notify({
                    message: '더이상 추가할 수 없습니다.',
                    type: 'warning'
                });
            }
            console.log(this.school);

            this.schoolDate = "";
            this.schoolName = "";
            this.schoolNote = "";
        },

        // 경력 및 자격 추가
        addCareer(){
            if( this.career.length == 0){
                this.career.push({
                    careerDate: this.careerDate,
                    careerName: this.careerName,
                    careerNote: this.careerNote,
                })
            }
            else if(this.career.length == 1){
                this.career.push({
                    careerDate: this.careerDate,
                    careerName: this.careerName,
                    careerNote: this.careerNote,
                })
            }
            else if(this.career.length == 2){
                this.career.push({
                    careerDate: this.careerDate,
                    careerName: this.careerName,
                    careerNote: this.careerNote,
                })
            }
            else if(this.career.length == 3){
                this.career.push({
                    careerDate: this.careerDate,
                    careerName: this.careerName,
                    careerNote: this.careerNote,
                })
            }
            else if(this.career.length == 4){
                this.career.push({
                    careerDate: this.careerDate,
                    careerName: this.careerName,
                    careerNote: this.careerNote,
                })
            }
            else if(this.career.length == 5){
                this.career.push({
                    careerDate: this.careerDate,
                    careerName: this.careerName,
                    careerNote: this.careerNote,
                })
            }
            else{
                this.$q.notify({
                    messge: '더이상 추가할 수 없습니다',
                    type: 'warning',
                })
            }

            console.log(this.career);
            this.careerDate = "";
            this.careerName = "";
            this.careerNote = "";
        },

        //이미지 업로드
        uploadImg(files){
            files.forEach((data, index) => {
                this.createImg(index, data);
            });
        },  

        createImg(index, file){
            let reader = new FileReader();
            reader.onload = (e) => {
                const image = new Image();
                image.className = 'img-item';
                image.src = e.target.result;
                image.onload = imageEvent => {
                // 이미지가 로드가 되면! 리사이즈 함수가 실행되도록 합니다.
                    let re = this.resizeImage(image, 1024);
                    this.myImg = re;
                    console.log(this.myImg);
                    // const fileType = file.name.split('.').pop();
                    // console.log(fileType);
                    // console.log(file.name);
                    // const fileName = file.name.replaceAll(fileType, '').replace(/[`~!@#$%^&*()|+=?;:'",.<>\{\}\[\]\\\/ ]/gi,'');
                    // console.log(fileName);
                    // this.myImg = fileName+'.'+fileType ;
                    // console.log(this.myImg);    
                };
            };
            reader.readAsDataURL(file);
            console.log(this.myImg);
        },

        /**
     * Base64 image resize
     */
        resizeImage(orgImage, reSize) {
        // 최대 기준을 1280으로 잡음.
        let canvas = document.createElement("canvas");
        let max_size = reSize;
        let width = orgImage.width;
        let height = orgImage.height;
        if (width > height) {
            // 가로가 길 경우
            if (width > max_size) {
            height *= max_size / width;
            width = max_size;
            }
        } else {
            // 세로가 길 경우
            if (height > max_size) {
            width *= max_size / height;
            height = max_size;
            }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(orgImage, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        return dataUrl;
        },  

        //이미지 삭제
    },

    beforeCreate(){},
    created(){
        //뒤로가기 이벤트
        window.onpopstate = () => {};
        
        this.setTitle('이력서');
    },
    beforeMount(){},
    mounted(){},
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
.table tr td{
    border: 1px solid black;
}
</style>