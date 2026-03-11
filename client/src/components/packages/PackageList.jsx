import React, { useEffect, useState } from "react";
import { getPackages, deletePackage } from "../services/packageService";

const PackageList = ({ isAdmin }) => {
  const [packages, setPackages] = useState([]);

  const loadPackages = async () => {
    try {
      const res = await getPackages();
      setPackages(res.data);
    } catch (err) {
      console.error("Failed to fetch packages", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?"))
      return;
    try {
      await deletePackage(id);
      setPackages(packages.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  return (
    <div>
      <h2>Packages</h2>
      {packages.map((pkg) => (
        <div
          key={pkg._id}
          style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}
        >
          <h3>{pkg.name}</h3>
          {pkg.description && <p>{pkg.description}</p>}
          <p>Price: ${pkg.price}</p>
          {pkg.menu.length > 0 && (
            <div>
              <strong>Menu:</strong>
              <ul>
                {pkg.menu.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {pkg.services.length > 0 && (
            <div>
              <strong>Services:</strong>
              <ul>
                {pkg.services.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
          {pkg.addons.length > 0 && (
            <div>
              <strong>Addons:</strong>
              <ul>
                {pkg.addons.map((a) => (
                  <li key={a._id}>
                    {a.name} (${a.price})
                  </li>
                ))}
              </ul>
            </div>
          )}
          {isAdmin && (
            <div style={{ marginTop: 10 }}>
              <button onClick={() => handleDelete(pkg._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PackageList;
