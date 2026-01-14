type DeleteResult = { id: string | number };

export const postOperation = async (result: DeleteResult): Promise<{ id: string }> => {
  return { id: String(result.id) };
};
