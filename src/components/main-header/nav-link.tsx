'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './nav-link.module.css';

type NavLinkProps = {
  href: string;
  children: string;
};

function NavLink({ href, children }: NavLinkProps) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={
        path.startsWith(href) ? `${styles.link} ${styles.active}` : styles.link
      }
    >
      {children}
    </Link>
  );
}

export default NavLink;
