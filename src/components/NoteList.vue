<script setup>
import { computed } from 'vue'
import NoteItem from './NoteItem.vue'
import { useNotesStore } from '@/stores/notes'
import { useRouter } from 'vue-router';

const store = useNotesStore()
store.fetchNotes()
const notes = computed(() => store.notes)
const router = useRouter();


function goToCreatePage(){
  router.push({name: 'create'})
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div>
    <button @click="goToCreatePage" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-green-600 mb-4">
      Create New Note
    </button>
  </div>
  <div>
    <NoteItem class="space-y-4" v-for="note in notes" :key="note.id" :note="note" />
  </div>
  </div>
 
</template>

<style scoped></style>
