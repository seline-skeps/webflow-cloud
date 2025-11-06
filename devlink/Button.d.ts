import * as React from "react";
import * as Types from "./types";

declare function Button(props: {
  as?: React.ElementType;
  buttonLink?: Types.Basic.Link;
  buttonText?: React.ReactNode;
}): React.JSX.Element;
