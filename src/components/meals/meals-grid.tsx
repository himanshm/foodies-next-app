import MealItem from './meal-item';
import styles from './meals-grid.module.css';

interface Meal {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
}

type MealsGridProps = {
  meals: Meal[];
};

function MealsGrid({ meals }: MealsGridProps) {
  return (
    <ul className={styles.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}

export default MealsGrid;
