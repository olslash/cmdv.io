var Fluxxor = require('fluxxor');
var React = require('react/addons');

var FluxMixin = Fluxxor.FluxMixin(React),
    PureRenderMixin = React.addons.PureRenderMixin,
    helpers = require('../../helpers');

var Editor;
module.exports = Editor = React.createClass({
  mixins: [FluxMixin],

  propTypes: {
    valueLink: React.PropTypes.string.isRequired,
    highlightedValue: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    onDirty: React.PropTypes.func, // function to call when a paste is modified for the first time
    valueIsPristine: React.PropTypes.bool // is the content in valueLink an unmodified paste?
  },

  getInitialState() {
    return {
      isClean: this.props.valueIsPristine,
      showEditor: true
    };
  },

  componentDidMount() {
    this.refs['textArea'].getDOMNode().focus();
    this._setKeybindings();
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      isClean: nextProps.valueIsPristine,
      showEditor: !nextProps.valueIsPristine
    });
  },

  shouldComponentUpdate(nextProps, nextState) {
    // fixme? more generic?
    return !!(this.props.valueLink !== nextProps.valueLink  ||
              this.props.highlightedValue !== nextProps.highlightedValue ||
              this.state.isClean !== nextState.isClean ||
              this.state.showEditor !== nextState.showEditor);
  },

  _setKeybindings() {
    Mousetrap.bind(['tab'], (e) => {
      // tabs in editor
      e.preventDefault();
      this._insertTabAtCursor();
    });
  },

  _onChange(e, overrideVal) {
    var newValue = overrideVal ? overrideVal : e.target.value;

    if(this.state.isClean) {
      this.props.onDirty(newValue);
    } else {
      this.props.onChange(newValue);
    }
  },

  _handleEditorClick() {
    this.setState({
      showEditor: true
    });
  },

  _insertTabAtCursor() {
    if(!this.state.isClean) {
      var textArea = this.refs['textArea'].getDOMNode();
      var start = textArea.selectionStart;
      var end = textArea.selectionEnd;

      var target = textArea;
      var value = target.value;
      target.value = value.substring(0, start)
      + "\t"
      + value.substring(end);

      textArea.selectionStart = textArea.selectionEnd = start + 1;

      this._onChange(null, target.value);
    }
  },

  render() {
    var contentArea;
    if(this.state.showEditor) {
      contentArea = <textarea ref='textArea'
                              className="mousetrap"
                              value={ this.props.valueLink }
                              onChange={ this._onChange }
                              autoComplete="off"
                              autoCapitalize="none"
                              spellCheck="false"
                              autoFocus />
    } else {
      contentArea = <pre className='contentArea'
                         onClick={ this._handleEditorClick }>
                      <code ref='codeBlock'
                            dangerouslySetInnerHTML={{ __html: this.props.highlightedValue }} />
                    </pre>
    }
    return (
      <section id="paste-content">
        { contentArea }
      </section>
    );
  }
});
