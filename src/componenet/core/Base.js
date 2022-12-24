import React from "react";
import Navbar from "../Navbar";

export default function Base({ children }) {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
