<template>
  <q-page class="flex flex-center">
    <section class="full-width">
      <div class="flex justify-around">
        <q-card style="">
          <q-card-section>
            dddd
          </q-card-section>
        </q-card>
        <q-card>
          <q-card-section>
            ffff
          </q-card-section>
        </q-card>
        <q-card>
          <q-card-section>
            fff
          </q-card-section>
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
