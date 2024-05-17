import Link from 'next/link';
import { Suspense } from 'react';

import styles from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '../../lib/meals';

interface Meal {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
}

async function Meals() {
  const meals: Meal[] = (await getMeals()) as Meal[];

  return <MealsGrid meals={meals} />;
}

function MealsPage() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={styles.highlight}>by you.</span>
        </h1>
        <p>
          Choose your favourite recipe and cook it yourself. It is easy and fun.
        </p>
        <p className={styles.cta}>
          <Link href='/meals/share'>Share your Favourite Recipe.</Link>
        </p>
      </header>
      <main className={styles.main}>
        <Suspense
          fallback={<p className={styles.loading}>Fetching Meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}

export default MealsPage;
