/**
 * Work Grid Filter Tests
 * Ensures filter functionality works correctly, especially the "All" category
 */

import { describe, it, expect } from "@jest/globals";

// Mock work items for testing
const mockWorkItems = [
  {
    id: "ai-project",
    category: "AI" as const,
    featured: true,
    title: "AI Project",
  },
  {
    id: "systems-project",
    category: "Systems" as const,
    featured: false,
    title: "Systems Project",
  },
  {
    id: "mobile-project",
    category: "Mobile" as const,
    featured: false,
    title: "Mobile Project",
  },
  {
    id: "music-project",
    category: "MusicTech" as const,
    featured: true,
    title: "Music Project",
  },
];

// Filter logic extracted for testing
function filterWorkItems(
  items: typeof mockWorkItems,
  category: string
): typeof mockWorkItems {
  const filtered =
    category === "All"
      ? [...items]
      : items.filter((item) => item.category === category);

  // Sort by featured first, maintains deterministic order
  return filtered.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
}

describe("Work Grid Filters", () => {
  it('should return all items when "All" is selected', () => {
    const result = filterWorkItems(mockWorkItems, "All");
    expect(result).toHaveLength(4);
    expect(result.map((item) => item.id)).toEqual([
      "ai-project",
      "music-project",
      "systems-project",
      "mobile-project",
    ]);
  });

  it("should filter by AI category", () => {
    const result = filterWorkItems(mockWorkItems, "AI");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("ai-project");
  });

  it("should filter by Systems category", () => {
    const result = filterWorkItems(mockWorkItems, "Systems");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("systems-project");
  });

  it("should filter by Mobile category", () => {
    const result = filterWorkItems(mockWorkItems, "Mobile");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("mobile-project");
  });

  it("should filter by MusicTech category", () => {
    const result = filterWorkItems(mockWorkItems, "MusicTech");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("music-project");
  });

  it("should return empty array for non-existent category", () => {
    const result = filterWorkItems(mockWorkItems, "NonExistent");
    expect(result).toHaveLength(0);
  });

  it("should sort featured items first", () => {
    const result = filterWorkItems(mockWorkItems, "All");
    expect(result[0].featured).toBe(true);
    expect(result[1].featured).toBe(true);
    expect(result[2].featured).toBe(false);
    expect(result[3].featured).toBe(false);
  });

  it("should maintain deterministic order when switching from filtered to All", () => {
    // First filter by AI
    const aiFiltered = filterWorkItems(mockWorkItems, "AI");
    expect(aiFiltered).toHaveLength(1);

    // Then switch to All - should return full list sorted by featured
    const allItems = filterWorkItems(mockWorkItems, "All");
    expect(allItems).toHaveLength(4);
    expect(allItems[0].featured).toBe(true);
  });

  it("should create a new array reference when filtering", () => {
    const result1 = filterWorkItems(mockWorkItems, "All");
    const result2 = filterWorkItems(mockWorkItems, "All");

    // Should be different references (new arrays)
    expect(result1).not.toBe(result2);

    // But same content
    expect(result1).toEqual(result2);
  });
});
