import { PropertyFormSchema, PropertySchema } from "@/store/properties";

const validFormData = {
  name: "Oxygen Residence",
  image: "/photo.jpg",
  address: "Piata Abator, Nr 1",
  city: "Cluj-Napoca",
  postalCode: "400001",
  rent: 800,
  currency: "EUR" as const,
  status: "Occupied" as const,
  tenants: [],
};

const expectValidForm = (data: any) => {
  const result = PropertyFormSchema.safeParse(data);
  expect(result.success).toBe(true);
};

const expectInvalidForm = (data: any, field?: keyof typeof validFormData) => {
  const result = PropertyFormSchema.safeParse(data);
  expect(result.success).toBe(false);

  if (!result.success && field) {
    const hasFieldError = result.error.issues.some(
      (issue) => issue.path[0] === field,
    );
    expect(hasFieldError).toBe(true);
  }
};

describe("PropertyFormSchema validation", () => {
  test("accepts valid data", () => expectValidForm(validFormData));

  test("rejects empty name", () =>
    expectInvalidForm({ ...validFormData, name: "" }, "name"));

  test("rejects empty address", () =>
    expectInvalidForm({ ...validFormData, address: "" }, "address"));

  test("rejects empty city", () =>
    expectInvalidForm({ ...validFormData, city: "" }, "city"));

  test("rejects rent of 0", () =>
    expectInvalidForm({ ...validFormData, rent: 0 }, "rent"));

  test("rejects negative rent", () =>
    expectInvalidForm({ ...validFormData, rent: -100 }, "rent"));

  test("rejects invalid currency", () =>
    expectInvalidForm({ ...validFormData, currency: "RON" }));

  test("rejects invalid status", () =>
    expectInvalidForm({ ...validFormData, status: "Rented" }));
});

describe("PropertySchema validation", () => {
  const baseData = {
    id: 1,
    name: "Test",
    address: "Addr",
    city: "Cluj-Napoca",
    postalCode: "400000",
    rent: 100,
    currency: "EUR" as const,
    status: "Vacant" as const,
    tenants: [] as any[],
    dateAdded: "today",
    lastUpdated: "today",
  };

  test("accepts undefined image", () => {
    const result = PropertySchema.safeParse(baseData);
    expect(result.success).toBe(true);
  });

  test("accepts empty string image", () => {
    const result = PropertySchema.safeParse({ ...baseData, image: "" });
    expect(result.success).toBe(true);
  });

  test("accepts non-empty image string", () => {
    const result = PropertySchema.safeParse({ ...baseData, image: "/img.jpg" });
    expect(result.success).toBe(true);
  });
});
