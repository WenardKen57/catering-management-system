import { useEffect, useState } from "react";
import { getPackages } from "../../services/packageService";
import PackageCard from "../../components/packages/PackageCard";

export default function Packages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const data = await getPackages();
      setPackages(data);
    };

    fetchPackages();
  }, []);

  return (
    <div>
      <h2>Packages</h2>

      {packages.map((pkg) => (
        <PackageCard key={pkg._id} pkg={pkg} />
      ))}
    </div>
  );
}
