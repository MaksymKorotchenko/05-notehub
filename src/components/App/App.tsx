import css from './App.module.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import NoteList from '../NoteList/NoteList';
import { fetchNotes } from '../../services/noteService';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import SearchBox from '../SearchBox/SearchBox';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function App() {
  const [searchNote, setSearchNote] = useState('');
  const debouncedSearchNote = useDebouncedCallback(setSearchNote, 1000);
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', searchNote, page],
    queryFn: () => fetchNotes(searchNote, page, 12),
    placeholderData: keepPreviousData,
  });

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox text={searchNote} onSearch={debouncedSearchNote} />
          {isSuccess && data?.totalPages > 1 && (
            <Pagination
              totalPages={data?.totalPages || 0}
              currentPage={page}
              onClick={({ selected }) => setPage(selected + 1)}
            />
          )}
          <button className={css.button} onClick={handleOpenModal}>
            Create note +
          </button>
        </header>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {data && !isLoading && !isError && <NoteList notes={data.notes} />}
        {isOpen && (
          <Modal onClose={handleCloseModal}>
            <NoteForm
              onCancel={handleCloseModal}
              onSubmit={handleCloseModal}
            ></NoteForm>
          </Modal>
        )}
      </div>
    </>
  );
}
