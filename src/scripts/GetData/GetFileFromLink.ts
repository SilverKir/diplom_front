

export const GetFileFromLink = async (link: string) => {

  try {
    const blob = await (await fetch(link)).blob();
    const file = new File([blob], link.replace(/^.*\//g, ""), {
      type: blob.type,
    });
    return file;
  } catch (e) {
    throw new Error((e as Error).message);    
  }
};
