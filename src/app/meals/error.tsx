'use client'; // Error components must be Client Components

function MealsPageError({ error }: { error: Error }) {
  return (
    <main className='error'>
      <h1>An Error occured: {error.message}</h1>
      <p>Failed to fetch meals data. Please try again later!</p>
    </main>
  );
}

export default MealsPageError;
