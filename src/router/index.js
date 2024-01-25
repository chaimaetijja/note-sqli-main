import { createRouter, createWebHistory } from 'vue-router'
import NoteList from '../components/NoteList.vue'
import NoteEditor from '../components/NoteEditor.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NoteList // todo: make this in a home page that has a menu to navigate between sections
    },
    // todo: editor for saving new note
    {
      path: "/create",
      name: "create",
      component: NoteEditor,
      meta: {mode: 'create'}
    },
  ]
})

export default router
