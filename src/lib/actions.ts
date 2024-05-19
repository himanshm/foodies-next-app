'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';

export async function shareMeal(formData: FormData) {
  const meal = {
    title: formData.get('title') as string,
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
    image: formData.get('image') as File,
    creator: formData.get('name') as string,
    creator_email: formData.get('email') as string,
  };

  if (
    !meal.title ||
    !meal.summary ||
    !meal.instructions ||
    !meal.image ||
    !meal.creator ||
    !meal.creator_email
  ) {
    throw new Error('Missing required fields');
  }

  await saveMeal(meal);
  redirect('/meals');
}
