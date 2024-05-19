'use client'; // Error components must be Client Components

function MealsPageError({ error }: { error: Error }) {
  return (
    <main className='error'>
      <h1>An Error occured: {error.message}</h1>
      <p>Failed to create meal!</p>
    </main>
  );
}

export default MealsPageError;
