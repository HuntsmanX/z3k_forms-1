import React, { Component } from "react";

import ajax from "../../../helpers/ajax";

import Field from "./field";

import Option from "./ajax-select/option";
import Value  from "./ajax-select/value";

class BaseSelect extends Field {

  get formatOption() {
    return this.props.formatOption || this.defaultFormatOption;
  }

  get optionComponent() {
    return this.props.optionComponent ?
      Option(this.props.optionComponent) :
      undefined;
  }

  get valueComponent() {
    return this.props.valueComponent ?
      Value(this.props.valueComponent) :
      undefined;
  }

  defaultFormatOption = (el) => ({
    ...el,
    value: el.id,
    label: el.name
  })

  loadOptions = (query) => {
    const { url, minLength } = this.props;

    if (minLength && query.length < minLength)
      return Promise.resolve({ options: [] });

    return ajax({
      url:     url,
      method:  'GET',
      payload: { q: query }
    }).then(
      json => ({
        options: Array.from(json).map(this.formatOption)
      })
    );
  };

}

export default BaseSelect;
