import { useMoveBack } from '../hooks/useMoveBack';
import Heading from '../ui/Heading';

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 p-12">
      <div className="bg-gray-0 flex shrink-0 grow basis-7xl rounded-lg border border-gray-100 p-1.5 text-center">
        <Heading level="h1">
          The page you are looking for could not be found 😢
        </Heading>
        <button onClick={moveBack} size="large">
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
