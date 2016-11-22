import TextInputBlock       from "./../components/question-fields/text-input-block";
import TextAreaBlock        from "./../components/question-fields/text-area-block";
import DropdownBlock        from "./../components/question-fields/dropdown-block";
import CheckboxesBlock      from "./../components/question-fields/checkboxes-block";
import RadioButtonsBlock    from "./../components/question-fields/radio-buttons-block";
import SequenceBlock        from "./../components/question-fields/sequence-block";
import TextEditorBlock      from "./../components/question-fields/text-editor-block";
import InlineTextInputBlock from "./../components/question-fields/inline-text-input-block";
import InlineDropdownBlock  from "./../components/question-fields/inline-dropdown-block";

const FIELD_TYPES = [
  {
    name:               'text_input',
    label:              'Text Input',
    component:          TextInputBlock,
    icon:               'short_text',
    tooltip:            "Text input field for short answers",
    type:               'block',
    hasOptions:         false,
    hasCorrectOptions:  false,
    choice:             null
  }, {
    name:               'text_area',
    label:              'Text Area',
    component:          TextAreaBlock,
    icon:               'subject',
    tooltip:            "Text area for longer answers",
    type:               'block',
    hasOptions:         false,
    hasCorrectOptions:  false,
    choice:             null
  }, {
    name:               'dropdown',
    label:              'Dropdown',
    component:          DropdownBlock,
    icon:               'arrow_drop_down_circle',
    tooltip:            "Regular dropdown for single-choice questions",
    type:               'block',
    hasOptions:         true,
    hasCorrectOptions:  true,
    choice:             'single'
  }, {
    name:               'checkboxes',
    label:              'Checkboxes',
    component:          CheckboxesBlock,
    icon:               'check_box',
    tooltip:            "Allows selecting multiple options",
    type:               'block',
    hasOptions:         true,
    hasCorrectOptions:  true,
    choice:             'multiple'
  }, {
    name:               'radio_buttons',
    label:              'Radio Buttons',
    component:          RadioButtonsBlock,
    icon:               'radio_button_checked',
    tooltip:            "Regular radio buttons for single-choice questions",
    type:               'block',
    hasOptions:         true,
    hasCorrectOptions:  true,
    choice:             'single'
  }, {
    name:               'sequence',
    label:              'Sequence',
    component:          SequenceBlock,
    icon:               'sort',
    tooltip:            "A list of sortable options, for 'reorder' kind of questions",
    type:               'block',
    hasOptions:         true,
    hasCorrectOptions:  false,
    choice:             null
  }, {
    name:               'text_editor',
    label:              'Text Editor',
    component:          TextEditorBlock,
    icon:               'format_color_text',
    tooltip:            "A rich text editor for large answers, allows using styles etc.",
    type:               'block',
    hasOptions:         false,
    hasCorrectOptions:  false,
    choice:             null
  }, {
    name:               'inline_text_input',
    label:              'Inline Text Input',
    component:          InlineTextInputBlock,
    icon:               'space_bar',
    tooltip:            "Text input for 'gaps' kind of questions",
    type:               'inline',
    hasOptions:         false,
    hasCorrectOptions:  false,
    choice:             null
  }, {
    name:               'inline_dropdown',
    label:              'Inline Dropdown',
    component:          InlineDropdownBlock,
    icon:               'arrow_drop_down',
    tooltip:            "Dropdown for 'gaps' kind of questions",
    type:               'inline',
    hasOptions:         true,
    hasCorrectOptions:  true,
    choice:             'single'
  }
];

export default FIELD_TYPES;
