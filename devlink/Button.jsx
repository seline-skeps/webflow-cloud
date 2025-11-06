"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Button.module.css";

export function Button({
  as: _Component = _Builtin.Link,

  buttonLink = {
    href: "#",
  },

  buttonText = "Button Text",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "button")}
      id={_utils.cx(
        _styles,
        "w-node-_3d279102-1bdf-3cf1-498d-f61abb28e687-bb28e687"
      )}
      button={true}
      block=""
      options={buttonLink}
    >
      {buttonText}
    </_Component>
  );
}
