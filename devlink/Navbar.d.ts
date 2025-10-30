import * as React from "react";
import * as Types from "./types";

declare function Navbar(props: {
  as?: React.ElementType;
  navbarTitle?: React.ReactNode;
  navbarLinkProducts?: React.ReactNode;
  navbarLinkResources?: React.ReactNode;
  navbarLinkContact?: React.ReactNode;
  buttonTextGetStarted?: React.ReactNode;
  localeDropdownSlot?: Types.Devlink.Slot;
  navbarLink?: Types.Basic.Link;
  buttonLink?: Types.Basic.Link;
  logoLink?: Types.Basic.Link;
}): React.JSX.Element;
