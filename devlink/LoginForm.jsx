"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./LoginForm.module.css";

export function LoginForm({ as: _Component = _Builtin.FormWrapper }) {
  return (
    <_Component>
      <_Builtin.FormForm
        name="wf-form-Login-form"
        data-name="Login form"
        action="http://portal.makelaar.app/api/auth/login"
        method="post"
        id="wf-form-Login-form"
      >
        <_Builtin.FormBlockLabel
          className={_utils.cx(_styles, "input-text")}
          htmlFor="email"
        >
          {"Email"}
        </_Builtin.FormBlockLabel>
        <_Builtin.FormTextInput
          className={_utils.cx(_styles, "input-field")}
          name="email"
          maxLength={256}
          data-name="email"
          placeholder="Vul je emailadres in"
          disabled={false}
          type="email"
          required={true}
          autoFocus={false}
          id="email"
        />
        <_Builtin.FormBlockLabel
          className={_utils.cx(_styles, "input-text")}
          htmlFor="password"
        >
          {"Wachtwoord"}
        </_Builtin.FormBlockLabel>
        <_Builtin.FormTextInput
          className={_utils.cx(_styles, "input-field")}
          name="password"
          maxLength={256}
          data-name="password"
          placeholder="Vul je wachtwoord in"
          disabled={false}
          type="password"
          required={true}
          autoFocus={false}
          id="password"
        />
        <_Builtin.FormButton
          className={_utils.cx(_styles, "button")}
          type="submit"
          value="Inloggen"
          data-wait="Even geduld"
        />
      </_Builtin.FormForm>
      <_Builtin.FormSuccessMessage>
        <_Builtin.Block tag="div">
          {"Thank you! Your submission has been received!"}
        </_Builtin.Block>
      </_Builtin.FormSuccessMessage>
      <_Builtin.FormErrorMessage>
        <_Builtin.Block tag="div">
          {"Oops! Something went wrong while submitting the form."}
        </_Builtin.Block>
      </_Builtin.FormErrorMessage>
    </_Component>
  );
}
