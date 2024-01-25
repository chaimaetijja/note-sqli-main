import { defineStore } from 'pinia';
import axios from 'axios';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: []
  }),
  getters: {
    getNoteById: (state) => (id) => {
      return state.notes.find((note) => note.id === id);
    }
  },
  actions: {
    async fetchNotes() {
      try {
        const response = await axios.get('http://localhost:3000/notes');
        this.notes = response.data;
      } catch (error) {
        console.error('ERROR Fetching Notes:', error.message);
        console.error('Error response data:', error.response ? error.response.data : null);
      }
    },
    async createNote(newNote) {
      try {
        const response = await axios.post('http://localhost:3000/notes', newNote);
        this.notes.push(response.data);
      } catch (error) {
        console.error('ERROR Creating Note:', error.message);
        console.error('Error response data:', error.response ? error.response.data : null);
      }
    },    
    async editNote({ id, updatedNote }) {
      try {
        const response = await axios.put(`http://localhost:3000/notes/${id}`, updatedNote);
        this.notes = this.notes.map((note) => (note.id === id ? response.data : note));
      } catch (error) {
        console.error('ERROR Editing Note:', error.message);
        console.error('Error response data:', error.response ? error.response.data : null);
      }
    },
    async deleteNoteById(id) {
      try {
        await axios.delete(`http://localhost:3000/notes/${id}`);
        this.notes = this.notes.filter((note) => note.id !== id);
      } catch (error) {
        console.error('ERROR Deleting Note:', error.message);
        console.error('Error response data:', error.response ? error.response.data : null);
      }
    }
  }
});
