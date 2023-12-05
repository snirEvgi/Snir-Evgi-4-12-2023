import { ProgressSpinner } from 'primereact/progressspinner';

const Loader = () => {
  return (
    <div className="relative flex z-[1000] justify-center items-center h-screen">
      <ProgressSpinner />
    </div>
  );
};

export default Loader;