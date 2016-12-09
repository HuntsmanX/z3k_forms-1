import React, { Component } from "react";
import uuid from "node-uuid";

import { Row, Column } from 'react-foundation-components/lib/global/grid-flex';

import humanize from "underscore.string/humanize";

class Field extends Component {

  constructor(props) {
    super(props);
    this.id = uuid.v4();
  }

  handleChange = (event) => {
    this.model && this.model.set(this.attr, event.target.value);
    this.collection && this.collection.setQuery(this.attr, event.target.value);
  }

  get layout()     { return this.props.layout; }
  get type()       { return this.props.type; }
  get attr()       { return this.props.attr; }
  get model()      { return this.props.model; }
  get collection() { return this.props.collection; }
  get hint()       { return this.props.hint; }
  get hasError()   { return this.model && this.model.errors && this.model.errors.has(this.attr); }
  get error()      { return this.model.error(this.attr)[0]; }

  get value() {
    if (this.model)
      return this.model.get(this.attr) || "";

    if (this.collection)
      return this.collection.query.get(this.attr) || "";
  }

  get inputClassName() {
    return this.hasError ? "is-invalid-input" : "";
  }

  get labelClassName() {
    return this.hasError ? "is-invalid-label" : "";
  }

  get wrapper() {
    if (this.layout === "row") return RowFieldWrapper;
    if (this.layout === "col") return ColFieldWrapper;
  }

  get inputWrapper() {
    if (this.layout === "row" && this.hint === false) return RowInputWrapper;
    if (this.layout === "row")                        return RowHintInputWrapper;
    if (this.layout === "col")                        return ColInputWrapper;
  }

  renderLabel() {
    const label = this.props.label || humanize(this.props.attr);

    if (this.layout === "row")
      return (
        <Column large={3}>
          <label
            htmlFor={this.id}
            className={`middle text-right ${this.labelClassName}`}
          >
            {label}
          </label>
        </Column>
      );

    if (this.layout === "col")
      return (
        <label htmlFor={this.id}>
          {label}
        </label>
      );
  }

  renderHint() {
    if (this.hint === false) return null;
    if (this.layout === 'col') return null;

    return (
      <Column large={3}>
        <label className="middle">
          {this.hint}
        </label>
      </Column>
    );
  }

  renderError() {
    if (!this.hasError) return null;

    return (
      <Column large={9} largeOffset={3}>
        <span className="form-error is-visible">
          {this.error}
        </span>
      </Column>
    );
  }

  render() {
    const Wrapper      = this.wrapper;
    const InputWrapper = this.inputWrapper;

    return (
      <Wrapper>
        {this.renderLabel()}
        <InputWrapper>
          {this.renderInput()}
        </InputWrapper>
        {this.renderHint()}
        {this.renderError()}
      </Wrapper>
    );
  }

}

Field.defaultProps = {
  type:   "text",
  layout: "row",
  hint:   false
}


class RowFieldWrapper extends Component {

  render() {
    return (
      <Row className="form-field">
        {this.props.children}
      </Row>
    );
  }

}


class ColFieldWrapper extends Component {

  render() {
    return (
      <Column className="form-field">
        {this.props.children}
      </Column>
    );
  }

}


class RowInputWrapper extends Component {

  render() {
    return (
      <Column large={9}>
        {this.props.children}
      </Column>
    );
  }

}


class RowHintInputWrapper extends Component {

  render() {
    return (
      <Column large={6}>
        {this.props.children}
      </Column>
    );
  }

}


class ColInputWrapper extends Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

}


export default Field;
