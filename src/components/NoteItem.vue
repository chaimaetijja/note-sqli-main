<script setup>
import { ref, defineProps } from 'vue';
import { useNotesStore } from '@/stores/notes';
import { useRouter } from 'vue-router';

const { note } = defineProps({
  note: {
    type: Object,
    required: true
  }
});

const store = useNotesStore();
const isEditing = ref(false);
 
function editNote() {
  isEditing.value = true;
}

function deleteNote() {
  store.deleteNoteById(note.id);
}


function saveNote() {
  store.editNote({
    id: note.id,
    updatedNote: {
      title: note.title,
      content: note.content
    }
  });

  isEditing.value = false;
}
</script>

<template>
  <div class="p-4 border rounded shadow-sm">
    <template v-if="!isEditing">
      <h3 class="text-lg font-semibold">{{ note.title }}</h3>
      <p class="text-gray-700">{{ note.content }}</p>
    </template>
    <template v-else>
      <input
        v-model="note.title"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <textarea
        v-model="note.content"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        rows="4"
      />
    </template>
    <div class="mt-4 flex space-x-2">
      <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" @click="editNote">Edit</button>
      <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" @click="deleteNote">Delete</button>
      <button v-if="isEditing" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" @click="saveNote">Save</button>
    </div>
  </div>
</template>

<style scoped>
</style>
