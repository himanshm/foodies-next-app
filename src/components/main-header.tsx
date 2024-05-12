import Image from 'next/image';
import Link from 'next/link';
import styles from './main-header.module.css';

import logoImg from '@/assets/logo.png';

function MainHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href='/'>
        <Image src={logoImg} alt='A plate with food on it' priority />
        NextLevel Food
      </Link>

      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href='/meals'>Browse Meals</Link>
          </li>{' '}
          <li>
            <Link href='/community'>Foodies Community</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
