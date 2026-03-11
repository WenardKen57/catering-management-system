import styles from "./PackageCard.module.css";

export default function PackageCard({ pkg }) {
  const menuItems = pkg.menu || pkg.items || [];

  return (
    <div className={styles.card}>
      <h2>{pkg.name}</h2>
      <p className={styles.price}>Price: ₱{pkg.price.toLocaleString()}</p>

      <div className={styles.section}>
        <h4>Menu</h4>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {pkg.services?.length > 0 && (
        <div className={styles.section}>
          <h4>Included Services</h4>
          <ul>
            {pkg.services.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
