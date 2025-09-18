export default async function fetchData(URL) {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data = await response.json();
    return { success: true, data: data };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}
