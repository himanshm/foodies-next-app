import Image from 'next/image';
import styles from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';
import { title } from 'process';

interface Meal {
  title: string;
  slug: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const meal: Meal = getMeal(params.slug) as Meal;

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

function MealDetailsPage({ params }: { params: { slug: string } }) {
  const meal: Meal = getMeal(params.slug) as Meal;

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />');
  const { title, image, summary, creator, creator_email, instructions } = meal;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={image} alt={title} fill />
        </div>

        <div className={styles.headerText}>
          <h1>{title}</h1>
          <p className={styles.creator}>
            by <a href={`mailto:${creator_email}`}>{creator}</a>{' '}
          </p>
          <p className={styles.summary}>{summary}</p>
        </div>
      </header>
      <main>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{ __html: instructions }}
        ></p>
      </main>
    </>
  );
}

export default MealDetailsPage;
