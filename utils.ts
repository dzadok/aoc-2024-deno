export async function getInput(
  path: string,
  test?: string[],
): Promise<string[]> {
  if (path && !test) {
    const decoder = new TextDecoder("utf-8");
    const text = decoder.decode(await Deno.readFile(path));
    return text.split("\n").slice(0, -1);
  }
  if (test) {
    return test;
  }
  return [];
}

export async function getSingleLineInput(
  path: string,
  test?: string,
): Promise<string> {
  if (path && !test) {
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(await Deno.readFile(path));
  }
  if (test) return test;
  return "";
}
