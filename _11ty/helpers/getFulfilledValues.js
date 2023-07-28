module.exports = async (promises) => {
  try {
    const results = await Promise.allSettled(promises);
    return results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);
  } catch (error) {
    console.error("Error occurred:", error);
    return [];
  }
};
