/**
 * Mask sensitive data in an object.
 * @param data T extends object
 * @param sensitiveFields {string[]}
 * @returns T
 */
export const maskSensitiveData = <T>(
  data: T,
  sensitiveFields: string[] = ["password", "email", "name"]
): T => {
  if (typeof data !== "object" || !data) {
    return data;
  }

  const maskedData = JSON.stringify(data, (key, value) => {
    if (sensitiveFields.includes(key) && typeof value === "string") {
      return value.length > 3
        ? `${value.slice(0, 2)}***${value.slice(-1)}`
        : "***";
    }
    return value;
  });

  return JSON.parse(maskedData) as T;
};
