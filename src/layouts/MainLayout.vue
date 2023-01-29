<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <!-- toolbar -->
      <q-toolbar class="flex items-center justify-center">
        <!-- menu btn -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <!-- toolbar title -->
        <q-toolbar-title class="text-h5 full-width text-center text-weight-bolder">
          Quasar Project
        </q-toolbar-title>

        <!-- setting btn -->
        <q-btn
        flat
        dense
        round
        icon="settings"
        @click="goToSetting"
      />
      </q-toolbar>
    </q-header>

    <!-- menu -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
        <section class="flex justify-around items-center">
          <q-avatar round><img src="https://cdn.quasar.dev/img/avatar.png" /></q-avatar>
          <div class="text-h5 ">Menu</div>
          <div>
            <q-btn flat disable/>
          </div>
        </section>
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <!-- main -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import {mapGetters, mapMutations, mapActions} from 'vuex';

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default {
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  computed:{
    ...mapGetters([]),
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  methods:{
    ...mapMutations([
      'setLayout',
      'setTitle',
    ]),
    ...mapActions([]),

    //설정페이지 이동
    goToSetting(){
      this.$router.push({name:'setting', params: {title: '설정'}});
    },
  },
  beforeCreate(){},
  created(){
    //뒤로가기 이벤트
    window.onpopstate = () => {};
  },
  beforeMount(){
    this.setLayout(this);
  },
  mounted(){},
  beforeUpdate(){},
  updated(){},
  beforeDestroy(){},
  destroyed(){},
}
</script>
