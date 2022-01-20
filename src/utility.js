export default (text, title, roleName, companyName) => {
  let withInfo = "";
  if (text) {
    withInfo = text
      .replace("<title>", title)
      .replace("<roleName>", roleName)
      .replace("<companyName>", companyName);
  }
  return withInfo;
};
