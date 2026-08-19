// Duplicated-label hover roll (DESIGN.md §4.2). Pure markup, no state,
// safe inside server or client trees.
export default function Roll({ children, className }) {
  return (
    <span className={`roll${className ? " " + className : ""}`}>
      <span className="roll__stack">
        <em>{children}</em>
        <em aria-hidden="true">{children}</em>
      </span>
    </span>
  );
}
