import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${
  import.meta.env.VITE_NOTEHUB_TOKEN
}`;

interface NotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
}

interface NewNote {
  title: string;
  content?: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  searchNoteName: string,
  page: number,
  perPage: number
): Promise<NotesResponse> => {
  const res = await axios.get<NotesResponse>('/notes', {
    params: {
      search: searchNoteName,
      page,
      perPage,
    },
  });
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const createNote = async (newNoteParams: NewNote): Promise<Note> => {
  const res = await axios.post<Note>('/notes', newNoteParams);
  return res.data;
};
