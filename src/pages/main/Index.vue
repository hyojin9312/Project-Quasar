<template>
  <q-page class="full-width bg-grey-2">
    <section>
      <q-img class="full-width fixed-bottom" src="5974148.jpg" />
    </section>
    <section class="full-width q-pa-md ">
      <div class="full-width q-pt-md">
        <q-card class="cardRounded q-pa-md" v-ripple @click="goToPage(1)">
          <div class="full-width flex items-center">
            <q-icon name="text_snippet" size="md"/>
            <div class="text-M text-weight-bolder">내 서류함</div>
          </div>
          <div>(각종 서류를 볼 수 있습니다.)</div>
        </q-card>

        <q-card class="cardRounded q-pa-md q-my-md" v-ripple @click="stanby('곧 출시될 예정입니다.')">
          <div class="full-width flex items-center">
            <q-icon name="person" size="md"/>
            <div class="text-M text-weight-bolder">서비스 가입</div>
          </div>
          <div>(서비스 가입 안내)</div>
        </q-card>

        <q-card class="cardRounded q-pa-md" v-ripple @click="stanby('곧 출시될 예정입니다.')">
          <div class="full-width flex items-center">
            <q-icon name="shopping_bag" size="md"/>
            <div class="text-M text-weight-bolder">내 사용내역</div>
          </div>
          <div>(결제내역을 볼 수 있습니다.)</div>
        </q-card>

        <q-card class="cardRounded q-pa-md q-my-md" v-ripple @click="goToPage(2)">
          <div class="full-width flex items-center">
            <q-icon name="tv" size="md"/>
            <div class="text-M text-weight-bolder q-pl-xs">TV</div>
          </div>
          <div>(관련 영상을 볼 수 있습니다.)</div>
        </q-card>
      </div>
    </section>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'PageIndex',
  computed:{
    ...mapGetters([
      'getLayout',
    ]),
  },
  data(){
    return{}
  },
  methods:{
    ...mapMutations([]),
    ...mapActions([]),

    //페이지 이동
    goToPage(type){
      switch(type){
        case 1:
          this.$router.push({name: 'file', params: {title : '내 서류함'}});
          break;
        case 2:
        this.$router.push({name: 'tv', params: {title : 'TV'}});
          break;  
      }
    },

    //준비중
    stanby(msg){
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
  created(){},
  beforeMount(){
    console.log(this.getLayout);
  },
  mounted(){},
  beforeUpdate(){},
  updated(){},
  beforeDestroy(){},
  destroyed(){},
}
</script>
