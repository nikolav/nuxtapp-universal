export const status = async () => {
  return {
    time: new Date().toISOString(),
    status: "ok:Q",
  };
};
