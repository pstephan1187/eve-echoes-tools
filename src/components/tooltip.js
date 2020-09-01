import React from "react";

export default function Tooltip(props) {
  return (
    <span className="relative group">
      {props.children}
      <sup><i className="fas fa-question-circle"></i></sup>
      <span className="hidden group-hover:block absolute bottom-0 text-left font-normal bg-white w-64 p-4 shadow rounded">
        <span className="font-bold block">{props.children}</span>
        <span dangerouslySetInnerHTML={{ __html: props.tooltip }} />
      </span>
    </span>
  );
}
