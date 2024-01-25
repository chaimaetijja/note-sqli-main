<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNotesStore } from '@/stores/notes';

const store = useNotesStore();
const route = useRoute();
const router = useRouter();
const note = ref({
  title: '',
  content: ''
});

async function submitNote() {
  if (route.meta.mode === 'create') {
    await store.createNote({
      title: note.value.title,
      content: note.value.content
    });
    
    note.value.title = '';
    note.value.content = '';

    router.push({ name: 'home' });
    
  } else if (route.meta.mode === 'edit') {
    await store.editNote({
      id: route.params.id,
      updatedNote: {
        title: note.value.title,
        content: note.value.content
      }
    });
  }
}
</script>

<template>
  <div class="p-4 border rounded shadow-lg">
    <form @submit.prevent="submitNote">
      <div class="mb-4">
        <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input
          id="title"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="note.title"
        />
      </div>
      <div class="mb-4">
        <label for="content" class="block text-gray-700 text-sm font-bold mb-2">Content</label>
        <textarea
          id="content"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="note.content"
          rows="4"
        />
      </div>
      <button class="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600" @click="submitNote">
        Save
      </button>
    </form>
  </div>
</template>

<style scoped></style>
