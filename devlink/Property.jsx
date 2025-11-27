"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Property.module.css";

export function Property({
  as: _Component = _Builtin.Block,
  imageImage = "https://cdn.prod.website-files.com/69007eb98a3b6cc782569739/6900ccf753c86e31165d12a8_pexels-binyaminmellish-186077.jpg",
  imageAltText = "__wf_reserved_inherit",
  locationTitle = "Heerenveen",
  addressTitle = "Teststraat 2",
  addressTitleTag = "h3",
  priceText = "$250,000",

  buttonLink = {
    href: "#",
    target: "_blank",
  },

  buttonText = "->",
  statusText = "Te koop",

  propertyLink = {
    href: "https://www.google.nl",
  },
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "property-card")}
      id={_utils.cx(
        _styles,
        "w-node-_81fbccf7-6968-febe-d02c-7a4e845b0c98-845b0c98"
      )}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-7")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "div-block-4")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "property-status")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-medium")}
              tag="div"
            >
              {statusText}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Link
          className={_utils.cx(_styles, "property-link")}
          button={false}
          block="inline"
          options={propertyLink}
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "property-image")}
            width="auto"
            height="auto"
            loading="lazy"
            src={imageImage}
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "property-info")}
            tag="div"
          >
            <_Builtin.Paragraph
              className={_utils.cx(_styles, "property-location")}
            >
              {locationTitle}
            </_Builtin.Paragraph>
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading", "property-heading")}
              tag={addressTitleTag}
            >
              {addressTitle}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-2")}
              tag="div"
            >
              <_Builtin.Paragraph
                className={_utils.cx(_styles, "property-price")}
              >
                {priceText}
              </_Builtin.Paragraph>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Link>
      </_Builtin.Block>
    </_Component>
  );
}
