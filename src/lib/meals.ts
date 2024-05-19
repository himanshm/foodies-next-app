import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

interface Meal {
  title: string;
  slug?: string;
  image: File;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare('SELECT * FROM meals').all(); // Doesn't normally produce a promise
}

export function getMeal(slug: string) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal: Meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  // const extension = path.extname(meal.image.name);
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substring(2, 6);
  const guid = `${timestamp}${randomString}`.substring(0, 10);
  const fileName = `${meal.slug}-${guid}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);

  // Convert File to arrayBuffer and then to Buffer
  const bufferedImage = await meal.image.arrayBuffer();
  const buffer = Buffer.from(bufferedImage);

  stream.write(buffer, (error) => {
    if (error) {
      throw new Error('Saving image failed!');
    }
  });

  const imageFileName = `/images/${fileName}`;

  const stmt = db.prepare(`
  INSERT INTO meals
  (title, summary, instructions, creator, creator_email, image, slug)
  VALUES 
  (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `);

  stmt.run({
    title: meal.title,
    summary: meal.summary,
    instructions: meal.instructions,
    creator: meal.creator,
    creator_email: meal.creator_email,
    image: imageFileName,
    slug: meal.slug,
  });
}
