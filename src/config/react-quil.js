const quilModules = {
  modules: {
    toolbar: [
      [{ header: [2, 3, 4, 5, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
    ],
    clipboard: {
      matchVisual: false,
    },
  },
  formats: [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    {
      bold: {
        style: { fontWeight: "bold", color: "#2E62CC" },
      },
    },
  ],
};

export default quilModules;
