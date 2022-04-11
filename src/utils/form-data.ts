const appendToFormData = (fd: FormData, attrs: object) => {
  for (const key in attrs) {
    fd.append(key, attrs[key as keyof object]);
  }
};

export default appendToFormData;
