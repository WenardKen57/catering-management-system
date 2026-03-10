export default function PackageCard({ pkg }) {
  return (
    <div>
      <h3>{pkg.name}</h3>
      <p>Price: {pkg.price}</p>
      <p>Pax: {pkg.pax}</p>
    </div>
  );
}
