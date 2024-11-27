export const getTokenClient = async () => {
  const req = await fetch("/api/token?getType=token", { cache: "no-cache" });
  const result = await req.json();

  return result.token;
};
