const formatError = (error) => {
  if (error.isAxiosError) {
    const message =
      error.response?.data?.ErrorMessage?.[0]?.message || error.message;
    const status = error.response?.status || 500;
    const details = error.response?.data || {};

    return {
      message,
      status,
      details,
    };
  }

  return {
    message: error.message || "An unexpected error occurred.",
    status: 500,
    details: error,
  };
};

export default formatError;
