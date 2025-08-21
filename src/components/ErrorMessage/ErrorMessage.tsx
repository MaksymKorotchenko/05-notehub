import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <strong className={css.text}>
      Sorry, an error occured while fetching data!
    </strong>
  );
}
