interface AnimalEntry {
  meta: { uuid: string };
  fields: { image: { url: string } };
}

export const fetchAnimalImages = async (): Promise<
  { id: string; url: string }[]
> => {
  try {
    const response = await fetch(
      "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20"
    );
    if (!response.ok) throw new Error("Error fetching images");

    const data: { entries: AnimalEntry[] } = await response.json();

    const images = data.entries.map((entry) => ({
      id: entry.meta.uuid,
      url: entry.fields.image.url,
    }));

    return images;
  } catch (error) {
    console.error("Error fetching animal images:", error);
    return [];
  }
};
