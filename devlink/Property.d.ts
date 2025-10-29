import * as React from "react";
import * as Types from "./types";

declare function Property(props: {
  as?: React.ElementType;
  imageImage?: Types.Asset.Image;
  imageAltText?: Types.Basic.AltText;
  locationTitle?: React.ReactNode;
  addressTitle?: React.ReactNode;
  addressTitleTag?: Types.Basic.HeadingTag;
  priceText?: React.ReactNode;
  buttonLink?: Types.Basic.Link;
  buttonText?: React.ReactNode;
}): React.JSX.Element;
