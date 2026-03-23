import { create } from "zustand";
import { z } from "zod";

export const TenantSchema = z.object({
  initials: z.string().min(1).max(3),
  bgColor: z.string(),
  textColor: z.string(),
});

export const PropertySchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  image: z.string().optional().or(z.literal("")),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  rent: z.number().min(1, "Rent must be greater than 0"),
  currency: z.enum(["EUR", "USD", "GBP"]),
  status: z.enum(["Occupied", "Vacant"]),
  tenants: z.array(TenantSchema),
  dateAdded: z.string(),
  lastUpdated: z.string(),
});

export const PropertyFormSchema = PropertySchema.omit({
  id: true,
  dateAdded: true,
  lastUpdated: true,
});

export type Tenant = z.infer<typeof TenantSchema>;
export type Property = z.infer<typeof PropertySchema>;
export type PropertyFormData = z.infer<typeof PropertyFormSchema>;

const today = () =>
  new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const SEED_PROPERTIES: Property[] = [
  {
    id: 1,
    name: "Oxygen Residence",
    image: "/properties/photo1.jpg",
    address: "Piata Abator, Nr 1, Ap. 20",
    city: "Cluj-Napoca",
    postalCode: "400001",
    rent: 800,
    currency: "EUR",
    status: "Occupied",
    tenants: [
      {
        initials: "AM",
        bgColor: "bg-orange-100",
        textColor: "text-orange-700",
      },
      { initials: "DT", bgColor: "bg-amber-100", textColor: "text-amber-700" },
    ],
    dateAdded: "12 March 2025",
    lastUpdated: "2 January 2026",
  },
  {
    id: 2,
    name: "Oxygen Residence",
    image: "/properties/photo1.jpg",
    address: "Piata Abator, Nr 1, Ap. 56",
    city: "Cluj-Napoca",
    postalCode: "400001",
    rent: 600,
    currency: "EUR",
    status: "Occupied",
    tenants: [
      { initials: "DT", bgColor: "bg-amber-100", textColor: "text-amber-700" },
    ],
    dateAdded: "3 April 2025",
    lastUpdated: "3 April 2025",
  },
  {
    id: 3,
    name: "Oxygen Residence",
    image: "/properties/photo1.jpg",
    address: "Piata Abator, Nr 1, Ap. 127",
    city: "Cluj-Napoca",
    postalCode: "400001",
    rent: 1500,
    currency: "EUR",
    status: "Occupied",
    tenants: [
      { initials: "PB", bgColor: "bg-rose-100", textColor: "text-rose-700" },
      {
        initials: "GC",
        bgColor: "bg-orange-100",
        textColor: "text-orange-700",
      },
    ],
    dateAdded: "1 May 2025",
    lastUpdated: "1 May 2025",
  },
  {
    id: 4,
    name: "Piata Viteazu",
    image: "/properties/photo4.jpg",
    address: "Piata Mihai Viteazu, Nr 11-13, Ap. 1",
    city: "Cluj-Napoca",
    postalCode: "400110",
    rent: 500,
    currency: "EUR",
    status: "Occupied",
    tenants: [
      {
        initials: "LT",
        bgColor: "bg-orange-100",
        textColor: "text-orange-700",
      },
    ],
    dateAdded: "10 June 2025",
    lastUpdated: "10 June 2025",
  },
  {
    id: 5,
    name: "Piata Viteazu",
    image: "/properties/photo4.jpg",
    address: "Piata Mihai Viteazu, Nr 11-13, Ap. 10",
    city: "Cluj-Napoca",
    postalCode: "400110",
    rent: 400,
    currency: "EUR",
    status: "Occupied",
    tenants: [
      { initials: "JK", bgColor: "bg-rose-100", textColor: "text-rose-700" },
      {
        initials: "BB",
        bgColor: "bg-orange-100",
        textColor: "text-orange-700",
      },
    ],
    dateAdded: "10 June 2025",
    lastUpdated: "10 June 2025",
  },
  {
    id: 6,
    name: "Piata Viteazu",
    image: "/properties/photo4.jpg",
    address: "Piata Mihai Viteazu, Nr 11-13, Ap. 22",
    city: "Cluj-Napoca",
    postalCode: "400110",
    rent: 700,
    currency: "EUR",
    status: "Vacant",
    tenants: [],
    dateAdded: "15 July 2025",
    lastUpdated: "15 July 2025",
  },
  {
    id: 7,
    name: "Piata Viteazu",
    image: "/properties/photo4.jpg",
    address: "Piata Mihai Viteazu, Nr 11-13, Ap. 40",
    city: "Cluj-Napoca",
    postalCode: "400110",
    rent: 800,
    currency: "EUR",
    status: "Occupied",
    tenants: [
      { initials: "HM", bgColor: "bg-rose-100", textColor: "text-rose-700" },
      {
        initials: "BE",
        bgColor: "bg-orange-100",
        textColor: "text-orange-700",
      },
      { initials: "LG", bgColor: "bg-rose-100", textColor: "text-rose-700" },
      {
        initials: "JB",
        bgColor: "bg-orange-100",
        textColor: "text-orange-700",
      },
    ],
    dateAdded: "20 August 2025",
    lastUpdated: "20 August 2025",
  },
  {
    id: 8,
    name: "The Nest",
    image: "/properties/photo2.jpg",
    address: "Strada Scorarilor, Nr 12, Ap. 30",
    city: "Cluj-Napoca",
    postalCode: "400200",
    rent: 700,
    currency: "EUR",
    status: "Vacant",
    tenants: [],
    dateAdded: "1 September 2025",
    lastUpdated: "1 September 2025",
  },
];

type PropertyStore = {
  properties: Property[];
  addProperty: (data: PropertyFormData) => void;
  updateProperty: (id: number, data: PropertyFormData) => void;
  deleteProperty: (id: number) => void;
  getPropertyById: (id: number) => Property | undefined;
};

export const usePropertyStore = create<PropertyStore>((set, get) => ({
  properties: SEED_PROPERTIES,

  addProperty: (data) => {
    const newId = Math.max(0, ...get().properties.map((p) => p.id)) + 1;
    const newProperty: Property = {
      ...data,
      id: newId,
      dateAdded: today(),
      lastUpdated: today(),
    };
    set((state) => ({ properties: [...state.properties, newProperty] }));
  },

  updateProperty: (id, data) => {
    set((state) => ({
      properties: state.properties.map((property) =>
        property.id === id
          ? { ...property, ...data, lastUpdated: today() }
          : property,
      ),
    }));
  },

  deleteProperty: (id) => {
    set((state) => ({
      properties: state.properties.filter((property) => property.id !== id),
    }));
  },

  getPropertyById: (id) => {
    return get().properties.find((property) => property.id === id);
  },
}));
