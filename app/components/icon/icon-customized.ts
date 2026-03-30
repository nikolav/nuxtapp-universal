// Define the customize function to modify SVG content
export const iconCustomized = (
  content: string,
  _name: string,
  prefix: string,
  _provider: string
) => {
  if (prefix !== "tabler") return content;

  return (
    content
      // Change stroke width to 2
      .replace(/stroke-width="[^"]*"/g, `stroke-width="2"`)
      // Change stroke color to red
      .replace(/stroke="[^"]*"/g, `stroke="#FF5733"`)
      // Change fill color to red
      .replace(/fill="[^"]*"/g, `fill="#FF5733"`)
      // Change animation duration to 1s (for animated icons)
      .replace(/animation-duration="[^"]*"/g, `animation-duration="1s"`)
      // Change opacity to 0.8
      .replace(/opacity="[^"]*"/g, `opacity="0.8"`)
  );
};
