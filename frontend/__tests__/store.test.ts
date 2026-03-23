import { usePropertyStore } from "@/store/properties";
import { act } from "@testing-library/react";

const initialState = usePropertyStore.getState();

beforeEach(() => {
  usePropertyStore.setState(initialState, true);
});

const sampleProperty = {
  name: "Test Property",
  image: "/test.jpg",
  address: "Str. Test, Nr. 1",
  city: "Cluj-Napoca",
  postalCode: "400001",
  rent: 500,
  currency: "EUR" as const,
  status: "Vacant" as const,
  tenants: [],
};

describe("Property Store", () => {
  test("starts with seed properties after reset", () => {
    const { properties } = usePropertyStore.getState();
    expect(properties).toHaveLength(8);
  });

  test("addProperty adds a property with id and dates", () => {
    act(() => {
      usePropertyStore.getState().addProperty(sampleProperty);
    });

    const { properties } = usePropertyStore.getState();

    expect(properties).toHaveLength(9);
    const added = properties[8];

    expect(added.id).toBeDefined();
    expect(added.dateAdded).toBeDefined();
    expect(added.lastUpdated).toBeDefined();
    expect(added.name).toBe("Test Property");
  });

  test("addProperty increments id correctly", () => {
    act(() => {
      usePropertyStore.getState().addProperty(sampleProperty);
      usePropertyStore
        .getState()
        .addProperty({ ...sampleProperty, name: "Second" });
    });

    const { properties } = usePropertyStore.getState();

    const last = properties[properties.length - 1];
    const secondLast = properties[properties.length - 2];

    expect(last.id).toBe(secondLast.id + 1);
  });

  test("deleteProperty removes the correct property", () => {
    const { properties, deleteProperty } = usePropertyStore.getState();
    const idToDelete = properties[0].id;

    act(() => {
      deleteProperty(idToDelete);
    });

    const updated = usePropertyStore.getState().properties;

    expect(updated).toHaveLength(7);
    expect(updated.find((p) => p.id === idToDelete)).toBeUndefined();
  });

  test("updateProperty updates only the targeted property", () => {
    const { properties, updateProperty } = usePropertyStore.getState();
    const id = properties[0].id;

    act(() => {
      updateProperty(id, {
        ...sampleProperty,
        rent: 999,
        status: "Occupied",
      });
    });

    const updated = usePropertyStore.getState().properties;

    expect(updated[0].rent).toBe(999);
    expect(updated[0].status).toBe("Occupied");

    for (let i = 1; i < updated.length; i++) {
      expect(updated[i]).toEqual(properties[i]);
    }
  });

  test("updateProperty does nothing for non-existing id", () => {
    const { properties, updateProperty } = usePropertyStore.getState();
    const original = [...properties];

    act(() => {
      updateProperty(9999, sampleProperty);
    });

    const updated = usePropertyStore.getState().properties;

    expect(updated).toEqual(original);
  });

  test("getPropertyById works correctly", () => {
    const { properties, getPropertyById } = usePropertyStore.getState();

    const id = properties[0].id;

    const found = getPropertyById(id);
    const notFound = getPropertyById(9999);

    expect(found).toBeDefined();
    expect(found?.id).toBe(id);
    expect(notFound).toBeUndefined();
  });
});
