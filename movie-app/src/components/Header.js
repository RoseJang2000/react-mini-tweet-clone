import styles from './Header.module.css';

const Header = () => {
  return (
    <header>
      <div className={styles.header}>
        <span>Movies</span>
      </div>
    </header>
  );
};

export default Header;
