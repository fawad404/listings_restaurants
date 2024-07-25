export const fetchData = async () => {
    try {
      const res = await fetch("/api/temp", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await res.json();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


