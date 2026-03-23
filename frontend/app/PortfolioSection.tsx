type Property = {
  id: number;
  name: string;
  address?: string;
  units: string;
  status: "Active" | "Vacant";
  image: string;
};

const PROPERTIES: Property[] = [
  {
    id: 1,
    name: "Oxygen Residence",
    address: "Piața Abator 1",
    units: "3 units",
    status: "Active",
    image: "/properties/photo1.jpg",
  },
  {
    id: 2,
    name: "The Nest",
    address: "Scorțarilor 12",
    units: "2 units",
    status: "Active",
    image: "/properties/photo2.jpg",
  },
  {
    id: 3,
    name: "Argeș 12",
    units: "1 unit",
    status: "Vacant",
    image: "/properties/photo3.jpg",
  },
  {
    id: 4,
    name: "Piața Mihai Viteazu 11-13",
    units: "4 units",
    status: "Active",
    image: "/properties/photo4.jpg",
  },
  {
    id: 5,
    name: "Dâmboviței 12-18",
    units: "2 units",
    status: "Active",
    image: "/properties/photo5.jpg",
  },
  {
    id: 6,
    name: "Mărășești 49",
    units: "1 unit",
    status: "Vacant",
    image: "/properties/photo6.jpg",
  },
];

function PropertyCard({
  property,
  short,
}: {
  property: Property;
  short?: boolean;
}) {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden shadow-lg ${short ? "h-48" : "h-64"}`}
    >
      <img
        src={property.image}
        alt={property.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute top-3 right-3 bg-black/25 backdrop-blur-sm px-3 py-1 rounded-full">
        <span className="text-xs font-semibold text-white">
          {property.units}
        </span>
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
        <div>
          <p className="text-sm font-bold text-white">{property.name}</p>
          {property.address && (
            <p className="text-xs text-white/90">{property.address}</p>
          )}
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            property.status === "Active" ? "bg-green-dark" : "bg-white/20"
          }`}
        >
          {property.status}
        </span>
      </div>
    </div>
  );
}

export function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-cream-warm py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-brown-mid tracking-widest uppercase mb-4">
            Your Portfolio
          </p>
          <h2 className="text-4xl font-extrabold text-brown-dark">
            All your properties, in one place.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROPERTIES.map((p, i) => (
            <PropertyCard key={p.id} property={p} short={i >= 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
