import { BeatLoader } from 'react-spinners';

export default function Loader() {
  return (
    <BeatLoader
      cssOverride={{
        textAlign: 'center',
      }}
      color="#0b5ed7"
      size={10}
    />
  );
}
