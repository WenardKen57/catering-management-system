import { useEffect, useState } from "react";
import { getPackages } from "../../services/packageService";
import PackageCard from "../../components/packages/PackageCard";
import styles from "./PackagesPage.module.css";

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const { data } = await getPackages();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPackages();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading gourmet options...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Our Catering Packages</h1>
      <div className={styles.grid}>
        {packages.map((pkg) => (
          <PackageCard key={pkg._id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
