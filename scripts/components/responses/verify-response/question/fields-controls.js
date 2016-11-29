import React, {Component} from "react";
import {observer} from "mobx-react";

import {Row, Column}     from "react-foundation-components/lib/global/grid-flex";
import {LinkWithTooltip} from "react-foundation-components/lib/global/tooltip";

import Icon from "../../../shared/icon";

@observer
class FieldsControls extends Component {

  render() {
    const {question: {availableFields}} = this.props;

    return (
      <div className="fields-controls">
        {availableFields.map((field, index) => {
          return <FieldControls key={field.uuid} index={index} field={field}/>;
        })}
      </div>
    );
  }

}

@observer
class FieldControls extends Component {

  handleChange(attr, event) {
    this.props.field.set(attr, event.target.value);
  }

  render() {
    const {field, index} = this.props;
    const autocheckIcon = field.autocheck ? 'done' : 'block';

    return (
      <div className="field-controls">
        <Row>
          <Column large={2}>
            {`${index + 1}. `}
            <LinkWithTooltip tooltipContent={field.tooltip}>
              <span tabIndex="1">{field.label}</span>
            </LinkWithTooltip>
          </Column>
          <Column large={2}>
            <span className="control-label">Autocheck</span>
            <Icon className="control-icon not-clickable">{autocheckIcon}</Icon>
          </Column>
          <Column large={2}>
            <span className="control-label">Max Score</span>
            <span>{field.score}</span>
          </Column>
          <Column large={2}>
            <span className="control-label">User Score</span>
            <input type="text" className="score-input" value={field.userScore}
                   onChange={this.handleChange.bind(this, 'userScore')}/>
          </Column>
        </Row>
        <Row>
          <Column large={4}>
            <FieldResultTable field={field}/>
          </Column>
        </Row>
      </div>
    );
  }

}

class FieldResultTable extends React.Component {
  render() {

    const {field} = this.props;
    if (!field.hasOptions) return null;

    var rows = [];

    {field.availableOptions.map((option, index) => {
      rows.push(<FieldResultRow option={option} field={field} key={index}/>);
    })}

    return (
      <table className="results-table" >
        <thead>
        <tr>
          <th>Option</th>
          <th>User Result</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class FieldResultRow extends React.Component {
  render() {
    const {option, field} = this.props;
    const color = option.isCorrect ? 'green' : 'red';

    return (
      <tr>
        <td><span style={{color: color}}>{option.content}</span></td>
        <UserResultColumn option={option} field={field}/>
      </tr>
    );
  }
}

class UserResultColumn extends React.Component {
  render() {
    const { option } = this.props;
    const color = option.userSelected && option.isCorrect ? 'green' : 'red';
    const selectedIcon = option.userSelected ? <Icon className="action" style={{color: color}}>done</Icon> : null;

    return (
      <td>{selectedIcon}</td>
    )

  }
}

export default FieldsControls;
